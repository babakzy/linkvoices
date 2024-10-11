<template>
    <div class=" mx-auto text-center card w-96 bg-white py-6 md:px-4 px-3 rounded-lg bordered border-slate-400 ">
        <h1 class="text-3xl mb-4">Login / Register</h1>
        <form class="max-w-xs mx-auto">
            <submit  @click="handleLogin" class="btn btn-outline hover:bg-gray-200 hover:text-slate-700 w-full mt-4"> <img class=" w-7" src="@/assets/images/github-mark.png" alt="Github Logo"> Continue with GitHub</submit>
        </form>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()
const loading = ref(false)
const email = ref('')
const password = ref('')
const router = useRouter()
const handleLogin = async () => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${runtimeConfig.public.baseURL}/dashboard`,
            },
        })
        if (error) console.log(error)
        if (error) throw error
       // router.replace('/dashboard')
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