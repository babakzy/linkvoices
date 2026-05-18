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

Composable for **authentication activity** logged to Supabase (`user_activity`).  
Invoked automatically from `plugins/auth-tracking.client.ts` on sign-in / sign-out; you can call `trackUserActivity` manually only when it makes sense (user must be signed in).

### Import

```javascript
const { trackUserActivity, parseUserAgent } = useTracking()
```

### Methods

#### `trackUserActivity(activityType?)`

Writes one row when the Supabase session has a user. Default `activityType` is `'login'`; schema allows `'registration' | 'login' | 'logout'`.

**Returns:** `Promise<void>`

Collects parsed user-agent fields, optional IP (`api.ipify.org`), and coarse location (`ipapi.co`), then inserts into `user_activity`. Failures are logged with `console.warn` and must not block the UI.

```javascript
await trackUserActivity('login')
```

#### `parseUserAgent(userAgent?)`

Parses browser name/version, OS, device type, and returns `{ browser, browserVersion, os, osVersion, deviceType, userAgent }`.

**Parameters:**

- `userAgent` (string, optional) — defaults to `navigator.userAgent` on client

**Returns:** `Object`

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

### Tracking note

Authentication events are recorded from `plugins/auth-tracking.client.ts`. Do not rely on blocking the UI on `trackUserActivity`; use `.catch(console.warn)` or fire-and-forget patterns if you invoke it elsewhere.

```javascript
onMounted(() => {
  trackUserActivity('login').catch(console.warn)
})
```


---

## Examples

### Blog listing

```vue
<script setup>
const { getPublishedPosts } = useBlog()

const loading = ref(true)
const posts = ref([])

onMounted(async () => {
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

---

## Environment Variables

Required environment variables in `.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
URL=http://localhost:3000
```

Alternate: `BASE_URL` (normalized the same way in `nuxt.config.ts`).

---

## Support

For more information:
- Main readme: [README.md](../README.md)
- Developer guide: [DEVELOPMENT.md](./DEVELOPMENT.md)
- Supabase setup: [supabase/README.md](../supabase/README.md)
