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
  title: 'Linkvoices - Create and send cryptocurrency invoices for free'
})
</script>

<style scoped>

</style>