<template>
    <NuxtLayout>
    <NuxtLoadingIndicator :height="6" color="#4F46E5" />
    <NuxtPage />
    <!-- <div class="container" style="padding: 50px 0 100px 0">
     <Account v-if="user" />
    <Auth v-else />
  </div> -->
  </NuxtLayout>
</template>

<script setup>
//const route = useRoute()
//const user = useSupabaseUser()
const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();
</script>