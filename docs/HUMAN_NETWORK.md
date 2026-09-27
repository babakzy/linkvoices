# Linkvoices human network

This is the product pivot. Linkvoices stays the name. The homepage is now a social app for finding people. The old invoice landing is still available at `/legacy/invoicing`. Invoice dashboard routes are unchanged.

The product spec lives in `new-product-docs/`. This file is the build note: what is implemented, how to turn the database on, and what is deliberately not finished.

## What you need to do

1. In the Supabase project, open **Database → Extensions** and enable **vector**.
2. Open **SQL Editor** and run `supabase/migrations/20260927120000_human_network.sql`.
   The invoice tables are not dropped. This migration only adds new tables.
3. Add the service role key to the server environment. The Nuxt Supabase module reads it as `SUPABASE_SERVICE_KEY`.
   The anon key already used by invoicing is not enough. The new tables are locked with row level security, and the app server is the only writer.
4. Restart `pnpm dev`.

If the migration fails on `extensions.vector`, the vector extension is not enabled yet. Enable it and run the file again. If the failure is only the `embeddings` index, the rest of the app still runs: discovery in this build matches on shared tags, not on vectors.

You do not need a new Supabase project. You do not need to paste private keys into the dashboard.

## What is running

- Homepage, with the existing scroll animation of the intermediary fading out.
- Account creation in the browser. The private key is encrypted with AES-256-GCM. The password is stretched with Argon2id. The server stores a verifier and wrapped keys. It cannot open them.
- Optional 12-word recovery phrase, same wrapping model.
- Sign-in with email and password. The key is decrypted into memory for the visit and cleared after 30 minutes idle, on sign-out, and on reload.
- Existing Nostr users can connect a NIP-07 browser extension by signing a challenge, or paste a recovery key (`nsec`), which is then encrypted the same way as a new account. An `npub` alone does not grant an account.
- Public “look around” feed from relays, no account required.
- Home feed with Following, For you, Local, Work, New people, Serendipity, and Trends. The selected mode is saved.
- Short posts, replies, reposts, likes, and deletion requests.
- Long-form articles (kind 30023) and private drafts.
- Follow and unfollow via the standard follow list.
- Profiles, interests, multiple intents with one active intent, and connection types. Sensitive types stay pending until the other person accepts. Following is never blocked by that.
- Discover page with a plain-language “Why this person?”. Explanations use public profile fields only.
- Direct messages using NIP-17 gift wrap. The screen states what relays can and cannot see.
- Notifications for connection requests, with per-type in-app switches.
- Mute, report, and private connection feedback.
- A cache of events the browser has already verified. Signed events stay the source of truth. The cache can be rebuilt by dropping `nostr_*` tables. Do not drop `people`.

## What is not finished

These tables exist so the next step does not need another schema redesign. Nothing fills them automatically yet.

| Piece | State |
| --- | --- |
| Background relay indexer | Not built. The browser submits events it has already loaded. A rebuild from relays needs a worker. |
| Embeddings and vector search | Table and index only. Matching uses shared tags and public text. |
| MCP server | Tables for clients, grants, and audit. No MCP endpoint is exposed. |
| Passkeys | Not in this build. Email and password is the working unlock. |
| Email one-time codes | Not in this build. A code alone cannot wrap a key, and there is no mail provider configured. |
| Remote signer (NIP-46) | Column exists (`custody_mode = nip46`). No bunker flow. |
| NIP-05 checks | Column exists. No verifier job. |
| NIP-49 encrypted key file | Recovery key is shown as `nsec` after the password is entered again. Encrypted file export is not wired. |
| Relay authentication (NIP-42) | Not wired. Some relays will refuse private-message reads until this exists. |

## Privacy rules already enforced

- Private and discovery-only profile fields are not returned on someone else's profile.
- Match explanations do not quote discovery-only fields.
- Connection feedback is written only for the person who sent it.
- Key material is not written to `localStorage`.

## Routes

| Path | Who |
| --- | --- |
| `/` | New landing |
| `/legacy/invoicing` | Previous invoice landing |
| `/start` | Create or connect an account |
| `/explore` | Public feed |
| `/home` | Following feed and the other feed modes |
| `/discover` | People, with reasons |
| `/search` | Posts |
| `/post`, `/write` | Short post, article |
| `/messages` | Private messages |
| `/notifications` | Requests and switches |
| `/profile`, `/settings` | Profile, intents, recovery key, relays |
| `/u/:npub` | A person |

## Default relays

`wss://relay.damus.io`, `wss://nos.lol`, `wss://relay.nostr.band`, `wss://relay.primal.net`.

They can be changed in Settings. That list stays in this browser.
