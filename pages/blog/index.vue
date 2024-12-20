<template>
  <div class="mt-16 container">
    <h1 class=" text-spring-wood-950 md:text-4xl text-3xl my-10">Blog</h1>
    <div v-if="formattedData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="post in formattedData" :key="post.title">
        <NuxtLink :to="'/blog'+post.path" class="bg-white  p-4 mb-4">
          <img :src="`/blog/${post.image}`" :alt="post.alt" class="w-full object-cover" />
          <h2 class="text-xl font-bold mt-2">{{ post.title }}</h2>
          <p class="text-black-700 mt-1">{{ post.description }}</p>
          <span class="text-black-500 text-sm">{{ post.date }}</span>
          <div class="tags mt-2">
            <span v-for="tag in post.tags" :key="tag" class="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{{ tag }}</span>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const contents = await queryContent().find()
const formattedData = computed(() => {
  return (
    contents.map((articles) => {
      return {
        path: articles._path,
        title: articles.title || 'no-title available',
        description: articles.description || 'no-description available',
        image: articles.image || '/placeholder.jpg',
        alt: articles.alt || 'no alter data available',
        ogImage: articles.ogImage || '/placeholder.jpg',
        date: articles.date || 'not-date-available',
        tags: articles.tags || [],
        published: articles.published || false,
      }
    }) || []
  )
})
console.log(formattedData);
useHead({
  title: 'Blog',
  meta: [
    {
      name: 'description',
      content: 'information about new decentralized world and ctyptocurrency payments.',
    },
  ],
})

onMounted(() => {
  console.log(contents);
  console.log(formattedData.value);
})
</script>

<style lang="scss" scoped></style>