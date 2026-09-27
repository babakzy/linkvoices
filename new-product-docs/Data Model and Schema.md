# Data Model and Schema

Companion to `Product Requirements Document - Nostr Client MVP.md` section 20, `Nostr Technical Specification.md`, and `User Onboarding.md`.

Stack-agnostic. DDL is written in generic SQL; adapt types to the chosen database. Vector columns assume a relational database with an ANN index extension, but the model works equally with an external vector store keyed by `(entity_type, entity_id)`.

## 1. The governing rule

Every table belongs to exactly one of two domains, and the domain determines who owns the truth.

| Domain | Source of truth | On loss |
| --- | --- | --- |
| **Nostr cache** | Signed events on relays | Rebuild from relays |
| **Platform data** | This database | Gone permanently |

Mixing them is the single most damaging mistake available here. If platform fields leak into the cache domain, a rebuild destroys user data. If cached Nostr data is treated as authoritative, the client starts lying about what the network actually contains.

Naming convention: cache-domain tables are prefixed `nostr_`.

```text
                  ┌─────────────────────────┐
   relays ───────►│   nostr_events (raw)    │  verbatim, signature-verified
                  └───────────┬─────────────┘
                              │ derived, disposable
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      nostr_profiles    nostr_notes    nostr_follows  ...

                  ┌─────────────────────────┐
   the app ──────►│    platform tables      │  authoritative, backed up
                  └─────────────────────────┘
                     accounts, intents, interests,
                     connections, feedback, grants
```

## 2. Identity: members and indexed people

The PRD requires distinguishing a **member** from an indexed **Nostr profile**. Model this with one row per pubkey, and membership as an optional relationship to that row.

This avoids the trap of two parallel identity tables that must be reconciled when someone claims a profile.

```sql
-- One row per pubkey ever seen, member or not. Cache domain, but never deleted.
CREATE TABLE people (
    pubkey          CHAR(64) PRIMARY KEY,          -- hex, not npub
    first_seen_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_event_at   TIMESTAMPTZ,
    is_member       BOOLEAN NOT NULL DEFAULT FALSE,
    trust_score     REAL,                           -- web of trust, section 9
    spam_score      REAL,
    CHECK (pubkey ~ '^[0-9a-f]{64}$')
);

-- Platform account. Only exists for members.
CREATE TABLE accounts (
    id              UUID PRIMARY KEY,
    pubkey          CHAR(64) NOT NULL UNIQUE REFERENCES people(pubkey),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    custody_mode    TEXT NOT NULL,                  -- 'managed_encrypted' | 'nip07' | 'nip46'
    status          TEXT NOT NULL DEFAULT 'active', -- 'active' | 'suspended' | 'deleted'
    deleted_at      TIMESTAMPTZ
);
```

Claiming an indexed profile is then a single update plus an account insert, with no data migration and no duplicate rows. The signed-challenge requirement from the PRD is enforced in the application layer, never by trusting a submitted `npub`.

## 3. Credentials and key custody

Implements the envelope encryption model from `User Onboarding.md` section 7. **The server must never be able to derive a wrapping key.** Nothing in these tables is sufficient to recover a private key.

```sql
-- The Nostr private key, encrypted once with a data encryption key (DEK).
CREATE TABLE encrypted_keys (
    account_id      UUID PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
    ciphertext      BYTEA NOT NULL,     -- AES-256-GCM(private key)
    nonce           BYTEA NOT NULL,
    algorithm       TEXT NOT NULL DEFAULT 'aes-256-gcm',
    version         INT NOT NULL DEFAULT 1,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per unlock method. Each wraps the same DEK independently,
-- so methods can be added or revoked without touching the key above.
CREATE TABLE key_wraps (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    method          TEXT NOT NULL,      -- 'passkey' | 'password' | 'recovery_phrase'
    wrapped_dek     BYTEA NOT NULL,
    nonce           BYTEA NOT NULL,
    kdf_params      JSONB NOT NULL,     -- salt, Argon2id params, or HKDF info. No secrets.
    label           TEXT,               -- user-facing, e.g. "MacBook"
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_used_at    TIMESTAMPTZ
);

-- Authentication only. Separate from key wrapping by design:
-- the password verifier proves identity; the wrapping key never reaches the server.
CREATE TABLE credentials (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type            TEXT NOT NULL,      -- 'passkey' | 'password' | 'email_code'
    email           CITEXT,
    password_verifier BYTEA,            -- derived independently of the wrapping key
    webauthn_credential_id BYTEA,
    webauthn_public_key    BYTEA,
    webauthn_sign_count    BIGINT,
    supports_prf    BOOLEAN,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON credentials (email) WHERE type IN ('password', 'email_code');
```

