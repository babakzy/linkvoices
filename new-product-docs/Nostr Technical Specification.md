# Nostr Technical Specification

Companion to `Product Requirements Document - Nostr Client MVP.md`.

Purpose: resolve every place the PRD says "an appropriate Nostr standard" into a concrete decision, and define how the client reads from and writes to the network.

Stack-agnostic. Nothing here assumes a particular language, database, or hosting model.

> The Nostr ecosystem moves. Every NIP number and status below should be re-verified against the current specifications at implementation time, particularly the direct-message and relay-authentication areas, which are still changing.

## 1. Scope of protocol support

Three tiers. Tier 1 must work for the MVP to be called a complete client. Tier 2 is expected but degradable. Tier 3 is explicitly deferred.

### Tier 1 — required

| Capability | NIP | Kinds |
| --- | --- | --- |
| Core event model, relay messaging | NIP-01 | — |
| Profile metadata | NIP-01 | `0` |
| Short text notes | NIP-01 | `1` |
| Follow list | NIP-02 | `3` |
| Threading and replies | NIP-10 | `1` with `e`/`p` tags |
| Reposts | NIP-18 | `6`, `16` |
| Reactions | NIP-25 | `7` |
| Deletion requests | NIP-09 | `5` |
| Long-form articles | NIP-23 | `30023`, `30024` |
| Entity encoding | NIP-19 | `npub`, `nsec`, `note`, `nevent`, `nprofile`, `naddr` |
| Inline references | NIP-21, NIP-27 | — |
| Relay list / outbox model | NIP-65 | `10002` |
| Browser signer | NIP-07 | — |
| Remote signer | NIP-46 | `24133` |
| Encrypted key export | NIP-49 | — |
| Identity verification | NIP-05 | — |
| Private messages | NIP-17 (+ NIP-44, NIP-59) | `14`, `13`, `1059`, `10050` |
| Mute list | NIP-51 | `10000` |
| Reporting | NIP-56 | `1984` |
| Content warnings | NIP-36 | — |
| Media metadata | NIP-92 | `imeta` tag |

### Tier 2 — supported, degrades gracefully

| Capability | NIP | Note |
| --- | --- | --- |
| Relay information document | NIP-11 | Used for capability detection |
| Relay authentication | NIP-42 | Required by some relays for DM reads |
| Relay-side search | NIP-50 | Unevenly supported; platform index is primary |
| File upload | NIP-96, NIP-98 | Needed for images; fall back to a hosted uploader |
| Proof of work | NIP-13 | Spam mitigation on write if a relay demands it |
| Expiring events | NIP-40 | Honour on read |
| Follow sets | NIP-51 | `30000`, for future list features |

### Tier 3 — explicitly out of MVP

Zaps and Lightning (NIP-57, kinds `9734`/`9735`), communities (NIP-72), live events, marketplace, badges, wallet connect. Named here only so their absence is a decision rather than an oversight.

## 2. Decisions the PRD deferred

### 2.1 Private messaging

**Decision: NIP-17 only. NIP-04 is not implemented, in either direction.**

NIP-17 wraps a `14` chat rumor in a `13` seal, then in a `1059` gift wrap, encrypted with NIP-44. Unlike NIP-04 it hides the conversation metadata, not just the body.

The cost is real and must be accepted deliberately:

- NIP-04 remains common in older clients. A user messaging from an NIP-04-only client will not reach us, and we will not reach them.
- Gift wrapping produces one event per recipient, so a message to self plus recipient is two published events.
- Requires publishing a `10050` DM relay list and reading the recipient's.
- Relays hosting DMs frequently require NIP-42 authentication.

**Why not support NIP-04 for compatibility:** it leaks sender, recipient, and timing to every relay. Supporting it while the PRD promises meaningful privacy would make that promise false. Instead, when a conversation partner has no `10050` list and shows no NIP-17 activity, show a plain notice that the person's app does not support private messaging yet, and offer a public reply instead.

**Interface honesty:** the PRD requires a "clear explanation of privacy and encryption behavior". The true statement is that message content and metadata are hidden from relays, but the fact that *some* gift-wrapped event was delivered to a relay is observable, and message timing is partially observable. Say that, and do not use the word "unreadable" without qualification.

### 2.2 Editing

**Decision: articles are editable. Short notes are not.**

This follows directly from the event model rather than from product preference:

- `30023` is addressable. Republishing with the same `d` tag replaces the prior version, and `naddr` links survive the edit. This is exactly what the PRD promises for articles.
- Kind `1` has no standard edit mechanism. Any "edit" would be a delete-plus-repost, which breaks reply threads and existing links.

