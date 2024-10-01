<template>
  <div
    class=" bg-gradient-to-b from-slate-200 to-slate-50 pt-[calc(50vh-300px)] md:pt-[calc(50vh-200px)] min-h-[90vh] ">
    <LoginForm/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default-page'
})
useHead({
  title: 'Linkvoices - Login'
})
</script>

<style scoped></style>