<template>
  <div class=" border-b ">
    <div class="md:container md:mx-auto py-4 ">
      <div class="flex flex-wrap items-center mx-4">
        <div class=" basis-1/2 md:basis-1/4">
          <nuxt-link to="/">
            <img class=" max-w-full w-60" src="@/assets/images/linkvoices logo.svg" alt="linkvoices - crypto invoices">
          </nuxt-link>
        </div>
        <div class=" basis-1/2 md:basis-3/4 text-right text-blue-800">
          <ul>
            <li v-if="user" class="md:mx-4  block md:inline-block">
              <nuxt-link class="px-2 py-2 rounded-md bg-blue-50 hover:bg-blue-200 " to="/dashboard/createInvoice">
                New Invoice
              </nuxt-link>
            </li>
            <li v-if="user" class="md:mx-4 block md:inline-block">
              <nuxt-link to="/dashboard" class=" py-2 px-2 rounded-md ">Dashboard</nuxt-link>
            </li>
            <li class="mx-4 inline-block">
              <nuxt-link to="/help">How to?</nuxt-link>
            </li>
            <li v-if="user" class="mx-1 md:mx-4 inline-block">
              <button class=" cursor-pointer" @click="signOut()">Sign Out</button>
            </li>
            <li v-else class="mx-1  md:mx-4 inline-block">
              <nuxt-link class="btn btn-primary" to="/login">Login </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
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