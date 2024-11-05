<template>
    <div class="mx-auto text-center card w-96 bg-white py-6 md:px-4 px-3 rounded-lg bordered border-slate-400">
        <h1 v-if="isLogin" class="text-3xl mb-4">Login</h1>
        <h1 v-else class="text-3xl mb-4">Register</h1>
        <form class="max-w-xs mx-auto">
            <!-- Email/Password Fields -->
            <div class="form-control">
                <input 
                    type="email" 
                    v-model="email"
                    placeholder="Email" 
                    class="input input-bordered w-full mb-3"
                />
                <input 
                    type="password" 
                    v-model="password"
                    placeholder="Password" 
                    class="input input-bordered w-full mb-3"
                />
                <button 
                    @click.prevent="handleEmailAuth" 
                    class="btn btn-primary w-full mb-3"
                    :disabled="loading"
                >
                    {{ isLogin ? 'Login' : 'Register' }} with Email
                </button>
                <p class="text-sm mb-3">
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                    <a href="#" @click.prevent="isLogin = !isLogin" class="text-blue-600">
                        {{ isLogin ? 'Register' : 'Login' }}
                    </a>
                </p>
            </div>

            <!-- GitHub Login -->
            <div class="divider">OR</div>
            <submit @click="handleLogin" class="btn btn-outline hover:bg-gray-200 hover:text-slate-700 w-full">
                <img class="w-7" src="@/assets/images/github-mark.png" alt="Github Logo"> 
                Continue with GitHub
            </submit>
        </form>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()
const loading = ref(false)
const email = ref('')
const password = ref('')
const isLogin = ref(true) // New ref to toggle between login/register
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

const handleEmailAuth = async () => {
    try {
        loading.value = true
        let { data, error } = {} // Initialize with empty object

        if (isLogin.value) {
            // Login with email
            ({ data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            }))
        } else {
            // Register with email
            ({ data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    emailRedirectTo: `${runtimeConfig.public.baseURL}/dashboard`
                }
            }))
        }

        if (error) throw error

        if (data?.user) {
            if (isLogin.value) {
                router.push('/dashboard')
            } else {
                alert('Please check your email for verification link')
            }
        }
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped></style>