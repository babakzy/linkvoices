# Linkvoices - Crypto Invoice Generator

<div align="center">

![Linkvoices](https://github.com/babakzy/linkvoices/blob/main/assets/images/linkvoice-logo-bg.png?raw=true)

**Let's decentralize power and authorities by using cryptocurrencies in our daily payments**

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

</div>

## 🚀 Overview

Linkvoices is a modern, privacy-focused cryptocurrency invoice generator that allows freelancers, businesses, and individuals to create and send professional invoices for crypto payments. Built with Nuxt 3, Vue 3, and powered by Supabase, it offers a seamless experience for managing crypto transactions.

### ✨ Key Features

- 💰 **Multi-Currency Support**: Bitcoin (BTC), Ethereum (ETH), USDT, and DAI
- 📊 **Invoice Management**: Create, edit, and track invoices with ease
- 🔐 **Privacy-Focused Analytics**: Track invoice views without collecting personal data
- 📝 **Blog System**: Built-in blog for crypto-related content
- 🎨 **Modern UI**: Clean, responsive design with TailwindCSS
- 📈 **Analytics Dashboard**: Detailed insights on invoice engagement
- 🔒 **Secure**: Row Level Security with Supabase
- 🌍 **Geolocation**: Track viewer locations (country/city level only)

## 🎯 What's New

This is a complete rebuild with the following improvements:

### Database & Backend
- ✅ Complete Supabase migration files
- ✅ Proper indexing and foreign key relationships
- ✅ Row Level Security for all tables
- ✅ Automatic profile creation on signup
- ✅ Soft delete support for invoices

### Blog System
- ✅ Migrated from markdown files to database
- ✅ Dynamic blog management
- ✅ Tag system and publishing workflow
- ✅ SEO optimization
- ✅ Markdown rendering with `marked`

### Analytics & Tracking
- ✅ Privacy-focused tracking (no PII)
- ✅ Device, browser, and OS detection
- ✅ Geographic insights (country/city)
- ✅ Per-invoice analytics
- ✅ Visual analytics dashboard
- ✅ Anonymous visitor and session tracking

### Code Quality
- ✅ New composables for blog and tracking
- ✅ Better error handling
- ✅ Loading and empty states
- ✅ Improved component structure

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/babakzy/linkvoices.git
cd linkvoices
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project credentials
3. Create a `.env` file in the root directory:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
BASE_URL=http://localhost:3000/
```

### 4. Run database migrations

Follow the detailed instructions in `supabase/README.md`:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Run the migration

### 5. Seed blog posts (optional)

If you have existing markdown blog posts in the `content/` directory:

```bash
npm run seed:blog
```

### 6. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

- **[Migration Guide](./MIGRATION_GUIDE.md)** - Complete guide to the rebuild and new features
- **[Supabase Setup](./supabase/README.md)** - Detailed Supabase configuration
- **[UI Kit](./LINKVOICES_UI_KIT.md)** - Design system and components

## 🏗️ Project Structure

```
linkvoices/
├── assets/              # Images, styles, and static assets
├── components/          # Vue components
│   ├── Landing/        # Landing page components
│   └── ...
├── composables/        # Reusable composition functions
│   ├── useBlog.js     # Blog operations
│   ├── useTracking.js # Analytics & tracking
│   └── user.js        # User profile operations
├── content/           # Markdown blog posts (legacy)
├── layouts/           # Nuxt layouts
├── pages/             # Application pages
│   ├── blog/         # Blog pages
│   ├── dashboard/    # Dashboard pages
│   └── invoice/      # Invoice pages
├── plugins/           # Nuxt plugins
├── public/            # Public assets
├── scripts/           # Utility scripts
│   └── seed-blog-posts.js
├── supabase/          # Database migrations
│   ├── migrations/
│   └── README.md
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

## 🎨 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com)
- **Frontend**: [Vue 3](https://vuejs.org)
- **Styling**: [TailwindCSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Markdown**: [marked](https://marked.js.org)
- **PDF Generation**: jsPDF + html2canvas
- **Analytics**: Custom tracking system

## 📊 Database Schema

### Core Tables

- **profiles** - User profiles and wallet addresses
- **invoices** - Invoice data and details
- **transactions** - Payment transaction records
- **blog_posts** - Blog content management

### Analytics Tables

- **page_views** - General page view tracking
- **invoice_views** - Invoice-specific analytics

See `supabase/README.md` for complete schema documentation.

## 🔐 Security & Privacy

### Data Protection
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- IP addresses are hashed (SHA-256)
- No cookies for tracking
- Anonymous visitor/session IDs

### Best Practices
- Environment variables for sensitive data
- Server-side operations use service role key
- Public access limited to necessary data
- Authentication required for dashboard

## 📈 Analytics Features

The analytics system tracks:

- **Device Information**: Type (mobile/tablet/desktop), browser, OS
- **Geographic Data**: Country, city, region
- **Engagement**: Total views, unique visitors, sessions
- **Privacy**: No personal data, hashed IPs, anonymous IDs

View analytics in the dashboard at `/dashboard/analytics`

## 🚢 Deployment

### Build for production

```bash
npm run build
```

### Generate static site

```bash
npm run generate
```

### Preview production build

```bash
npm run preview
```

### Deployment Platforms

Linkvoices can be deployed to:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- Any Node.js hosting

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run seed:blog    # Seed blog posts from markdown files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Support

- **Issues**: [GitHub Issues](https://github.com/babakzy/linkvoices/issues)
- **Discussions**: [GitHub Discussions](https://github.com/babakzy/linkvoices/discussions)

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com)
- Powered by [Supabase](https://supabase.com)
- Icons from [Material Symbols](https://fonts.google.com/icons)
- Fonts from [Satoshi](https://www.fontshare.com/fonts/satoshi)

---

<div align="center">

Made with ❤️ for the crypto community

**[Website](https://linkvoices.com)** • **[Documentation](./MIGRATION_GUIDE.md)** • **[Report Bug](https://github.com/babakzy/linkvoices/issues)**

</div>
