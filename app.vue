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

<style lang="scss">
@use "~/assets/scss/main.scss";
h2{
  font-family: "Play", sans-serif;
}
</style>