Enforcing the constraint from the onboarding doc that an email-code account cannot be the only method:

```sql
-- Every account must retain at least one wrap it can actually recover from.
-- Enforced in application logic on revoke; this view exposes violations.
CREATE VIEW accounts_without_recovery AS
SELECT a.id
FROM accounts a
WHERE a.custody_mode = 'managed_encrypted'
  AND NOT EXISTS (
      SELECT 1 FROM key_wraps w
      WHERE w.account_id = a.id
        AND w.method IN ('passkey', 'recovery_phrase')
  );
```

## 4. Nostr cache

### Raw events

The one table everything else derives from. Per the technical spec, store events verbatim so the index survives schema changes.

```sql
CREATE TABLE nostr_events (
    id              CHAR(64) PRIMARY KEY,
    pubkey          CHAR(64) NOT NULL REFERENCES people(pubkey),
    created_at      TIMESTAMPTZ NOT NULL,
    kind            INT NOT NULL,
    tags            JSONB NOT NULL,
    content         TEXT NOT NULL,
    sig             CHAR(128) NOT NULL,
    d_tag           TEXT,               -- addressable events (30000-39999)
    ingested_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at      TIMESTAMPTZ,        -- soft delete via NIP-09
    spam_score      REAL,
    nsfw            BOOLEAN
);

CREATE INDEX ON nostr_events (pubkey, kind, created_at DESC);
CREATE INDEX ON nostr_events (kind, created_at DESC) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ON nostr_events (pubkey, kind, d_tag)
    WHERE kind BETWEEN 30000 AND 39999;   -- addressable: one current version
CREATE INDEX ON nostr_events USING GIN (tags);

-- Which relays each event was seen on. Needed for deletion fan-out and outbox reads.
CREATE TABLE nostr_event_relays (
    event_id        CHAR(64) NOT NULL REFERENCES nostr_events(id) ON DELETE CASCADE,
    relay_url       TEXT NOT NULL,
    seen_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (event_id, relay_url)
);
```

Partition `nostr_events` by `created_at` if volume warrants. Broad sampling ingestion makes this the largest table by a wide margin.

### Derived views

Materialized from raw events. All droppable and rebuildable.

```sql
-- Latest kind 0 per pubkey.
CREATE TABLE nostr_profiles (
    pubkey          CHAR(64) PRIMARY KEY REFERENCES people(pubkey),
    event_id        CHAR(64) NOT NULL REFERENCES nostr_events(id),
    name            TEXT,
    display_name    TEXT,
    about           TEXT,
    picture         TEXT,
    banner          TEXT,
    website         TEXT,
    nip05           TEXT,
    nip05_verified  BOOLEAN NOT NULL DEFAULT FALSE,
    nip05_checked_at TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL
);

-- Latest kind 3 per pubkey, exploded.
CREATE TABLE nostr_follows (
    follower        CHAR(64) NOT NULL REFERENCES people(pubkey),
    followee        CHAR(64) NOT NULL REFERENCES people(pubkey),
    event_id        CHAR(64) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (follower, followee)
);
CREATE INDEX ON nostr_follows (followee);   -- follower lookups and trust scoring

-- Long-form articles, kind 30023.
CREATE TABLE nostr_articles (
    pubkey          CHAR(64) NOT NULL REFERENCES people(pubkey),
    d_tag           TEXT NOT NULL,
    event_id        CHAR(64) NOT NULL REFERENCES nostr_events(id),
    title           TEXT,
    summary         TEXT,
    image           TEXT,
    published_at    TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL,
    topics          TEXT[],
    reading_minutes INT,
    PRIMARY KEY (pubkey, d_tag)      -- naddr identity: survives edits
);

-- Relay lists, kind 10002. Drives the outbox model.
CREATE TABLE nostr_relay_prefs (
    pubkey          CHAR(64) NOT NULL REFERENCES people(pubkey),
    relay_url       TEXT NOT NULL,
    can_read        BOOLEAN NOT NULL,
    can_write       BOOLEAN NOT NULL,
    updated_at      TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (pubkey, relay_url)
);
```

