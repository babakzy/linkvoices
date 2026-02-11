# Migration Guide - Linkvoices Backend Rebuild

This document outlines all the changes made to rebuild the Linkvoices backend with Supabase and the improvements made to the application.

## 🎯 Overview

The following major changes have been implemented:

1. **Complete Supabase Database Schema** - Comprehensive migration files for all tables
2. **Blog System Migration** - Moved from markdown files to database
3. **User Tracking System** - Non-personal analytics for pages and invoices
4. **Analytics Dashboard** - View detailed invoice analytics
5. **Improved Code Structure** - Better organized composables and utilities

---

## 📊 Database Schema

### New Tables Created

#### 1. **profiles** (Enhanced)
Stores user profile information and cryptocurrency wallet addresses.

**Columns:**
- `id` - UUID (references auth.users)
- `email` - User email
- `full_name` - User's full name
- `avatar_url` - Profile picture URL
- `btc_wallet` - Bitcoin wallet address
- `eth_wallet` - Ethereum wallet address
- `dai_wallet` - DAI wallet address
- `usdt_trc20_wallet` - USDT (TRC20) wallet address
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

**Features:**
- Row Level Security (RLS) enabled
- Users can only access their own profile
- Automatic profile creation on user signup

#### 2. **invoices** (Enhanced)
Stores all invoice data with improved structure.

**Columns:**
- `id` - Serial ID
- `invoice_uuid` - UUID (unique identifier for public access)
- `user_id` - References auth.users
- `number` - Invoice number
- `issue_date` - Issue date
- `due_date` - Due date
- `from_email` - Sender email (renamed from `from`)
- `to_email` - Recipient email (renamed from `to`)
- `from_info` - JSONB (sender details)
- `to_info` - JSONB (recipient details)
- `currency` - Cryptocurrency type (btc, ethtrc20, usdt, dai)
- `wallet_address` - Payment wallet address
- `total` - Total amount
- `items` - JSONB array of invoice items
- `status` - Payment status (draft, not_paid, pending, paid, cancelled)
- `notes` - Additional notes
- `is_deleted` - Soft delete flag
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

**Features:**
- Proper indexing for performance
- RLS for user privacy
- Public read access by UUID (for payment)
- Soft delete support

#### 3. **transactions** (Enhanced)
Tracks payment transactions for invoices.

**Columns:**
- `id` - Serial ID
- `transaction_uuid` - UUID
- `invoice_id` - References invoices.invoice_uuid
- `transaction_id` - Blockchain transaction ID
- `amount` - Transaction amount
- `currency` - Currency type
- `status` - Transaction status (pending, confirmed, failed)
- `notes` - Additional notes
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

**Features:**
- Links to invoices via UUID
- Tracks blockchain transaction IDs
- Status tracking

#### 4. **blog_posts** (NEW)
Replaces markdown files for blog content.

**Columns:**
- `id` - Serial ID
- `slug` - Unique URL slug
- `title` - Post title
- `description` - Short description
- `content` - Full markdown content
- `image` - Featured image URL
- `og_image` - Open Graph image URL
- `alt` - Image alt text
- `tags` - Array of tags
- `author_id` - References auth.users
- `author_name` - Author display name
- `published` - Published status
- `published_at` - Publish timestamp
- `meta_title` - SEO title
- `meta_description` - SEO description
- `date` - Display date (e.g., "December 2024")
- `created_at` - Timestamp
- `updated_at` - Auto-updated timestamp

**Features:**
- Full markdown support
- Tag system
- Publishing workflow
- SEO optimization
- Public can read published posts
- Authors can manage their own posts

#### 5. **page_views** (NEW)
Tracks general page views with device and location data.

**Columns:**
- `id` - Serial ID
- `page_path` - URL path
- `page_title` - Page title
- `referrer` - Referrer URL
- `session_id` - Anonymous session ID
- `visitor_id` - Anonymous visitor ID
- `user_agent` - Browser user agent
- `browser` - Browser name
- `browser_version` - Browser version
- `os` - Operating system
- `os_version` - OS version
- `device_type` - Device type (mobile, tablet, desktop)
- `country` - Country name
- `country_code` - ISO country code
- `city` - City name
- `region` - Region/state
- `ip_hash` - Hashed IP address (SHA-256)
- `created_at` - Timestamp

