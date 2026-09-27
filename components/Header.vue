<template>
  <header class="border-b border-black bg-white">
    <div class="md:container md:mx-auto px-4 py-4 md:px-6">
      <div class="flex flex-wrap items-center">
        <div class="basis-1/2 md:basis-1/4">
          <nuxt-link to="/">
            <img class="w-48 max-w-full md:w-52" src="@/assets/images/mainlogo.svg" alt="linkvoices - crypto invoices">
          </nuxt-link>
        </div>
        <div class="basis-1/2 text-right text-ink md:basis-3/4">
          
  
          
          <ul class="hidden md:inline-block md:flex-row md:items-center">

            <li class="inline-block md:mx-2">
              <nuxt-link to="/blog" class="rounded-ui px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.06em] transition-colors hover:bg-spring-wood-100">Blog</nuxt-link>
            </li>

          </ul>
          <ul class="inline-block">
            <li v-if="user" class="inline-block md:mx-4">
              <nuxt-link to="/dashboard" class="rounded-ui border border-black bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-spring-wood-100">Dashboard</nuxt-link>
            </li>
            <li v-else class="inline-block md:ml-4">
              <nuxt-link class="inline-flex h-9 items-center justify-center rounded-ui border border-ink bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800" to="/login">Login / Register</nuxt-link>
            </li>
          </ul>

          <div class="inline-block text-right md:hidden">
            <button @click="isMenuOpen = !isMenuOpen" class="ml-2 inline-block items-center rounded-ui border border-black p-2 text-xl">
              <span class="material-icons">menu</span>
            </button>
            <ul v-show="isMenuOpen" class="absolute left-0 right-0 top-20 z-10 border-y border-black bg-brand-blue py-8 pr-10 text-lg text-white">
              <li class="block my-4">
                <nuxt-link to="/blog" class="py-2 px-2 rounded-md">Blog</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const isMenuOpen =  ref(false)
onMounted(() => {
  console.log(user);
})
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
  }
}

</script>

<style scoped></style>