Reactions, reposts, and thread edges follow the same pattern: derived, indexed on the tag they reference, rebuildable.

## 5. Platform profile

The structured profile from PRD section 9. Kept separate from `nostr_profiles` because it is authoritative and mostly unpublished.

Field groups are stored as rows rather than columns so that **visibility is enforceable per group**, which is what the PRD's three privacy tiers actually require.

```sql
CREATE TYPE visibility AS ENUM ('public', 'discovery', 'private');

CREATE TABLE profile_fields (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    field_group     TEXT NOT NULL,      -- 'identity'|'knowledge'|'direction'|'topics'
    field_key       TEXT NOT NULL,      -- 'skills'|'goals'|'can_offer'|'languages'...
    value           JSONB NOT NULL,
    visibility      visibility NOT NULL DEFAULT 'discovery',
    published_to_nostr BOOLEAN NOT NULL DEFAULT FALSE,
    source          TEXT NOT NULL,      -- 'user'|'ai_interview'|'ai_import'|'nostr_import'
    confirmed_by_user BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (account_id, field_key)
);
```

Two columns here carry real product weight:

- **`source` and `confirmed_by_user`** implement the PRD rule that AI-generated claims must never be presented as verified facts. Anything with an `ai_*` source and `confirmed_by_user = false` is a suggestion, must render differently, and must never appear in a match explanation.
- **`published_to_nostr`** makes the opt-in publishing rule auditable rather than aspirational.

Normalized taxonomies, so that "AI" and "artificial intelligence" match:

```sql
CREATE TABLE tags (
    id              UUID PRIMARY KEY,
    kind            TEXT NOT NULL,      -- 'skill' | 'interest' | 'role' | 'language'
    slug            TEXT NOT NULL,
    label           TEXT NOT NULL,
    canonical_id    UUID REFERENCES tags(id),   -- synonym target
    UNIQUE (kind, slug)
);

CREATE TABLE account_tags (
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    tag_id          UUID NOT NULL REFERENCES tags(id),
    kind            TEXT NOT NULL,
    weight          REAL NOT NULL DEFAULT 1.0,
    visibility      visibility NOT NULL DEFAULT 'public',
    PRIMARY KEY (account_id, tag_id, kind)
);
```

## 6. Intents

PRD section 12: multiple saved, exactly one active.

```sql
CREATE TABLE intents (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    text            TEXT NOT NULL,          -- what the user actually wrote
    structured      JSONB,                  -- parsed: goal, target, topics, location
    is_active       BOOLEAN NOT NULL DEFAULT FALSE,
    paused          BOOLEAN NOT NULL DEFAULT FALSE,
    visibility      visibility NOT NULL DEFAULT 'discovery',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at      TIMESTAMPTZ
);

-- Enforce "one active at a time" in the database, not in application code.
CREATE UNIQUE INDEX one_active_intent
    ON intents (account_id) WHERE is_active;
```

`expires_at` matters more than it looks: a stale intent quietly poisons discovery for months. Prompt the user to confirm or retire an intent after a period of inactivity.

## 7. Connections

PRD section 8: follow is the primary action and lives on Nostr; connection types are an optional, platform-private layer with approval for sensitive types.

Note the deliberate asymmetry — `nostr_follows` is cache domain, `connection_types` is platform domain. A connection type must never imply a follow, and losing the cache must not lose connection types.

