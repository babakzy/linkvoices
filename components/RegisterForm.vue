<template>
    <div class=" mx-auto text-center card w-96 bg-white py-6 md:px-4 px-3 rounded-lg bordered border-slate-400 ">
        <h1 class="text-3xl mb-4">Register</h1>
        <form class="max-w-xs mx-auto">
            <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full " />
            <input v-model="password" type="password" placeholder="Password" class="input mt-2 input-bordered w-full" />
            <submit @click="handleLogin" class="btn btn-primary w-full mt-4">Login</submit>
            <p class="text-base-400 font-light mt-4 mx-1 text-left text-sm">Don't have account yet, you can <a
                    class=" text-blue-600" href="">Register Here</a></p>
        </form>

    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        alert('Check your email for the login link!')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
    }

}
</script>

<style scoped></style>