-- Initial Schema Migration for Linkvoices
-- This migration sets up the complete database structure for the crypto invoice generator

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
-- Stores user profile information and wallet addresses
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    
    -- Wallet addresses for different cryptocurrencies
    btc_wallet TEXT,
    eth_wallet TEXT,
    dai_wallet TEXT,
    usdt_trc20_wallet TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INVOICES TABLE
-- =====================================================
-- Stores invoice information
CREATE TABLE IF NOT EXISTS invoices (
    id BIGSERIAL PRIMARY KEY,
    invoice_uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Invoice details
    number TEXT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE,
    
    -- Sender and receiver information
    from_email TEXT NOT NULL,
    to_email TEXT,
    from_info JSONB DEFAULT '{}'::jsonb,
    to_info JSONB DEFAULT '{}'::jsonb,
    
    -- Payment details
    currency TEXT NOT NULL CHECK (currency IN ('btc', 'ethtrc20', 'usdt', 'dai')),
    wallet_address TEXT NOT NULL,
    total DECIMAL(20, 8) NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    
    -- Status tracking
    status TEXT DEFAULT 'not_paid' CHECK (status IN ('draft', 'not_paid', 'pending', 'paid', 'cancelled')),
    
    -- Metadata
    notes TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rename 'from' and 'to' columns if they exist (reserved keywords)
-- This handles the old schema
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'invoices' AND column_name = 'from'
    ) THEN
        ALTER TABLE invoices RENAME COLUMN "from" TO from_email;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'invoices' AND column_name = 'to'
    ) THEN
        ALTER TABLE invoices RENAME COLUMN "to" TO to_email;
    END IF;
END $$;

-- Indexes for invoices
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_invoice_uuid ON invoices(invoice_uuid);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_created_at ON invoices(created_at DESC);

-- Enable RLS for invoices
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invoices
CREATE POLICY "Users can view their own invoices"
    ON invoices FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invoices"
    ON invoices FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices"
    ON invoices FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices"
    ON invoices FOR DELETE
    USING (auth.uid() = user_id);

-- Public can view invoices by UUID (for payment)
CREATE POLICY "Anyone can view invoices by UUID"
    ON invoices FOR SELECT
    USING (true);

-- Trigger for invoices updated_at
CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
-- Stores payment transaction records
CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    transaction_uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    invoice_id UUID REFERENCES invoices(invoice_uuid) ON DELETE CASCADE NOT NULL,
    
    -- Transaction details
    transaction_id TEXT, -- External blockchain transaction ID
    amount DECIMAL(20, 8),
    currency TEXT,
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
    
    -- Metadata
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for transactions
CREATE INDEX idx_transactions_invoice_id ON transactions(invoice_id);
CREATE INDEX idx_transactions_transaction_id ON transactions(transaction_id);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Enable RLS for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
CREATE POLICY "Users can view transactions for their invoices"
    ON transactions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM invoices 
            WHERE invoices.invoice_uuid = transactions.invoice_id 
            AND invoices.user_id = auth.uid()
        )
    );

CREATE POLICY "Anyone can create transactions"
    ON transactions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update transactions for their invoices"
    ON transactions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM invoices 
            WHERE invoices.invoice_uuid = transactions.invoice_id 
            AND invoices.user_id = auth.uid()
        )
    );

-- Trigger for transactions updated_at
CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
-- Stores blog content (replacing markdown files)
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    
    -- Content
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- Full markdown content
    
    -- Media
    image TEXT,
    og_image TEXT,
    alt TEXT,
    
    -- Metadata
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT,
    
    -- Status
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    -- Timestamps
    date TEXT, -- For display (e.g., "December 2024")
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for blog_posts
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Enable RLS for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can view all blog posts"
    ON blog_posts FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create blog posts"
    ON blog_posts FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can update their own blog posts"
    ON blog_posts FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own blog posts"
    ON blog_posts FOR DELETE
    USING (auth.uid() = author_id);

-- Trigger for blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- USER ACTIVITY TRACKING (BACKEND ONLY)
-- =====================================================

-- User Activity Tracking - Records login/registration events for backend analysis
CREATE TABLE IF NOT EXISTS user_activity (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Activity type
    activity_type TEXT NOT NULL CHECK (activity_type IN ('registration', 'login', 'logout')),
    
    -- Device & Browser information
    user_agent TEXT,
    browser TEXT,
    browser_version TEXT,
    os TEXT,
    os_version TEXT,
    device_type TEXT, -- mobile, tablet, desktop
    
    -- Location (non-personal)
    country TEXT,
    country_code TEXT,
    city TEXT,
    region TEXT,
    
    -- Network
    ip_address TEXT, -- Store for backend analysis
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for user_activity
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_activity_type ON user_activity(activity_type);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at DESC);
CREATE INDEX idx_user_activity_country ON user_activity(country);

-- Enable RLS for user_activity
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_activity
-- Users can insert their own activity (triggered automatically)
CREATE POLICY "Users can insert their own activity"
    ON user_activity FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Only service role can view activity (backend/admin only)
-- Regular users cannot view this data
CREATE POLICY "Service role can view all activity"
    ON user_activity FOR SELECT
    USING (auth.role() = 'service_role');

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================

-- This is commented out by default. Uncomment if you want to seed blog posts
-- from existing markdown content

/*
INSERT INTO blog_posts (slug, title, description, content, image, og_image, alt, tags, date, published, published_at)
VALUES 
(
    'setup-crypto-wallet',
    'Dive into the Crypto World - Setup a Crypto Wallet',
    'quick guide to start using cryptocurrencies and setuping a wallet for it.',
    '# Dive into the Crypto World: 1. Setup a Crypto Wallet

If you''re new to cryptocurrency, the first thing need to know is the importance of a wallet. Just like a physical wallet for your cash, you need a digital wallet for your cryptocurrencies. Here''s a quick guide to get you started.

## What Is a Crypto Wallet?

A cryptocurrency wallet is a tool that lets you store, send, and receive digital currencies securely. It doesn''t actually store the currency itself but keeps your private keys—the critical codes that grant access to your cryptocurrencies—safe. Think of it as the key to your digital bank vault.

## Setting Up Your Wallet

1. Download or Purchase a Wallet: Choose a reputable provider, like a trusted app for hot wallets (e.g., Trust Wallet, MetaMask, or Coinbase Wallet) or a hardware wallet for cold storage (e.g., Ledger Nano X or Trezor).

2. Secure Your Wallet: Backup your recovery phrase or private keys in a safe place. Never share them with anyone.

3. Add Cryptocurrency: Purchase some cryptocurrency from an exchange and transfer it to your wallet.

### Why a Wallet Is Essential

Without a wallet, you can''t fully control your cryptocurrency. Keeping your funds on an exchange is risky since exchanges can be hacked. A wallet gives you ownership and control over your digital assets.',
    '/blog/wallet.jpg',
    '/blog/wallet.jpg',
    'How To Create Namespace Subdomain & Connect To Vercel App',
    ARRAY['crypto World', 'cryptocurrency'],
    'December 2024',
    true,
    NOW()
),
(
    'move-on-from-traditional-banking',
    'Move on from Traditional Banking',
    'Explore how cryptocurrency and blockchain technology are revolutionizing the financial landscape.',
    '# Move on from Traditional Banking

The financial world is evolving, and cryptocurrency is at the forefront of this revolution...',
    '/blog/banking.jpg',
    '/blog/banking.jpg',
    'Move on from Traditional Banking',
    ARRAY['banking', 'cryptocurrency', 'blockchain'],
    'December 2024',
    true,
    NOW()
);
*/
