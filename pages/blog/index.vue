<template>
  <main class="min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <h2 class="text-gray-200 text-center text-2xl font-blog mb-2">Blog</h2>
      <h1 class="text-spring-wood-950 text-center md:text-4xl text-3xl font-bold mb-12">Ideas for the Future of Crypto & AI</h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="text-center">
          <span class="loading loading-ring loading-lg text-blue-600"></span>
          <p class="text-gray-600 mt-4">Loading blog posts...</p>
        </div>
      </div>
      
      <!-- Blog Posts Grid -->
      <div v-else-if="posts?.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          <div class="aspect-[16/10] overflow-hidden">
            <img
              :src="post.og_image || post.image || '/placeholder.jpg'"
              :alt="post.alt || post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{{ post.title }}</h2>
            <p class="text-gray-600 mt-3 line-clamp-3">{{ post.description }}</p>
            <span class="text-gray-500 text-sm mt-4 block">{{ post.date }}</span>
          </div>
        </NuxtLink>
      </div>
    
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-gray-400 text-2xl">article</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
        <p class="text-gray-600">Check back soon for new content!</p>
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

useHead({
  title: 'Blog - Linkvoices',
  meta: [
    {
      name: 'description',
      content: 'Information about the new decentralized world and cryptocurrency payments.',
    },
  ],
})
</script>

<style lang="scss" scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>