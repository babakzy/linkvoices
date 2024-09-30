<template>
    <div class=" border-b " >
<div class="md:container md:mx-auto py-4">
    <div class="flex items-center">
        <div class="basis-1/4"> <nuxt-link  to="/"><img src="@/assets/images/linkvoices logo.svg" alt=""></nuxt-link> </div>
        <div class="basis-3/4 text-right text-blue-800 "> <ul>
          <li v-if="user" class="mx-4 inline-block">
                <nuxt-link to="/dashboard" class="py-2 px-2 bg-blue-100 hover:bg-blue-200 rounded-md">Dashboard</nuxt-link>
            </li>
            <li class="mx-4 inline-block">
              <nuxt-link to="/help">How to?</nuxt-link>  
            </li>
            <li  v-if="user" class="mx-4 inline-block">
      
              <button class=" cursor-pointer" @click="signOut()" >Sign Out</button>
            
            </li>
            <li v-else class="mx-4 inline-block">
              <nuxt-link class="btn btn-primary" to="/login">Login </nuxt-link>         
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

async function signOut() {
  console.log("signOut");
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

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