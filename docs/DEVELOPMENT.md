# Development guide

Condensed architecture and behavioral notes for Linkvoices contributors.

## Stack

Nuxt 3, Vue 3, Tailwind (+ DaisyUI), Supabase (Postgres + Auth). Blog HTML is rendered with `marked` from rows in Supabase.

## Database

Apply `supabase/migrations/20240101000000_initial_schema.sql` in the Supabase SQL Editor (see `supabase/README.md`).

Core tables:

| Table | Purpose |
|--------|---------|
| `profiles` | Mirrors auth users + crypto wallet fields |
| `invoices` | Invoice records; `invoice_uuid` for public links |
| `transactions` | Optional payment rows linked to invoices |
| `blog_posts` | Published/markdown blog body and metadata |
| `user_activity` | Auth-event rows (login / registration / logout) for backend analysis |

Row Level Security is enabled on all tables. `user_activity` allows users to **insert** their own rows; **select** is intended for the service role / dashboard SQL only (see policies in the migration file).

## Blog

- Listing and post pages read from `blog_posts` via `composables/useBlog.js`.
- Legacy markdown under `content/` can be imported with `npm run seed:blog` (`scripts/seed-blog-posts.js`).

## Auth activity tracking

- `plugins/auth-tracking.client.ts` listens to Supabase auth events and calls `trackUserActivity()` from `composables/useTracking.js`.
- Each event stores parsed user agent (browser, OS, device), optional IP geolocation fields, and timestamps into `user_activity`.
- Designed for operational analysis via Supabase (Table Editor / SQL with service role), not for end-user dashboards.

Example (run with privileged / service access):

```sql
SELECT activity_type, country, browser, created_at
FROM user_activity
ORDER BY created_at DESC
LIMIT 100;
```

## Useful paths

| Path | Role |
|------|------|
| `composables/useBlog.js` | Blog CRUD-style helpers |
| `composables/useTracking.js` | `trackUserActivity`, `parseUserAgent` |
| `composables/user.js` | Profile helpers |
| `pages/dashboard/` | Authenticated invoice + wallet UI |
| `pages/invoice/` | Public invoice by UUID |

## References

- [API reference](./API_REFERENCE.md) — composable signatures
- [Supabase setup](../supabase/README.md) — migrations and RLS overview
- [UI kit](../LINKVOICES_UI_KIT.md) — brand and Tailwind conventions
