# Linkvoices - Crypto Invoice Generator

<div align="center">

![Linkvoices](https://github.com/babakzy/linkvoices/blob/main/assets/images/linkvoice-logo-bg.png?raw=true)

**Crypto invoices with Supabase-backed auth and a database-driven blog**

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

</div>

## Overview

Linkvoices lets you create and share crypto invoices (BTC, ETH, USDT, DAI), manage wallets, and publish blog posts stored in Postgres. Authentication and data use Supabase with Row Level Security.

## Features

- Multi-currency invoices with shareable public URLs (`invoice_uuid`)
- Wallet addresses on user profiles
- Blog stored in Supabase (`blog_posts`), optional seed from `content/*.md`
- Auth activity logging (`user_activity`) for backend/analysis use only
- Responsive UI (Tailwind + DaisyUI); design notes in [`LINKVOICES_UI_KIT.md`](./LINKVOICES_UI_KIT.md)

## Quick start

**Prerequisites:** Node.js 18+, npm/yarn/pnpm, a Supabase project.

1. **Clone and install**

   ```bash
   git clone https://github.com/babakzy/linkvoices.git && cd linkvoices
   npm install
   ```

2. **Environment** — create `.env` in the repo root:

   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   URL=http://localhost:3000
   ```

   `nuxt.config` also accepts `BASE_URL`; keep a trailing slash optional (it is normalized).

3. **Database** — Supabase Dashboard → SQL Editor → run the full file  
   [`supabase/migrations/20240101000000_initial_schema.sql`](./supabase/migrations/20240101000000_initial_schema.sql).

4. **Blog seed (optional)** — `npm run seed:blog`

5. **Dev server** — `npm run dev` → [http://localhost:3000](http://localhost:3000)

**Troubleshooting:** Wrong credentials → check `.env` and restart dev server. Missing tables → re-run migration. Empty blog → run seed or insert rows in `blog_posts`.

## Documentation

| Doc | Contents |
|-----|----------|
| [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) | Architecture, schema summary, tracking behavior |
| [docs/API_REFERENCE.md](./docs/API_REFERENCE.md) | Composables (`useBlog`, `useTracking`, user helpers) |
| [supabase/README.md](./supabase/README.md) | Supabase setup and schema notes |
| [LINKVOICES_UI_KIT.md](./LINKVOICES_UI_KIT.md) | Brand, layout, Tailwind tokens |

## Project structure

```
linkvoices/
├── components/       # Vue components
├── composables/      # useBlog, useTracking, user.js
├── content/          # Legacy markdown (seed source)
├── pages/            # Routes (dashboard, blog, invoice, …)
├── plugins/          # e.g. auth-tracking.client.ts
├── scripts/          # seed-blog-posts.js
├── supabase/         # migrations + README
├── docs/             # Developer docs
└── nuxt.config.ts
```

## Tech stack

Nuxt 3, Vue 3, TailwindCSS, DaisyUI, Supabase Auth + Postgres, `marked`, jsPDF/html2canvas for PDF-related flows where used.

## Security & privacy

- RLS on all application tables.
- Invoice public access uses `invoice_uuid`; owners manage invoices when signed in.
- `user_activity` holds technical/metadata fields for auth events; treat as privileged data and query with the service role or Supabase dashboard as documented in the migration policies.

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run generate     # Static generation
npm run preview      # Preview production build
npm run seed:blog    # Import content/*.md → blog_posts
```

## Deployment

Build with `npm run build` (or `npm run generate` for static). Set `SUPABASE_*` and `URL`/`BASE_URL` on the host (e.g. Vercel, Netlify, Cloudflare Pages).

## Contributing

Fork, branch, open a PR. Issues and discussions welcome on GitHub.

## License

[MIT License](LICENSE).

<div align="center">

**[Website](https://linkvoices.com)** • **[Development docs](./docs/DEVELOPMENT.md)** • **[Issues](https://github.com/babakzy/linkvoices/issues)**

</div>
