# Quick Start Guide - Linkvoices

Get Linkvoices up and running in 10 minutes!

## 🚀 Prerequisites

- Node.js 18 or higher
- A Supabase account (free tier works)
- Git

## 📦 Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/babakzy/linkvoices.git
cd linkvoices

# Install dependencies
npm install
```

## 🔑 Step 2: Set Up Supabase (5 minutes)

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in:
   - **Name**: linkvoices (or your choice)
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to you
5. Wait for project to be created (~2 minutes)

### Get Your Credentials

1. In your project, go to **Settings** → **API**
2. Find and copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Configure Environment Variables

Create a `.env` file in the project root:

```bash
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_KEY=your-anon-key-here
BASE_URL=http://localhost:3000/
```

## 🗄️ Step 3: Set Up Database (3 minutes)

### Run Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file `supabase/migrations/20240101000000_initial_schema.sql` in your code editor
4. Copy ALL the contents
5. Paste into the Supabase SQL Editor
6. Click **"Run"** (bottom right)
7. Wait for "Success" message

### Verify Tables

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - profiles
   - invoices
   - transactions
   - blog_posts
   - page_views
   - invoice_views

✅ If you see all 6 tables, you're good to go!

## 🎯 Step 4: Seed Blog Data (Optional, 1 minute)

If you want to import the existing blog posts:

```bash
npm run seed:blog
```

## 🏃 Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎉 You're Done!

### What You Can Do Now

1. **Create an Account**
   - Click "Sign Up" or "Login"
   - Use email/password authentication
   - Your profile will be auto-created

2. **Set Up Wallets**
   - Go to Dashboard → Wallets
   - Add your crypto wallet addresses:
     - Bitcoin (BTC)
     - Ethereum (ETH)
     - Tether (USDT)
     - DAI
   - Click "Save Wallets"

3. **Create Your First Invoice**
   - Go to Dashboard → Create Invoice
   - Fill in invoice details:
     - Invoice number
     - Dates
     - Sender info (auto-fills from your profile)
     - Recipient info
     - Select currency
     - Add invoice items
   - Click "Save Invoice"
   - Get shareable invoice URL

4. **View Analytics**
   - Go to Dashboard → Analytics
   - See views, devices, browsers, countries
   - Track engagement on your invoices

5. **Check the Blog**
   - Visit `/blog`
   - See posts loaded from database

## 🔥 Quick Tips

### Creating Invoices

1. **Wallet Required**: You must add a wallet address for a currency before you can create invoices in that currency
2. **Invoice URL**: After saving, you get a shareable URL - send this to your clients
3. **Status Tracking**: Invoices start as "not_paid" and can be updated to "paid" when payment is received

### Privacy & Analytics

- All tracking is **privacy-focused**
- No personal information is collected
- IP addresses are hashed
- Anonymous visitor IDs only
- GDPR compliant

### Blog Management

- Blog posts are stored in the database
- To add a new post, insert into `blog_posts` table via Supabase dashboard
- Or build an admin interface (future feature)

## ❓ Troubleshooting

### "Cannot connect to database"

**Solution**: Check your `.env` file
- Make sure `SUPABASE_URL` and `SUPABASE_KEY` are correct
- No extra spaces or quotes
- Restart dev server after changing `.env`

### "Tables don't exist"

**Solution**: Run the migration again
1. Go to Supabase SQL Editor
2. Make sure the entire migration script was pasted
3. Check for any SQL errors in the output

### "User already registered" error

**Solution**: Check your Supabase Auth settings
1. Go to Authentication → Email Templates
2. Make sure email confirmation is configured
3. Or disable email confirmation for development

### Blog posts not showing

**Solution**: Run the seed script
```bash
npm run seed:blog
```

Or manually insert a blog post via Supabase:
1. Go to Table Editor → blog_posts
2. Click "Insert row"
3. Fill in: slug, title, description, content
4. Set published = true
5. Save

### Tracking not working

**Solution**: 
1. Make sure you're not blocking the geolocation API
2. Check browser console for errors
3. Verify analytics composable is imported correctly
4. Make sure you're calling `trackPageView()` in `onMounted()`

## 📚 Next Steps

### Learn More

- Read the [Migration Guide](./MIGRATION_GUIDE.md) for detailed feature documentation
- Check [API Reference](./docs/API_REFERENCE.md) for composable usage
- Review [Supabase README](./supabase/README.md) for database details

### Customize

1. **Update Branding**
   - Replace logo in `assets/images/`
   - Update colors in `tailwind.config.js`
   - Modify meta tags in `nuxt.config.ts`

2. **Add Features**
   - Extend the database schema
   - Create new composables
   - Add more currencies
   - Build admin panel for blog

3. **Deploy**
   - Build for production: `npm run build`
   - Deploy to Vercel, Netlify, or Cloudflare Pages
   - Update `BASE_URL` in `.env`

## 🆘 Need Help?

- **Documentation**: Check all `.md` files in the repo
- **Issues**: [GitHub Issues](https://github.com/babakzy/linkvoices/issues)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Nuxt Docs**: [nuxt.com/docs](https://nuxt.com/docs)

## 🎯 Key Files to Know

- `nuxt.config.ts` - App configuration
- `.env` - Environment variables (create this!)
- `supabase/migrations/` - Database schema
- `composables/` - Reusable functions
- `pages/dashboard/` - Dashboard pages
- `components/` - Vue components

## ✅ Checklist

Use this checklist to make sure everything is set up:

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Supabase project created
- [ ] `.env` file created with correct credentials
- [ ] Database migration run successfully
- [ ] All 6 tables visible in Supabase
- [ ] Blog posts seeded (optional)
- [ ] Dev server running
- [ ] Can access http://localhost:3000
- [ ] Can sign up / log in
- [ ] Can save wallet addresses
- [ ] Can create an invoice
- [ ] Can view analytics

---

<div align="center">

**That's it! You're ready to start generating crypto invoices! 🚀**

Have questions? Check the [full documentation](./README.md) or [open an issue](https://github.com/babakzy/linkvoices/issues).

</div>
