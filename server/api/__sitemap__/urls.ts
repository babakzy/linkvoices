import { createClient } from '@supabase/supabase-js'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabase?.url || process.env.SUPABASE_URL
  const supabaseKey = config.public.supabase?.key || process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return []
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at')
    .eq('published', true)

  const staticPages = [
    { loc: '/crypto-anarchism', lastmod: '2026-06-06' },
  ]

  if (!posts?.length) {
    return staticPages
  }

  return [
    ...staticPages,
    ...posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updated_at || post.published_at,
    })),
  ]
})
