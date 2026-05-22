<template>
  <main class="min-h-screen bg-spring-wood-50">
    <!-- Page Header -->
    <div class="blog-header relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="max-w-6xl mx-auto relative z-10">
        <p class="text-cerulean-blue-200 text-xs font-bold uppercase tracking-[0.25em] mb-4">LinkVoices Blog</p>
        <h1 class="text-cerulean-blue-100 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
          Ideas for the Future of Crypto & AI
        </h1>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="text-center">
          <span class="loading loading-ring loading-lg text-cerulean-blue-600"></span>
          <p class="text-black-500 mt-4">Loading blog posts...</p>
        </div>
      </div>

      <template v-else-if="posts?.length > 0">
        <!-- Featured Post — first article gets a hero treatment -->
        <NuxtLink
          :to="`/blog/${posts[0].slug}`"
          class="group block mb-12 border border-black-200 hover:border-cerulean-blue-600 transition-colors duration-200 overflow-hidden"
        >
          <div class="grid md:grid-cols-2">
            <div class="aspect-[4/3] md:aspect-auto overflow-hidden bg-spring-wood-200">
              <img
                :src="posts[0].og_image || posts[0].image || '/placeholder.jpg'"
                :alt="posts[0].alt || posts[0].title"
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
            <div class="p-8 md:p-10 flex flex-col justify-between bg-white">
              <div>
                <p class="text-cerulean-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-4">Featured</p>
                <h2 class="text-2xl md:text-3xl font-bold text-spring-wood-950 leading-snug mb-4 group-hover:text-cerulean-blue-700 transition-colors duration-200 line-clamp-3">
                  {{ posts[0].title }}
                </h2>
                <p class="text-black-500 leading-relaxed line-clamp-4">{{ posts[0].description }}</p>
              </div>
              <div class="flex items-center justify-between mt-8 pt-6 border-t border-black-100">
                <span class="text-black-400 text-sm">{{ formatDate(posts[0].published_at || posts[0].date) }}</span>
                <span class="text-cerulean-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Read article
                  <span class="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Rest of posts — borderless tile grid -->
        <div
          v-if="posts.length > 1"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black-200"
        >
          <NuxtLink
            v-for="post in posts.slice(1)"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="group border-r border-b border-black-200 overflow-hidden bg-white hover:bg-spring-wood-50 transition-colors duration-200"
          >
            <div class="aspect-[16/10] overflow-hidden bg-spring-wood-100">
              <img
                :src="post.og_image || post.image || '/placeholder.jpg'"
                :alt="post.alt || post.title"
                class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
            </div>
            <div class="p-6">
              <h2 class="text-lg font-bold text-spring-wood-950 leading-snug group-hover:text-cerulean-blue-700 transition-colors duration-200 line-clamp-2 mb-2">
                {{ post.title }}
              </h2>
              <p class="text-black-500 text-sm leading-relaxed line-clamp-3">{{ post.description }}</p>
              <span class="text-black-400 text-xs mt-4 block">{{ formatDate(post.published_at || post.date) }}</span>
            </div>
          </NuxtLink>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div class="w-16 h-16 bg-spring-wood-100 flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-black-400 text-2xl">article</span>
        </div>
        <h3 class="text-xl font-semibold text-spring-wood-950 mb-2">No blog posts yet</h3>
        <p class="text-black-500">Check back soon for new content!</p>
      </div>
    </div>
  </main>
</template>

<script setup>
const { getPublishedPosts } = useBlog()

const { data: posts, pending: loading } = await useAsyncData(
  'blog-posts',
  () => getPublishedPosts(),
  { default: () => [] }
)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const config = useRuntimeConfig()
const siteUrl = config.public.url || 'https://linkvoices.com'
const blogUrl = `${siteUrl}/blog`

useHead({
  title: 'Blog — Crypto Payments & Invoicing Insights | Linkvoices',
  link: [
    { rel: 'canonical', href: blogUrl }
  ],
  meta: [
    {
      name: 'description',
      content: 'Insights on cryptocurrency payments, crypto invoicing, Bitcoin, Ethereum, and the future of decentralised finance. Practical guides for freelancers and businesses.'
    },
    { name: 'keywords', content: 'crypto blog, cryptocurrency payments, bitcoin guide, ethereum, crypto invoicing, decentralized finance, DeFi' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: blogUrl },
    { property: 'og:title', content: 'Blog — Crypto Payments & Invoicing Insights | Linkvoices' },
    {
      property: 'og:description',
      content: 'Insights on cryptocurrency payments, crypto invoicing, and the future of decentralised finance.'
    },
    { property: 'og:site_name', content: 'Linkvoices' },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog — Crypto Payments & Invoicing Insights | Linkvoices' },
    {
      name: 'twitter:description',
      content: 'Insights on cryptocurrency payments, crypto invoicing, and the future of decentralised finance.'
    },
    { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<style lang="scss" scoped>
.blog-header {
  background-color: #0049f3; /* cerulean-blue-700 */
  background-image:
    radial-gradient(circle, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px);
  background-size: 28px 28px;
  background-position: 0 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(6, 98, 255, 0.6) 0%, rgba(0, 35, 93, 0.85) 100%);
    pointer-events: none;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>