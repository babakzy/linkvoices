<template>
  <div class="mt-16 container">
    <h1 class=" text-spring-wood-950 md:text-4xl text-3xl my-10">Blog</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="text-center">
        <span class="loading loading-ring loading-lg text-blue-600"></span>
        <p class="text-gray-600 mt-4">Loading blog posts...</p>
      </div>
    </div>
    
    <!-- Blog Posts Grid -->
    <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/blog/${post.slug}`" class="bg-white p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <img :src="post.image || '/placeholder.jpg'" :alt="post.alt || post.title" class="w-full object-cover rounded-lg h-48" />
          <h2 class="text-xl font-bold mt-4">{{ post.title }}</h2>
          <p class="text-gray-700 mt-2 line-clamp-3">{{ post.description }}</p>
          <span class="text-gray-500 text-sm mt-2 block">{{ post.date }}</span>
          <div class="tags mt-3">
            <span v-for="tag in post.tags" :key="tag" class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{{ tag }}</span>
          </div>
        </NuxtLink>
      </template>
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
</template>

<script setup>
const { getPublishedPosts } = useBlog()

const loading = ref(true)
const posts = ref([])

useHead({
  title: 'Blog - Linkvoices',
  meta: [
    {
      name: 'description',
      content: 'Information about the new decentralized world and cryptocurrency payments.',
    },
  ],
})

onMounted(async () => {
  try {
    // Fetch blog posts from database
    posts.value = await getPublishedPosts()
  } catch (error) {
    console.error('Failed to load blog posts:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>