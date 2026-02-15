<template>
  <header class=" border-b border-b-spring-wood-700 ">
    <div class="md:container md:mx-auto py-4 ">
      <div class="flex flex-wrap items-center">
        <div class=" basis-1/2 md:basis-1/4">
          <nuxt-link to="/">
            <img class=" max-w-full w-60" src="@/assets/images/mainlogo.svg" alt="linkvoices - crypto invoices">
          </nuxt-link>
        </div>
        <div class=" basis-1/2 md:basis-3/4 text-right text-blue-800">
          
  
          
          <ul class="hidden md:inline-block md:flex-row md:items-center">

            <li class="md:mx-2 inline-block">
              <nuxt-link to="/blog" class="py-2 px-2 rounded-md">Blog</nuxt-link>
            </li>
            <li class="md:mx-2  inline-block">
              <nuxt-link to="/help">How to?</nuxt-link>
            </li>
            <li class="md:mx-2  inline-block">
              <nuxt-link to="/contact">Contact</nuxt-link>
            </li>

          </ul>
          <ul class="inline-block">
            <li v-if="user" class="md:mx-4  inline-block">
              <nuxt-link to="/dashboard" class="py-2 px-2 bg-spring-wood-200 rounded-md">Dashboard</nuxt-link>
            </li>
            <li v-else class=" inline-block md:ml-4">
              <nuxt-link class="btn btn-primary font-semibold" to="/login">Login / Register</nuxt-link>
            </li>
          </ul>

          <div class=" md:hidden inline-block text-right">
            <button @click="isMenuOpen = !isMenuOpen" class="inline-block items-center text-xl p-4 ml-2">
              <span class="material-icons">menu</span>
            </button>
            <ul v-show="isMenuOpen" class="absolute bg-cerulean-blue-700 text-lg text-cerulean-blue-50 pr-10 py-10 top-24 z-10 left-0 right-0 shadow-md">
              <li class="block my-4">
                <nuxt-link to="/blog" class="py-2 px-2 rounded-md">Blog</nuxt-link>
              </li>
              <li class="block my-4">
                <nuxt-link to="/help">How to?</nuxt-link>
              </li>
              <li class="block my-4">
                <nuxt-link to="/contact">Contact</nuxt-link>
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