**Features:**
- **Privacy-focused**: No personal data collected
- IP addresses are hashed
- Anonymous visitor and session tracking
- Device and browser detection
- Geolocation (country/city level)

#### 6. **invoice_views** (NEW)
Tracks specific invoice views for detailed analytics.

**Columns:**
- `id` - Serial ID
- `invoice_uuid` - References invoices
- `session_id` - Anonymous session ID
- `visitor_id` - Anonymous visitor ID
- `user_agent` - Browser user agent
- `browser` - Browser name
- `browser_version` - Browser version
- `os` - Operating system
- `os_version` - OS version
- `device_type` - Device type
- `country` - Country name
- `country_code` - ISO country code
- `city` - City name
- `region` - Region/state
- `ip_hash` - Hashed IP (SHA-256)
- `created_at` - Timestamp

**Features:**
- Per-invoice analytics
- Invoice owners can view their analytics
- Same privacy protections as page_views

---

## 🎨 Frontend Improvements

### New Composables

#### 1. **useBlog.js**
Replaces Nuxt Content for blog operations.

**Functions:**
- `getPublishedPosts()` - Get all published blog posts
- `getAllPosts()` - Get all posts (including unpublished)
- `getPostBySlug(slug)` - Get a single post
- `getPostsByTag(tag)` - Get posts by tag
- `createPost(postData)` - Create a new post
- `updatePost(slug, postData)` - Update a post
- `deletePost(slug)` - Delete a post
- `publishPost(slug)` - Publish a post
- `unpublishPost(slug)` - Unpublish a post

#### 2. **useTracking.js**
Handles all analytics and tracking operations.

**Functions:**
- `trackPageView()` - Track general page views
- `trackInvoiceView(invoiceUuid)` - Track invoice views
- `getInvoiceAnalytics(invoiceUuid)` - Get raw analytics data
- `getAggregatedAnalytics(invoiceUuid)` - Get aggregated analytics with stats
- `parseUserAgent()` - Parse browser/OS information
- `getSessionId()` - Get or create session ID
- `getVisitorId()` - Get or create visitor ID

**Privacy Features:**
- Uses sessionStorage for session tracking
- Uses localStorage for visitor tracking
- IP addresses are hashed client-side
- Geolocation via free API (ipapi.co)
- No cookies used for tracking

### Updated Pages

#### 1. **Blog Pages**
- **`/pages/blog/index.vue`** - Updated to fetch from database
- **`/pages/blog/[slug].vue`** - Updated to fetch from database, added markdown rendering with `marked`

**Features:**
- Loading states
- Empty states
- Share buttons (Twitter, LinkedIn, Copy Link)
- Better styling and layout
- Automatic page view tracking

#### 2. **Invoice Page**
- **`/pages/invoice/[id].vue`** - Added invoice view tracking

**Features:**
- Automatically tracks views when invoice is opened
- Non-intrusive tracking

#### 3. **Analytics Dashboard** (NEW)
- **`/pages/dashboard/analytics.vue`** - New analytics dashboard

**Features:**
- View analytics for all invoices or specific invoice
- Summary cards:
  - Total views
  - Unique visitors
  - Top device type
  - Top country
- Visual breakdowns:
  - Device types (with progress bars)
  - Browsers (with progress bars)
  - Geographic distribution
- Recent views table
- Real-time data

### Updated Components

#### **DashboardSideBar.vue**
Added Analytics link to the sidebar navigation.

---

## 🔧 Utilities and Scripts

### 1. **Migration File**
**Location:** `supabase/migrations/20240101000000_initial_schema.sql`

Complete SQL migration that creates:
- All tables with proper schema
- Indexes for performance
- Row Level Security policies
- Triggers for auto-updating timestamps
- Functions for automatic profile creation

### 2. **Seed Script**
**Location:** `scripts/seed-blog-posts.js`

Migrates existing markdown blog posts to the database.

**Usage:**
```bash
npm run seed:blog
```

**Features:**
- Parses markdown frontmatter
- Creates or updates blog posts
- Preserves all metadata
- Handles arrays and nested data

### 3. **Setup Documentation**
**Location:** `supabase/README.md`

Comprehensive guide for setting up Supabase, including:
- Step-by-step setup instructions
- Database schema overview
- Security features explanation
- Common tasks and troubleshooting

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install new dependencies:
- `marked` (^12.0.0) - Markdown rendering
- `@supabase/supabase-js` (^2.39.0) - Supabase client