The compose UI must therefore not offer an edit affordance on short notes. Offer delete-and-rewrite instead, with the thread consequence stated.

Article edits keep the original `published_at` and update the event `created_at`. Display both as "Published" and "Updated" per the PRD.

### 2.3 Deletion

**Decision: treat NIP-09 as a request, never as a guarantee, and say so in the interface.**

A kind `5` event asks relays to delete. Relays may honour it, ignore it, or honour it locally while other relays retain the event. Other clients may continue to display it.

Behaviour:

- Publish the `5` request to every relay the original was sent to, plus the user's write relays.
- Remove the event from our own index and UI immediately.
- Honour incoming `5` requests from the original author only, matching on pubkey.
- Never honour a deletion request for an event authored by someone else.
- Confirmation copy: "This asks other servers to remove it. Most will. We can't promise every copy disappears."

This directly constrains the GDPR position and should be cross-referenced in any privacy document.

### 2.4 Replaceable event conflicts

For `0`, `3`, `10002`, and other replaceable kinds, the newest `created_at` wins. On an exact tie, the lexicographically lowest event id wins, per NIP-01.

Two practical hazards:

- **Follow list clobbering.** Kind `3` is a full-replacement list. If we write a `3` built from a stale local copy, we silently erase follows the user made in another client. Always re-fetch the newest `3` from the user's write relays immediately before publishing, and merge rather than overwrite. If the fetched list is newer than our cached copy, reconcile before writing.
- **Clock skew.** Reject events with a `created_at` more than a small window in the future to prevent a future-dated event from permanently pinning a profile.

### 2.5 Which profile fields go to Nostr

The PRD says platform fields stay off-Nostr unless the user opts in. Concretely:

Published to kind `0`: `name`, `display_name`, `about`, `picture`, `banner`, `website`, `nip05`.

Never published by default: skills, experience, projects, goals, `looking_for`, `can_offer`, availability, intents, connection types, interests, and all private-tier fields.

If a user explicitly opts to publish a structured field, map it into `about` as prose rather than inventing non-standard kind `0` keys. Custom keys would be invisible to every other client and would make our data look like the standard when it is not.

## 3. Relay strategy

### 3.1 Read and write model

Use the outbox model (NIP-65). Do not read everything from a fixed relay set.

- **Write** the user's own events to their `10002` write relays, plus a small default set.
- **Read** another person's events from *their* `10002` read relays, falling back to relay hints in `e`/`p` tags, then to our aggregator set.
- Maintain a per-pubkey relay map in the index, refreshed opportunistically.

Rationale: a fixed-relay client silently misses people who do not publish to popular relays, which directly undermines the "the feed is never empty" and "discover people outside your network" promises.

### 3.2 Default relay set

Ship a small curated default set, four to six relays, chosen for uptime and permissive read policy. Requirements:

- Configurable without a client release.
- Never presented during onboarding.
- Visible and editable in advanced settings only.
- Health-checked; a persistently failing relay is dropped from the default set server-side.

### 3.3 Connection management

- Cap concurrent relay connections; the outbox model can otherwise fan out badly.
- Deduplicate events by id across relays, but record every relay an event arrived from.
- Per-relay circuit breaker with exponential backoff.
- Honour `NIP-11` limits: `max_subscriptions`, `max_filters`, `max_limit`, `auth_required`, `payment_required`.
- Handle `AUTH` (NIP-42) challenges automatically for relays that require it, without user-visible interruption.

### 3.4 Publish semantics

A publish succeeds when at least one relay returns `OK true`. Track per-relay outcomes.

- Optimistically render the event locally before confirmation.
- If every relay rejects or times out, queue and retry with backoff, and surface a non-blocking "not sent yet" state.
- Never silently drop a user's content. The onboarding doc already commits to queuing the profile publish when relays are unreachable; the same rule applies everywhere.

## 4. Indexing

The client cannot rely on live relay queries for search, discovery, or a fast first paint. An index is required. It is a **cache, and must be fully rebuildable from relays** — signed events remain the source of truth, as the PRD states.

### 4.1 Ingestion

Three ingestion paths, in priority order:

1. **Targeted.** Everything authored by members and by anyone a member follows. Cheap and high value.
2. **Expansion.** Follows-of-follows, bounded by depth and by a web-of-trust score. This is what populates Discover and "outside my network".
3. **Broad sampling.** A filtered subscription to aggregator relays for kinds `0`, `1`, `30023`, sampled rather than exhaustive. Purpose is topic coverage and cold start, not completeness.

Full-firehose ingestion is out of scope. It is expensive and unnecessary for a people-discovery product.

### 4.2 Validation on ingest

Every event, without exception:

