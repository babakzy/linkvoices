# API Reference - Linkvoices Composables

This document provides a reference for all composables and their methods in the Linkvoices application.

## Table of Contents

- [useBlog](#useblog)
- [useTracking](#usetracking)
- [User Operations](#user-operations)

---

## useBlog

Composable for managing blog posts stored in Supabase.

### Import

```javascript
const { 
  getPublishedPosts,
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  createPost,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost 
} = useBlog()
```

### Methods

#### `getPublishedPosts()`

Get all published blog posts, ordered by publish date (newest first).

**Returns:** `Promise<Array>`

```javascript
const posts = await getPublishedPosts()
// Returns: [{ id, slug, title, description, content, image, tags, ... }]
```

#### `getAllPosts()`

Get all blog posts (including unpublished), ordered by creation date.

**Returns:** `Promise<Array>`

```javascript
const allPosts = await getAllPosts()
```

#### `getPostBySlug(slug)`

Get a single blog post by its slug.

**Parameters:**
- `slug` (string) - The post slug

**Returns:** `Promise<Object|null>`

```javascript
const post = await getPostBySlug('setup-crypto-wallet')
```

#### `getPostsByTag(tag)`

Get all published posts with a specific tag.

**Parameters:**
- `tag` (string) - The tag to filter by

**Returns:** `Promise<Array>`

```javascript
const cryptoPosts = await getPostsByTag('cryptocurrency')
```

#### `createPost(postData)`

Create a new blog post.

**Parameters:**
- `postData` (object) - Post data

**Returns:** `Promise<Object>`

```javascript
const newPost = await createPost({
  slug: 'my-new-post',
  title: 'My New Post',
  description: 'A great article',
  content: '# Hello\n\nThis is my post.',
  image: '/blog/image.jpg',
  tags: ['crypto', 'tutorial'],
  published: false
})
```

#### `updatePost(slug, postData)`

Update an existing blog post.

**Parameters:**
- `slug` (string) - Post slug to update
- `postData` (object) - Updated post data

**Returns:** `Promise<Object>`

```javascript
const updated = await updatePost('my-post', {
  title: 'Updated Title',
  description: 'New description'
})
```

#### `deletePost(slug)`

Delete a blog post.

**Parameters:**
- `slug` (string) - Post slug to delete

**Returns:** `Promise<boolean>`

```javascript
const success = await deletePost('old-post')
```

#### `publishPost(slug)`

Publish a blog post (sets published=true and published_at).

**Parameters:**
- `slug` (string) - Post slug to publish

**Returns:** `Promise<Object>`

```javascript
const published = await publishPost('my-draft-post')
```

#### `unpublishPost(slug)`

Unpublish a blog post (sets published=false).

**Parameters:**
- `slug` (string) - Post slug to unpublish

**Returns:** `Promise<Object>`

```javascript
const unpublished = await unpublishPost('my-post')
```

---

## useTracking

Composable for analytics and tracking operations.

### Import

```javascript
const {
  trackPageView,
  trackInvoiceView,
  getInvoiceAnalytics,
  getAggregatedAnalytics,
  parseUserAgent,
  getSessionId,
  getVisitorId
} = useTracking()
```

### Methods

#### `trackPageView()`

Track a page view with device, browser, OS, and location data.

**Returns:** `Promise<void>`

**Usage:**
```javascript
// In onMounted or page lifecycle
onMounted(async () => {
  await trackPageView()
})
```

**What it tracks:**
- Page path and title
- Referrer URL
- Session and visitor IDs (anonymous)
- Browser and version
- Operating system and version
- Device type (mobile/tablet/desktop)
- Country, city, region
- Hashed IP address

#### `trackInvoiceView(invoiceUuid)`

Track when an invoice is viewed.

**Parameters:**
- `invoiceUuid` (string) - UUID of the invoice

**Returns:** `Promise<void>`

```javascript
const invoiceUuid = route.params.id
await trackInvoiceView(invoiceUuid)
```

**What it tracks:**
- Invoice UUID
- Session and visitor IDs
- Device, browser, OS information
- Location data
- Hashed IP

#### `getInvoiceAnalytics(invoiceUuid?)`

Get raw analytics data for invoices.

**Parameters:**
- `invoiceUuid` (string, optional) - Specific invoice UUID, or null for all

**Returns:** `Promise<Array>`

```javascript
// Get all invoice views
const allViews = await getInvoiceAnalytics()

// Get views for specific invoice
const invoiceViews = await getInvoiceAnalytics('abc-123-def')
```

#### `getAggregatedAnalytics(invoiceUuid?)`

Get aggregated analytics with statistics and breakdowns.

**Parameters:**
- `invoiceUuid` (string, optional) - Specific invoice UUID, or null for all

**Returns:** `Promise<Object>`

```javascript
const analytics = await getAggregatedAnalytics('abc-123')

console.log(analytics)
// {
//   totalViews: 45,
//   uniqueVisitors: 28,
//   byCountry: { 'United States': 20, 'Canada': 15, ... },
//   byDevice: { 'mobile': 30, 'desktop': 15 },
//   byBrowser: { 'Chrome': 25, 'Safari': 10, ... },
//   recentViews: [{ id, created_at, browser, ... }]
// }
```

#### `parseUserAgent(userAgent?)`

Parse user agent string to extract browser and OS information.

**Parameters:**
- `userAgent` (string, optional) - User agent string (defaults to navigator.userAgent)

**Returns:** `Object`

```javascript
const info = parseUserAgent()
// {
//   browser: 'Chrome',
//   browserVersion: '120.0',
//   os: 'Windows',
//   osVersion: '10',
//   deviceType: 'desktop',
//   userAgent: 'Mozilla/5.0...'
// }
```

#### `getSessionId()`

Get or create an anonymous session ID (stored in sessionStorage).

**Returns:** `string|null`

```javascript
const sessionId = getSessionId()
// Returns: 'session_1234567890_abc123def'
```

#### `getVisitorId()`

Get or create an anonymous visitor ID (stored in localStorage).

**Returns:** `string|null`

```javascript
const visitorId = getVisitorId()
// Returns: 'visitor_1234567890_xyz789'
```

---

## User Operations

Functions for user profile management.

### Import

```javascript
import { getProfileData } from '~/composables/user.js'
```

### `getProfileData()`

Get the current user's profile data including wallet addresses.

**Returns:** `Promise<Object>`

```javascript
const profile = await getProfileData()
// {
//   id: 'user-uuid',
//   email: 'user@example.com',
//   full_name: 'John Doe',
//   btc_wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
//   eth_wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
//   dai_wallet: '0x...',
//   usdt_trc20_wallet: 'T...',
//   created_at: '2024-01-01T00:00:00Z',
//   updated_at: '2024-01-01T00:00:00Z'
// }
```

---

## Supabase Direct Access

For operations not covered by composables, you can use the Supabase client directly.

### Import

```javascript
const supabase = useSupabaseClient()
const user = useSupabaseUser()
```

### Common Operations

#### Query Invoices

```javascript
const { data: invoices, error } = await supabase
  .from('invoices')
  .select('*')
  .eq('user_id', user.value.id)
  .order('created_at', { ascending: false })
```

#### Create Invoice

```javascript
const { data, error } = await supabase
  .from('invoices')
  .insert([{
    number: '001',
    issue_date: new Date(),
    from_email: 'sender@example.com',
    to_email: 'client@example.com',
    currency: 'btc',
    total: 0.05,
    // ... other fields
  }])
  .select()
```

#### Update Profile

```javascript
const { data, error } = await supabase
  .from('profiles')
  .update({
    btc_wallet: 'new-wallet-address',
    full_name: 'Updated Name'
  })
  .eq('id', user.value.id)
  .select()
```

---

## Type Definitions

### Blog Post Object

```typescript
interface BlogPost {
  id: number
  slug: string
  title: string
  description: string
  content: string
  image?: string
  og_image?: string
  alt?: string
  tags: string[]
  author_id?: string
  author_name?: string
  published: boolean
  published_at?: string
  meta_title?: string
  meta_description?: string
  date: string
  created_at: string
  updated_at: string
}
```

### Invoice Object

```typescript
interface Invoice {
  id: number
  invoice_uuid: string
  user_id: string
  number: string
  issue_date: string
  due_date?: string
  from_email: string
  to_email?: string
  from_info: {
    name?: string
    address?: string
    city?: string
    country?: string
  }
  to_info: {
    name?: string
    address?: string
    city?: string
    country?: string
  }
  currency: 'btc' | 'ethtrc20' | 'usdt' | 'dai'
  wallet_address: string
  total: number
  items: Array<{
    name: string
    quantity: number
    rate: number
    tax: number
    amount: number
  }>
  status: 'draft' | 'not_paid' | 'pending' | 'paid' | 'cancelled'
  notes?: string
  is_deleted: boolean
  created_at: string
  updated_at: string
}
```

### Analytics Object

```typescript
interface Analytics {
  totalViews: number
  uniqueVisitors: number
  byCountry: Record<string, number>
  byDevice: Record<string, number>
  byBrowser: Record<string, number>
  recentViews: Array<{
    id: number
    created_at: string
    browser: string
    os: string
    device_type: string
    country: string
    // ... other fields
  }>
}
```

---

## Best Practices

### Error Handling

Always wrap async operations in try-catch blocks:

```javascript
try {
  const posts = await getPublishedPosts()
  // Use posts
} catch (error) {
  console.error('Failed to fetch posts:', error)
  // Handle error (show message, retry, etc.)
}
```

### Loading States

Show loading indicators during async operations:

```javascript
const loading = ref(true)
const posts = ref([])

onMounted(async () => {
  try {
    posts.value = await getPublishedPosts()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
```

### Tracking Best Practices

1. **Track on page mount**: Call tracking functions in `onMounted()`
2. **Don't block UI**: Use async/await but don't wait for tracking to complete UI rendering
3. **Handle errors gracefully**: Tracking failures shouldn't break the app

```javascript
onMounted(async () => {
  // Track but don't block
  trackPageView().catch(console.warn)
  
  // Load data
  await loadData()
})
```

---

## Examples

### Complete Blog Page Example

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="posts.length === 0">No posts yet</div>
    <div v-else>
      <article v-for="post in posts" :key="post.slug">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <NuxtLink :to="`/blog/${post.slug}`">Read more</NuxtLink>
      </article>
    </div>
  </div>
</template>

<script setup>
const { getPublishedPosts } = useBlog()
const { trackPageView } = useTracking()

const loading = ref(true)
const posts = ref([])

onMounted(async () => {
  // Track page view
  trackPageView()
  
  // Load posts
  try {
    posts.value = await getPublishedPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  } finally {
    loading.value = false
  }
})
</script>
```

### Invoice Analytics Example

```vue
<template>
  <div>
    <select v-model="selectedInvoice" @change="loadAnalytics">
      <option value="">All Invoices</option>
      <option v-for="invoice in invoices" :key="invoice.invoice_uuid" :value="invoice.invoice_uuid">
        {{ invoice.number }}
      </option>
    </select>
    
    <div v-if="analytics">
      <h3>Total Views: {{ analytics.totalViews }}</h3>
      <h3>Unique Visitors: {{ analytics.uniqueVisitors }}</h3>
      
      <h4>By Country:</h4>
      <ul>
        <li v-for="(count, country) in analytics.byCountry" :key="country">
          {{ country }}: {{ count }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { getAggregatedAnalytics } = useTracking()

const selectedInvoice = ref('')
const analytics = ref(null)

const loadAnalytics = async () => {
  analytics.value = await getAggregatedAnalytics(selectedInvoice.value || null)
}

onMounted(() => {
  loadAnalytics()
})
</script>
```

---

## Environment Variables

Required environment variables in `.env`:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

# Base URL (for invoice links)
BASE_URL=https://yourdomain.com/
```

---

## Support

For more information:
- Main documentation: [README.md](../README.md)
- Migration guide: [MIGRATION_GUIDE.md](../MIGRATION_GUIDE.md)
- Supabase setup: [supabase/README.md](../supabase/README.md)
