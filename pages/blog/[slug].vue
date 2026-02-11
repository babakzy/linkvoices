<template>
  <main>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <span class="loading loading-ring loading-lg text-blue-600"></span>
        <p class="text-gray-600 mt-4">Loading article...</p>
      </div>
    </div>
    
    <!-- 404 State -->
    <div v-else-if="!post" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <span class="material-symbols-outlined text-red-600 text-3xl">error</span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3">Article Not Found</h1>
      <p class="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/blog" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Back to Blog
      </NuxtLink>
    </div>
    
    <!-- Article Content -->
    <div v-else class="px-6 bg-white pb-10 md:px-10 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
      <div class="col-span-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mt-10 mb-6">{{ post.title }}</h1>
        
        <div class="flex items-center text-gray-600 mb-6 space-x-4">
          <span class="flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">calendar_today</span>
            {{ post.date }}
          </span>
          <span v-if="post.author_name" class="flex items-center">
            <span class="material-symbols-outlined text-sm mr-1">person</span>
            {{ post.author_name }}
          </span>
        </div>
        
        <img 
          v-if="post.image" 
          :src="post.image" 
          :alt="post.alt || post.title" 
          class="w-full rounded-lg shadow-sm mb-6" 
        />
        
        <p v-if="post.description" class="text-xl text-gray-700 mb-6 leading-relaxed">
          {{ post.description }}
        </p>
        
        <div class="tags mb-8">
          <span v-for="tag in post.tags" :key="tag" class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {{ tag }}
          </span>
        </div>
        
        <!-- Markdown Content -->
        <div
          v-html="renderedContent"
          class="prose prose-lg prose-pre:max-w-xs sm:prose-pre:max-w-full prose-h1:no-underline max-w-5xl mx-auto prose-zinc prose-img:rounded-lg prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700"
        ></div>
        
        <!-- Share Section -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div class="flex space-x-3">
            <a 
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Twitter
            </a>
            <a 
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
            >
              LinkedIn
            </a>
            <button 
              @click="copyToClipboard"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>
        
        <!-- Back to Blog -->
        <div class="mt-8">
          <NuxtLink to="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <span class="material-symbols-outlined mr-2">arrow_back</span>
            Back to Blog
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { marked } from 'marked'

const route = useRoute()
const { getPostBySlug } = useBlog()

const loading = ref(true)
const post = ref(null)
const currentUrl = ref('')

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true
})

// Compute rendered markdown content
const renderedContent = computed(() => {
  if (!post.value || !post.value.content) return ''
  return marked(post.value.content)
})

// Set up meta tags
useHead(() => {
  if (!post.value) {
    return {
      title: 'Article Not Found - Linkvoices'
    }
  }
  
  return {
    title: post.value.meta_title || post.value.title || 'Blog - Linkvoices',
    meta: [
      { name: 'description', content: post.value.meta_description || post.value.description || 'Read our latest blog post' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.description },
      { property: 'og:image', content: post.value.og_image || post.value.image || '/placeholder.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.value.title },
      { name: 'twitter:description', content: post.value.description },
      { name: 'twitter:image', content: post.value.og_image || post.value.image || '/placeholder.jpg' },
    ]
  }
})

const copyToClipboard = () => {
  if (process.client) {
    navigator.clipboard.writeText(currentUrl.value)
    alert('Link copied to clipboard!')
  }
}

onMounted(async () => {
  try {
    // Set current URL
    if (process.client) {
      currentUrl.value = window.location.href
    }
    
    // Fetch blog post from database
    const slug = route.params.slug
    post.value = await getPostBySlug(slug)
    
    // If post not found, redirect to 404 after a short delay
    if (!post.value) {
      setTimeout(() => {
        navigateTo('/404')
      }, 2000)
    }
  } catch (error) {
    console.error('Failed to load blog post:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Additional prose styling if needed */
</style>