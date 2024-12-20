<template>
  <main>
    <div class="px-6 bg-white pb-10 md:px-10 container max-w-5xl mx-auto sm:grid grid-cols-12 gap-x-12">
    <div class="col-span-12">
      <h1 class="text-3xl font-bold text-black-900 mt-10 mb-4">{{ data.title }}</h1>
      <img :src="data.image" :alt="data.alt" class="w-full " />
      <p class="text-gray-600">{{ data.date }}</p>
      <p class="text-lg">{{ data.description }}</p>
      <div class="tags mt-2">
        <span v-for="tag in data.tags" :key="tag" class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{{ tag }}</span>
      </div>
      <div
        class="prose prose-pre:max-w-xs sm:prose-pre:max-w-full prose-sm sm:prose-base md:prose-lg prose-h1:no-underline max-w-5xl mx-auto prose-zinc dark:prose-invert prose-img:rounded-lg"
      >
      <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
  </main>
</template>

<script lang="js" setup>
const  route  = useRoute()
console.log(route)
const { data: articles, error } = await useAsyncData(() =>
  queryContent(route.params.slug).findOne(),
)

//if (error.value) navigateTo('/404')

const data = computed(() => {
  return {
    title: articles.value.title || 'no-title available',
    description: articles.value.description || 'no-description available',
    image: articles.value.image || '/not-found.jpg',
    alt: articles.value.alt || 'no alter data available',
    ogImage: articles.value.ogImage || '/not-found.jpg',
    date: articles.value.date || 'not-date-available',
    tags: articles.value.tags || [],
    published: articles.value.published || false,
  }
})

useHead({
  title: data.value.title || 'Default Title',
  meta: [
    { name: 'description', content: data.value.description || 'Default description' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: data.value.title || 'Default Title' },
    { property: 'og:description', content: data.value.description || 'Default description' },
    { property: 'og:image', content: data.value.ogImage || data.value.image || '/default-image.jpg' },
    { name: 'twitter:site', content: '@babakzy' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: window.location.href },
    { name: 'twitter:title', content: data.value.title || 'Default Title' },
    { name: 'twitter:description', content: data.value.description || 'Default description' },
    { name: 'twitter:image', content: data.value.ogImage || data.value.image || '/default-image.jpg' },
  ],
  link: [
    {
      rel: 'canonical',
      href: window.location.href,
    },
  ],
})

// // Generate OG Image
// defineOgImageComponent('Test', {
//   headline: 'Greetings 👋',
//   title: data.value.title || '',
//   description: data.value.description || '',
//   link: data.value.ogImage,
// })
onMounted(() => {
  console.log(articles);
})
</script>

<style>

</style>