- Verify the schnorr signature over the serialized event. Never trust a relay.
- Recompute and verify the event id.
- Reject future-dated events beyond the skew window.
- Reject oversized events and oversized tag counts.
- Normalize and bound tag parsing; treat unknown tags as opaque.

### 4.3 What is stored

Store the raw event verbatim — id, pubkey, `created_at`, kind, tags, content, `sig` — plus the set of relays it was seen on. Materialized views are derived from that, never the other way round, so the index can be rebuilt after a schema change without re-fetching.

Details in `Data Model and Schema.md`.

### 4.4 Deletion and expiry propagation

On ingesting a valid kind `5` from an author, soft-delete the referenced events by that same author and propagate to derived tables and the vector index. On ingesting an event with a NIP-40 expiration in the past, do not index it.

## 5. Identity and signing

Onboarding and key custody are specified in `User Onboarding.md`. This section covers only the signing interface.

Four signing backends behind one internal interface:

| Backend | Where the key lives | Use |
| --- | --- | --- |
| Local encrypted key | Browser memory, decrypted per session | Default for new accounts |
| NIP-07 extension | User's extension | Advanced users |
| NIP-46 remote signer | User's own signer | Advanced users |
| Read-only | No key | Browse-first mode |

The interface exposes `getPublicKey`, `signEvent`, `nip44Encrypt`, `nip44Decrypt`. Every backend implements all four or declares the capability unavailable, so the UI can disable features rather than fail at publish time.

Signing is always client-side. The server never holds signing capability for a user. Any feature requiring a server-side signature is out of scope by construction.

## 6. Threading

Follow NIP-10 marked tags: `["e", <id>, <relay>, "root"]` and `["e", <id>, <relay>, "reply"]`. Always write marked tags.

On read, accept both marked and legacy positional forms, since a large amount of existing content uses the deprecated positional convention. Resolve as follows:

- Marked tags present: trust the markers.
- Legacy positional: first `e` is root, last `e` is the immediate parent.
- Single `e` tag: it is both.

Include `p` tags for every participant in the thread so mentions reach them.

Missing parents are common, because the parent may live on a relay we do not read. Render an orphaned reply with an explicit "loading the post this replies to" state and attempt a targeted fetch using the relay hint in the `e` tag, rather than hiding the reply.

## 7. Media

- Parse `imeta` tags (NIP-92) for dimensions and blurhash so the feed does not reflow while images load.
- Upload via NIP-96 with NIP-98 HTTP auth where the configured host supports it; otherwise use a platform-hosted uploader.
- Never proxy or hotlink media that has not passed the safety checks in section 8.
- Strip EXIF, including GPS, from user uploads before publishing. The PRD treats exact location as private-tier data; leaking it through an image would break that promise.

## 8. Spam and safety at the protocol layer

Nostr has no global moderation. Filtering is entirely the client's responsibility, and a client that skips it is unusable for a newcomer.

Layered approach:

1. **Web of trust.** Score each pubkey by social distance from the user and from members generally. Low-trust, brand-new pubkeys posting at volume are down-ranked before any AI ranking runs.
2. **Content classification.** Server-side spam and NSFW classification on ingest, stored as index metadata rather than published anywhere.
3. **User controls.** Mute (`10000`) and block, synced to Nostr where a standard exists and held locally otherwise.
4. **Reports.** Publish NIP-56 `1984` events on user report, and additionally record the report platform-side, because relays largely do not act on reports.
5. **Content warnings.** Honour NIP-36 on read; offer it on write.
6. **Proof of work.** Support NIP-13 on publish for relays that require it.

**Important distinction, per the PRD:** hiding content in our client is moderation, not protocol deletion. Never present a mute, block, or filter as though the content has been removed from Nostr.

## 9. Performance targets

| Operation | Target |
| --- | --- |
| First feed paint, returning user | Under 1s from index |
| First feed paint, new user | Under 2s |
| Publish acknowledged by one relay | Under 2s, p95 |
| Thread open | Under 500ms from index |
| Profile open | Under 500ms from index |
| Index lag for a followed author | Under 30s |

The index serves the UI. Live relay subscriptions layer updates on top. The UI must never block on a relay round trip for a read that the index can answer.

## 10. Open questions

- Which specific relays form the default set, and who pays for write access if any require payment.
- Whether to run our own relay. It would improve member-content latency and reliability, but weakens the "not locked into us" claim if it becomes load-bearing.
- How aggressively to expand the web-of-trust crawl before cost outweighs discovery value.
- Whether NIP-17 adoption is broad enough at launch for messaging to feel useful, or whether messaging should ship behind a "your contact's app may not support this yet" expectation.
- Whether relay-side search (NIP-50) is worth using at all, given uneven support and our own index.