### 2. Set Up Supabase

Follow the detailed instructions in `supabase/README.md`:

1. Create a new Supabase project
2. Update `.env` with your credentials:
   ```
   SUPABASE_URL=your-project-url
   SUPABASE_KEY=your-anon-key
   ```
3. Run the migration SQL in Supabase dashboard
4. Verify tables are created

### 3. Seed Blog Posts (Optional)

If you have existing markdown blog posts:

```bash
npm run seed:blog
```

This will import all markdown files from `content/` directory into the `blog_posts` table.

### 4. Run Development Server

```bash
npm run dev
```

### 5. Test Features

1. **Blog System:**
   - Visit `/blog` to see posts from database
   - Click on a post to view details
   - Check browser console for tracking

2. **Invoice Tracking:**
   - Create an invoice
   - Open the invoice URL (share it or open in incognito)
   - Visit `/dashboard/analytics` to see tracking data

3. **Analytics Dashboard:**
   - Go to `/dashboard/analytics`
   - Select an invoice or view all
   - Explore the analytics

---

## 📈 Key Improvements

### Database Structure
- ✅ Proper indexing for performance
- ✅ Row Level Security for data protection
- ✅ Soft delete support
- ✅ Auto-updating timestamps
- ✅ Proper foreign key relationships

### Blog System
- ✅ Database-driven (easier to manage)
- ✅ No need to rebuild for new posts
- ✅ Better SEO control
- ✅ Tag system
- ✅ Publishing workflow

### Tracking & Analytics
- ✅ Privacy-focused (no PII)
- ✅ GDPR-compliant
- ✅ Detailed device/browser/OS detection
- ✅ Geographic insights
- ✅ Per-invoice analytics
- ✅ Visual analytics dashboard

### Code Quality
- ✅ Better organized composables
- ✅ Reusable functions
- ✅ Proper error handling
- ✅ Loading states
- ✅ Empty states

---

## 🔒 Security & Privacy

### Data Protection
- All tables have Row Level Security (RLS) enabled
- Users can only access their own data
- IP addresses are hashed (SHA-256)
- No cookies used for tracking
- Anonymous visitor/session IDs

### Best Practices
- Sensitive operations use service role key (server-side only)
- Public access is limited to necessary data (invoices by UUID)
- Authentication required for all dashboard operations
- Automatic profile creation linked to auth system

---

## 📝 Migration Checklist

- [x] Create database migration file
- [x] Define all tables with proper schema
- [x] Add indexes for performance
- [x] Implement Row Level Security
- [x] Create blog migration script
- [x] Update blog pages to use database
- [x] Create tracking composable
- [x] Add tracking to invoice pages
- [x] Create analytics dashboard
- [x] Update dashboard sidebar
- [x] Add markdown rendering
- [x] Update package.json dependencies
- [x] Create comprehensive documentation

---

## 🐛 Known Issues & Future Improvements

### Current Limitations
1. Geolocation API (ipapi.co) is rate-limited - consider upgrading or caching
2. Markdown rendering is client-side - could be optimized with SSR
3. Analytics data grows over time - consider implementing data retention policies

### Future Enhancements
1. **Blog Features:**
   - Rich text editor for blog posts
   - Image upload for blog posts
   - Categories in addition to tags
   - Comments system

2. **Analytics:**
   - Export analytics data
   - More visualization options (charts)
   - Email reports
   - Comparison between time periods

3. **Invoices:**
   - Email notifications
   - Recurring invoices
   - Invoice templates
   - Multi-currency support
   - PDF generation improvements

4. **Performance:**
   - Caching layer for blog posts
   - Pagination for large datasets
   - Virtual scrolling for long lists

---

## 📞 Support

For issues or questions:
1. Check `supabase/README.md` for setup help
2. Review migration file for schema details
3. Check browser console for errors
4. Verify Supabase credentials in `.env`

---

## 🎉 Conclusion

This migration provides:
- ✅ Complete database structure
- ✅ Improved blog management
- ✅ Privacy-focused analytics
- ✅ Better code organization
- ✅ Enhanced user experience
- ✅ Scalable architecture

Your Linkvoices application is now ready for production with a robust backend and modern features!
