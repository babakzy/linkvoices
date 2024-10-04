<template>
    <div class=" mx-auto text-center card w-96 bg-white py-6 md:px-4 px-3 rounded-lg bordered border-slate-400 ">
        <h1 class="text-3xl mb-4">Login</h1>
        <form class="max-w-xs mx-auto">
            <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full " />
            <input v-model="password" type="password" placeholder="Password" class="input mt-2 input-bordered w-full" />
            <submit v-if="!itsLoginForm" @click="handleRegister" class="btn btn-primary w-full mt-4">Register</submit>
            <submit v-if="itsLoginForm" @click="handleLogin" class="btn btn-primary w-full mt-4">Login</submit>
            <p v-if="itsLoginForm" class="text-base-400 font-light mt-4 mx-1 text-left text-sm">Don't have account yet,
                you can <a class=" cursor-pointer text-blue-600" @click="itsLoginForm = false">Register Here</a></p>
            <p v-if="!itsLoginForm" class="text-base-400 font-light mt-4 mx-1 text-left text-sm">You already have an
                account <a class="cursor-pointer text-blue-600" @click="itsLoginForm = true">Login Here</a></p>
        </form>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const itsLoginForm = ref(true)
const loading = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
    try {
        loading.value = true
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        if (error) throw error
        router.replace('/dashboard')
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}

const handleRegister = async () => {
    try {
        loading.value = true
        let { data, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value
        })
        console.log(data);
        if (error) throw error
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped></style>