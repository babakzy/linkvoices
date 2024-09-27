<template>
    <div class="max-w-[1200px] mx-auto">
<FirstPage/>
    </div>
</template>

<script setup lang="js">
import FirstPage from '~/components/FirstPage.vue';

definePageMeta({
  layout: 'default-page'
})
useHead({
  title: 'Octavoice - Login'
})
</script>

<style scoped>

</style>