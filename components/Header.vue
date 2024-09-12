<template>
    <div class=" bg-slate-200 " >
<div class="md:container md:mx-auto py-3">
    <div class="flex items-center">
        <div class="basis-1/4"> <span class="text-slate-600">Nuxt 3 Minimal Boilerplate</span> </div>
        <div class="basis-3/4 text-right text-blue-800 "> <ul>
            <li class="mx-4 inline-block">
                <a href="">Create Invoice</a>  
            </li>
            <li class="mx-4 inline-block">
                <a href="">CryptoPay Profile</a>
            </li>
            <li v-if="user" class="mx-4 inline-block">
                <a href="">Logout</a>
               {{ user.email }}
            </li>
            <li v-else class="mx-4 inline-block">
                <a href="">Login</a>           
            </li>

        </ul> </div>
    </div>
  
</div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const email = ref('')


loading.value = true
const user = useSupabaseUser()
//console.log(user.value.email);
// const { data } = await supabase
//   .from('profiles')
//   .select(`username, website, avatar_url`)
//   .eq('id', user.value.id)
//   .single()

// console.log(data);
// if (data) {
//   //email.value = data.email
// }



async function updateProfile() {
  try {
    const user = useSupabaseUser()

    const updates = {
   //   email: user.value.email,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
   // loading.value = false
  }
}

</script>

<style scoped>

</style>