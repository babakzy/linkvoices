-- Linkvoices human network (Nostr client pivot).
-- Additive: existing invoice tables are left in place.
--
-- Before running, enable the vector extension in the Supabase dashboard
-- (Database → Extensions → vector), or let the statement below do it.
-- Binary secrets are stored as base64 text so the Supabase JS client
-- does not have to decode bytea. That is the only intentional deviation
-- from new-product-docs/Data Model and Schema.md.

create extension if not exists pgcrypto;
create extension if not exists vector with schema extensions;

-- ---------------------------------------------------------------------------
-- Identity
-- ---------------------------------------------------------------------------

create table if not exists people (
  pubkey char(64) primary key,
  first_seen_at timestamptz not null default now(),
  last_event_at timestamptz,
  is_member boolean not null default false,
  trust_score real,
  spam_score real,
  constraint people_pubkey_hex check (pubkey ~ '^[0-9a-f]{64}$')
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  pubkey char(64) not null unique references people (pubkey),
  created_at timestamptz not null default now(),
  custody_mode text not null,
  status text not null default 'active',
  deleted_at timestamptz,
  display_name text,
  constraint accounts_custody check (custody_mode in ('managed_encrypted', 'nip07', 'nip46')),
  constraint accounts_status check (status in ('active', 'suspended', 'deleted'))
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists sessions_account_idx on sessions (account_id);

create table if not exists auth_challenges (
  id uuid primary key default gen_random_uuid(),
  challenge text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Key custody. Server cannot unwrap these.
-- ---------------------------------------------------------------------------

create table if not exists encrypted_keys (
  account_id uuid primary key references accounts (id) on delete cascade,
  ciphertext text not null,
  nonce text not null,
  algorithm text not null default 'aes-256-gcm',
  version int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists key_wraps (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  method text not null,
  wrapped_dek text not null,
  nonce text not null,
  kdf_params jsonb not null,
  label text,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  constraint key_wraps_method check (method in ('passkey', 'password', 'recovery_phrase'))
);

create table if not exists credentials (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  type text not null,
  email text,
  password_verifier text,
  webauthn_credential_id text,
  webauthn_public_key text,
  webauthn_sign_count bigint,
  supports_prf boolean,
  created_at timestamptz not null default now(),
  constraint credentials_type check (type in ('passkey', 'password', 'email_code'))
);

create unique index if not exists credentials_email_unique
  on credentials (lower(email))
  where type in ('password', 'email_code') and email is not null;

-- ---------------------------------------------------------------------------
-- Nostr cache. Rebuildable from relays. people is never dropped.
-- ---------------------------------------------------------------------------

create table if not exists nostr_events (
  id char(64) primary key,
  pubkey char(64) not null references people (pubkey),
  created_at timestamptz not null,
  kind int not null,
  tags jsonb not null,
  content text not null,
  sig char(128) not null,
  d_tag text,
  ingested_at timestamptz not null default now(),
  deleted_at timestamptz,
  spam_score real,
  nsfw boolean,
  constraint nostr_events_id_hex check (id ~ '^[0-9a-f]{64}$')
);

create index if not exists nostr_events_author_idx
  on nostr_events (pubkey, kind, created_at desc);
create index if not exists nostr_events_kind_idx
  on nostr_events (kind, created_at desc)
  where deleted_at is null;
create unique index if not exists nostr_events_addressable_idx
  on nostr_events (pubkey, kind, d_tag)
  where kind between 30000 and 39999 and d_tag is not null;
create index if not exists nostr_events_tags_idx on nostr_events using gin (tags);

create table if not exists nostr_event_relays (
  event_id char(64) not null references nostr_events (id) on delete cascade,
  relay_url text not null,
  seen_at timestamptz not null default now(),
  primary key (event_id, relay_url)
);

create table if not exists nostr_profiles (
  pubkey char(64) primary key references people (pubkey),
  event_id char(64) not null references nostr_events (id),
  name text,
  display_name text,
  about text,
  picture text,
  banner text,
  website text,
  nip05 text,
  nip05_verified boolean not null default false,
  nip05_checked_at timestamptz,
  updated_at timestamptz not null
);

create table if not exists nostr_follows (
  follower char(64) not null references people (pubkey),
  followee char(64) not null references people (pubkey),
  event_id char(64) not null,
  created_at timestamptz not null,
  primary key (follower, followee)
);

create index if not exists nostr_follows_followee_idx on nostr_follows (followee);

create table if not exists nostr_articles (
  pubkey char(64) not null references people (pubkey),
  d_tag text not null,
  event_id char(64) not null references nostr_events (id),
  title text,
  summary text,
  image text,
  published_at timestamptz,
  updated_at timestamptz not null,
  topics text[],
  reading_minutes int,
  primary key (pubkey, d_tag)
);

create table if not exists nostr_relay_prefs (
  pubkey char(64) not null references people (pubkey),
  relay_url text not null,
  can_read boolean not null,
  can_write boolean not null,
  updated_at timestamptz not null,
  primary key (pubkey, relay_url)
);

-- ---------------------------------------------------------------------------
-- Platform profile
-- ---------------------------------------------------------------------------

do $$ begin
  create type visibility as enum ('public', 'discovery', 'private');
exception
  when duplicate_object then null;
end $$;

create table if not exists profile_fields (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  field_group text not null,
  field_key text not null,
  value jsonb not null,
  visibility visibility not null default 'discovery',
  published_to_nostr boolean not null default false,
  source text not null,
  confirmed_by_user boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (account_id, field_key),
  constraint profile_fields_group check (field_group in ('identity', 'knowledge', 'direction', 'topics')),
  constraint profile_fields_source check (source in ('user', 'ai_interview', 'ai_import', 'nostr_import'))
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  slug text not null,
  label text not null,
  canonical_id uuid references tags (id),
  unique (kind, slug)
);

create table if not exists account_tags (
  account_id uuid not null references accounts (id) on delete cascade,
  tag_id uuid not null references tags (id),
  kind text not null,
  weight real not null default 1.0,
  visibility visibility not null default 'public',
  primary key (account_id, tag_id, kind)
);

create table if not exists intents (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  text text not null,
  structured jsonb,
  is_active boolean not null default false,
  paused boolean not null default false,
  visibility visibility not null default 'discovery',
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create unique index if not exists one_active_intent
  on intents (account_id)
  where is_active;

create or replace function set_active_intent(p_account uuid, p_intent uuid)
returns void
language plpgsql
as $$
begin
  update intents
    set is_active = false
    where account_id = p_account
      and is_active
      and id <> p_intent;
  update intents
    set is_active = true, paused = false
    where id = p_intent
      and account_id = p_account;
end;
$$;

create table if not exists connection_type_kinds (
  slug text primary key,
  label text not null,
  requires_approval boolean not null,
  is_custom boolean not null default false
);

insert into connection_type_kinds (slug, label, requires_approval) values
  ('online_friend', 'Online friend', true),
  ('real_friend', 'Real-life friend', true),
  ('interested_in', 'Interested in', false),
  ('inspired_by', 'Inspired by', false),
  ('works_with', 'Works with', true),
  ('family', 'Family', true),
  ('romantic_partner', 'Romantic partner', true),
  ('married', 'Married', true),
  ('loves', 'Loves', true),
  ('custom', 'Other', true)
on conflict (slug) do nothing;

create table if not exists connection_types (
  id uuid primary key default gen_random_uuid(),
  from_account uuid not null references accounts (id) on delete cascade,
  to_pubkey char(64) not null references people (pubkey),
  kind_slug text not null references connection_type_kinds (slug),
  custom_label text,
  status text not null,
  requested_at timestamptz not null default now(),
  responded_at timestamptz,
  visibility visibility not null default 'private',
  constraint connection_types_status check (status in ('active', 'pending', 'rejected', 'removed'))
);

create unique index if not exists connection_types_unique
  on connection_types (from_account, to_pubkey, kind_slug, coalesce(custom_label, ''));

create index if not exists connection_types_target_idx
  on connection_types (to_pubkey, status);

create table if not exists connection_feedback (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  about_pubkey char(64) not null references people (pubkey),
  outcome text not null,
  source_context jsonb,
  created_at timestamptz not null default now(),
  constraint connection_feedback_outcome check (outcome in (
    'conversation', 'met', 'collaborating', 'friends', 'not_relevant', 'no_response'
  ))
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  type text not null,
  payload jsonb not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_unread_idx
  on notifications (account_id, created_at desc)
  where read_at is null;

create table if not exists notification_prefs (
  account_id uuid not null references accounts (id) on delete cascade,
  type text not null,
  in_app boolean not null default true,
  email boolean not null default false,
  push boolean not null default false,
  primary key (account_id, type)
);

create table if not exists mutes (
  account_id uuid not null references accounts (id) on delete cascade,
  target_pubkey char(64) not null,
  scope text not null default 'all',
  synced_to_nostr boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (account_id, target_pubkey)
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  reporter_account uuid references accounts (id) on delete set null,
  target_pubkey char(64) not null,
  target_event_id char(64),
  reason text not null,
  published_event_id char(64),
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists feed_preferences (
  account_id uuid primary key references accounts (id) on delete cascade,
  feed_mode text not null default 'following',
  discovery_preset text not null default 'similar_interests',
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_state (
  account_id uuid primary key references accounts (id) on delete cascade,
  step text not null default 'interests',
  updated_at timestamptz not null default now()
);

create table if not exists article_drafts (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  title text not null default '',
  summary text not null default '',
  content text not null default '',
  image text,
  topics text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists embeddings (
  entity_type text not null,
  entity_id text not null,
  facet text not null,
  model text not null,
  dim int not null,
  vector extensions.vector(1536),
  source_hash text not null,
  updated_at timestamptz not null default now(),
  primary key (entity_type, entity_id, facet, model)
);

create index if not exists embeddings_hnsw
  on embeddings using hnsw (vector extensions.vector_cosine_ops);

create table if not exists mcp_clients (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  token_hash text not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  last_used_at timestamptz
);

create table if not exists mcp_grants (
  client_id uuid not null references mcp_clients (id) on delete cascade,
  tool text not null,
  mode text not null,
  max_visibility visibility not null default 'public',
  requires_confirmation boolean not null default true,
  primary key (client_id, tool),
  constraint mcp_grants_mode check (mode in ('read', 'write'))
);

create table if not exists mcp_audit (
  id bigint generated always as identity primary key,
  client_id uuid not null references mcp_clients (id),
  tool text not null,
  arguments jsonb,
  allowed boolean not null,
  denied_reason text,
  created_at timestamptz not null default now()
);

create or replace function visible_fields(
  target_account uuid,
  viewer_account uuid,
  max_tier visibility
) returns setof profile_fields
language sql
stable
as $$
  select *
  from profile_fields pf
  where pf.account_id = target_account
    and (
      pf.visibility = 'public'
      or (
        pf.visibility = 'discovery'
        and max_tier in ('discovery', 'private')
        and viewer_account is not null
      )
      or (
        pf.visibility = 'private'
        and target_account = viewer_account
      )
    );
$$;

-- ---------------------------------------------------------------------------
-- Row level security. The app server uses the service role, which bypasses
-- RLS. The anon key used by the invoice app cannot read these tables.
-- ---------------------------------------------------------------------------

alter table people enable row level security;
alter table accounts enable row level security;
alter table sessions enable row level security;
alter table auth_challenges enable row level security;
alter table encrypted_keys enable row level security;
alter table key_wraps enable row level security;
alter table credentials enable row level security;
alter table nostr_events enable row level security;
alter table nostr_event_relays enable row level security;
alter table nostr_profiles enable row level security;
alter table nostr_follows enable row level security;
alter table nostr_articles enable row level security;
alter table nostr_relay_prefs enable row level security;
alter table profile_fields enable row level security;
alter table tags enable row level security;
alter table account_tags enable row level security;
alter table intents enable row level security;
alter table connection_type_kinds enable row level security;
alter table connection_types enable row level security;
alter table connection_feedback enable row level security;
alter table notifications enable row level security;
alter table notification_prefs enable row level security;
alter table mutes enable row level security;
alter table reports enable row level security;
alter table feed_preferences enable row level security;
alter table onboarding_state enable row level security;
alter table article_drafts enable row level security;
alter table embeddings enable row level security;
alter table mcp_clients enable row level security;
alter table mcp_grants enable row level security;
alter table mcp_audit enable row level security;

-- Public cache reads for a future direct client. No write policies.
create policy nostr_profiles_public_read on nostr_profiles
  for select to anon, authenticated using (true);
create policy nostr_articles_public_read on nostr_articles
  for select to anon, authenticated using (true);
create policy tags_public_read on tags
  for select to anon, authenticated using (true);
create policy connection_kinds_public_read on connection_type_kinds
  for select to anon, authenticated using (true);
