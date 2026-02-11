# Supabase Setup for Linkvoices

This directory contains the database migrations for the Linkvoices crypto invoice generator application.

## 📋 Prerequisites

- Supabase account (https://supabase.com)
- Supabase CLI installed (optional, for local development)
- Node.js 18+ for running seed scripts

## 🚀 Setup Instructions

### 1. Create a New Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details:
   - Name: linkvoices (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Wait for project to be provisioned

### 2. Get Your Project Credentials

1. Go to Project Settings > API
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)
   - **Service Role Key** (for admin operations, keep secure)

### 3. Update Environment Variables

Update your `.env` file in the project root:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
```

### 4. Run Database Migrations

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the entire contents of `migrations/20240101000000_initial_schema.sql`
5. Click **Run** to execute the migration

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Verify Database Setup

After running the migration, verify the tables were created:

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `profiles` - User profiles and wallet addresses
   - `invoices` - Invoice data
   - `transactions` - Payment transaction records
   - `blog_posts` - Blog content
   - `page_views` - Page analytics
   - `invoice_views` - Invoice-specific analytics

### 6. Seed Blog Posts (Optional)

To migrate existing markdown blog posts to the database:

```bash
# Install dependencies (if not already done)
npm install

# Run the seed script
npm run seed:blog

# Or directly with node:
node scripts/seed-blog-posts.js
```

This will import all markdown files from the `content/` directory into the `blog_posts` table.

### 7. Enable Authentication

1. Go to **Authentication** > **Providers** in Supabase dashboard
2. Enable desired authentication methods:
   - Email/Password (enabled by default)
   - Google OAuth (optional)
   - GitHub OAuth (optional)
3. Configure email templates in **Authentication** > **Email Templates**

### 8. Configure Storage (Optional)

If you plan to store user-uploaded images:

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket (e.g., `blog-images` or `invoice-attachments`)
3. Set up storage policies as needed

## 📊 Database Schema Overview

### Core Tables

#### `profiles`
Stores user profile information and cryptocurrency wallet addresses.
- Connected to `auth.users` via foreign key
- Stores BTC, ETH, DAI, and USDT wallet addresses
- RLS enabled for user privacy

#### `invoices`
Stores all invoice data for the crypto invoice generator.
- Contains sender/receiver information
- Stores invoice items as JSONB
- Tracks payment status
- Public read access by UUID (for payment)

#### `transactions`
Records payment transactions for invoices.
- Links to invoices via `invoice_uuid`
- Tracks blockchain transaction IDs
- Status tracking (pending, confirmed, failed)

#### `blog_posts`
Stores blog content (replaces markdown files).
- Full markdown content support
- SEO metadata fields
- Tag support
- Publishing workflow

### Analytics Tables

#### `page_views`
Tracks general page views with device and location data.
- Non-personal tracking (no PII)
- Browser, OS, device type detection
- Country/city geolocation (IP-based)
- Anonymous visitor and session IDs

#### `invoice_views`
Tracks specific invoice views for analytics.
- Per-invoice analytics
- Same tracking fields as page_views
- Helps invoice creators see engagement

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **profiles**: Users can only view/edit their own profile
- **invoices**: Users can only manage their own invoices, but anyone can view by UUID
- **transactions**: Users can view transactions for their invoices
- **blog_posts**: Public can read published posts, authors can manage their own
- **page_views/invoice_views**: Anyone can insert, authenticated users can view analytics

### Data Privacy

- IP addresses are hashed (SHA-256) for privacy
- Only non-personal tracking data is stored
- No PII (Personal Identifiable Information) in analytics tables

## 🛠️ Maintenance

### Backup

Supabase provides automatic backups. To create manual backups:

1. Go to **Settings** > **Database**
2. Click **Create backup**

### Monitoring

Monitor your database:

1. Go to **Database** > **Reports**
2. View query performance, connections, and resource usage

### Updates

To add new migrations:

1. Create a new file in `supabase/migrations/`
2. Name it with timestamp: `YYYYMMDDHHMMSS_description.sql`
3. Write your SQL migration
4. Apply via dashboard or CLI

## 📝 Common Tasks

### Reset Database (Development Only)

```bash
supabase db reset
```

⚠️ **Warning**: This will delete all data!

### Create a New Migration

```bash
supabase migration new your_migration_name
```

### View Migration Status

```bash
supabase migration list
```

## 🆘 Troubleshooting

### Migration Fails

1. Check SQL syntax errors in the dashboard
2. Ensure tables don't already exist
3. Check foreign key constraints
4. Review RLS policies

### Authentication Issues

1. Verify SUPABASE_URL and SUPABASE_KEY in `.env`
2. Check authentication is enabled in dashboard
3. Verify email confirmation settings

### RLS Blocking Queries

1. Check you're authenticated when required
2. Review RLS policies in dashboard
3. Use service role key for admin operations (server-side only)

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Support

For issues specific to Linkvoices:
- Check the main project README
- Review GitHub issues
- Contact project maintainers

For Supabase-specific issues:
- Check [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)
- Join [Supabase Discord](https://discord.supabase.com)