```sql
CREATE TABLE connection_type_kinds (
    slug            TEXT PRIMARY KEY,   -- 'online_friend'|'works_with'|'married'|...
    label           TEXT NOT NULL,
    requires_approval BOOLEAN NOT NULL, -- the "sensitive" flag from the PRD
    is_custom       BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE connection_types (
    id              UUID PRIMARY KEY,
    from_account    UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    to_pubkey       CHAR(64) NOT NULL REFERENCES people(pubkey),
    kind_slug       TEXT NOT NULL REFERENCES connection_type_kinds(slug),
    custom_label    TEXT,
    status          TEXT NOT NULL,      -- 'active' | 'pending' | 'rejected' | 'removed'
    requested_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    responded_at    TIMESTAMPTZ,
    visibility      visibility NOT NULL DEFAULT 'private',
    UNIQUE (from_account, to_pubkey, kind_slug)
);

CREATE INDEX ON connection_types (to_pubkey, status);
```

`status = 'pending'` is the mechanism behind the PRD rule that a sensitive type is not displayed as established until accepted. Rendering must filter on `status = 'active'`, and a rejection must leave the underlying Nostr follow completely untouched.

## 8. Interaction, feedback, notifications

```sql
CREATE TABLE connection_feedback (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    about_pubkey    CHAR(64) NOT NULL REFERENCES people(pubkey),
    outcome         TEXT NOT NULL,      -- 'conversation'|'met'|'collaborating'|
                                        -- 'friends'|'not_relevant'|'no_response'
    source_context  JSONB,              -- which preset and intent produced the match
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

`source_context` is what closes the learning loop. Without recording which preset and which active intent produced a match, feedback cannot improve ranking — it just accumulates.

Feedback is private per the PRD and must never be exposed through any read path that the other person can reach, including MCP.

```sql
CREATE TABLE notifications (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type            TEXT NOT NULL,
    payload         JSONB NOT NULL,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON notifications (account_id, created_at DESC) WHERE read_at IS NULL;

CREATE TABLE notification_prefs (
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type            TEXT NOT NULL,
    in_app          BOOLEAN NOT NULL DEFAULT TRUE,
    email           BOOLEAN NOT NULL DEFAULT FALSE,
    push            BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (account_id, type)
);
```

One row per type satisfies the PRD requirement that every notification type be individually controllable.

## 9. Moderation and trust

```sql
CREATE TABLE mutes (
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    target_pubkey   CHAR(64) NOT NULL,
    scope           TEXT NOT NULL DEFAULT 'all',   -- 'all'|'feed'|'discovery'
    synced_to_nostr BOOLEAN NOT NULL DEFAULT FALSE, -- kind 10000
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (account_id, target_pubkey)
);

CREATE TABLE reports (
    id              UUID PRIMARY KEY,
    reporter_account UUID REFERENCES accounts(id) ON DELETE SET NULL,
    target_pubkey   CHAR(64) NOT NULL,
    target_event_id CHAR(64),
    reason          TEXT NOT NULL,
    published_event_id CHAR(64),        -- our NIP-56 kind 1984, if published
    status          TEXT NOT NULL DEFAULT 'open',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

Trust and spam scores live on `people` (section 2) and are recomputed on a schedule from follow-graph distance, account age, posting cadence, and classifier output.

## 10. Vector index

One table for every embedded entity, keyed polymorphically, so a new entity type needs no schema change.

```sql
CREATE TABLE embeddings (
    entity_type     TEXT NOT NULL,      -- 'profile'|'intent'|'note'|'article'|'tag'
    entity_id       TEXT NOT NULL,
    facet           TEXT NOT NULL,      -- 'skills'|'interests'|'offers'|
                                        -- 'looking_for'|'full'
    model           TEXT NOT NULL,
    dim             INT NOT NULL,
    vector          VECTOR(1536),
    source_hash     TEXT NOT NULL,      -- skip re-embedding unchanged text
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (entity_type, entity_id, facet, model)
);

CREATE INDEX ON embeddings USING hnsw (vector vector_cosine_ops);
```

Three details that matter:

- **`facet`** enables the multi-vector retrieval in `AI Discovery and Matching Spec.md`. A single blended profile embedding cannot express "their `can_offer` matches my `looking_for`", which is precisely the People I Can Help preset.
- **`model` in the primary key** lets a new embedding model be backfilled alongside the old one with no downtime and no destructive migration.
- **`source_hash`** is the cost control. Re-embedding unchanged text on every profile save is the easiest way to waste the inference budget.

**Only embed text the visibility rules permit.** Private-tier fields must never enter the vector index, because nearest-neighbour results leak their content indirectly.

## 11. MCP grants

```sql
CREATE TABLE mcp_clients (
    id              UUID PRIMARY KEY,
    account_id      UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    token_hash      BYTEA NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at      TIMESTAMPTZ,
    last_used_at    TIMESTAMPTZ
);

CREATE TABLE mcp_grants (
    client_id       UUID NOT NULL REFERENCES mcp_clients(id) ON DELETE CASCADE,
    tool            TEXT NOT NULL,
    mode            TEXT NOT NULL,      -- 'read' | 'write'
    max_visibility  visibility NOT NULL DEFAULT 'public',
    requires_confirmation BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (client_id, tool)
);

CREATE TABLE mcp_audit (
    id              BIGSERIAL PRIMARY KEY,
    client_id       UUID NOT NULL REFERENCES mcp_clients(id),
    tool            TEXT NOT NULL,
    arguments       JSONB,
    allowed         BOOLEAN NOT NULL,
    denied_reason   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

`max_visibility` is the enforcement point for the PRD rule that an external agent never receives private profile data. Every MCP read path filters on it, defaulting to `public`. The default must be the restrictive value, not the permissive one.

## 12. Enforcing visibility

The three privacy tiers are only real if a single code path enforces them. Express it as a function and route every read through it, rather than repeating the filter at each call site.

```sql
CREATE FUNCTION visible_fields(
    target_account  UUID,
    viewer_account  UUID,
    max_tier        visibility
) RETURNS SETOF profile_fields AS $$
    SELECT *
    FROM profile_fields pf
    WHERE pf.account_id = target_account
      AND (
          pf.visibility = 'public'
          OR (pf.visibility = 'discovery'
              AND max_tier IN ('discovery', 'private')
              AND viewer_account IS NOT NULL)
          OR (pf.visibility = 'private'
              AND target_account = viewer_account)
      );
$$ LANGUAGE sql STABLE;
```

Call sites and their ceiling:

| Caller | `max_tier` |
| --- | --- |
| Public profile page, signed out | `public` |
| Signed-in profile view | `public` |
| Matching and ranking engine | `discovery` |
| Match explanation generator | `public` |
| MCP, per grant | `mcp_grants.max_visibility` |
| The user viewing themselves | `private` |

The explanation generator deliberately sits at `public`. Discovery-tier data may *influence* a ranking, but an explanation that quotes it would disclose to a stranger something the user marked as not public. This is a subtle and easy leak, and it is the reason explanation inputs are restricted separately from ranking inputs.

## 13. Retention and deletion

| Data | Policy |
| --- | --- |
| Broad-sample events with no member interaction | Expire after 90 days |
| Events by members and their follows | Retain |
| Soft-deleted events (NIP-09) | Purge from index within 24h |
| MCP audit | 12 months |
| Notifications | 6 months |
| Embeddings | Follow the parent entity |

On account deletion: purge all platform-domain rows, set `accounts.status = 'deleted'`, and retain the `people` row only if the pubkey remains publicly active on Nostr. Publish a NIP-09 deletion request for the user's own events if they ask.

State the limit plainly, as the technical spec requires: **we can delete our copy and request deletion elsewhere, but we cannot delete events from relays we do not control.** This is the crux of the GDPR question and needs a legal answer, not only a technical one.

## 14. Rebuild guarantee

The cache domain must be droppable. This should be a tested operation, not a theory, because it is also the disaster-recovery path.

```text
DROP nostr_* tables
      ↓
Replay from relays: members, their follows, expansion, sampling
      ↓
Rematerialize derived tables
      ↓
Re-embed (source_hash makes this mostly incremental)
```

No platform-domain table may hold a foreign key that a cache rebuild could break. `people` is the boundary: it is never dropped, because platform tables reference it.

## 15. Open questions

- Whether `nostr_events` needs partitioning at launch or only once sampling is switched on.
- Whether to keep a full event archive or let broad-sample data expire, and the cost difference.
- Whether connection types should ever be publishable to Nostr, which would need a custom kind and a consent model for both parties.
- How to represent a claimed profile's pre-membership history when someone joins after years of Nostr activity.
- Whether `trust_score` belongs on `people` or in a separate periodically rebuilt table, given it changes on a different cadence from everything else there.
