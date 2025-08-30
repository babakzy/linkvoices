<template>
    <div class="mx-auto text-center card w-96 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 v-if="isLogin" class="text-2xl font-bold text-gray-900 mb-6">Login</h1>
        <h1 v-else class="text-2xl font-bold text-gray-900 mb-6">Register</h1>
        <form class="space-y-4">
            <div class="space-y-4">
                <input 
                    type="email" 
                    v-model="email"
                    placeholder="Email address" 
                    class="input input-bordered w-full"
                    required
                />
                <input 
                    type="password" 
                    v-model="password"
                    placeholder="Password" 
                    class="input input-bordered w-full"
                    required
                />
                <button 
                    type="button"
                    @click.prevent="handleEmailAuth" 
                    class="btn btn-primary w-full"
                    :disabled="loading"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    <span v-if="loading">Loading...</span>
                    <span v-else>{{ isLogin ? 'Sign In' : 'Create Account' }}</span>
                </button>
            </div>
            
            <div class="text-center">
                <p class="text-sm text-gray-600">
                    {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
                    <button 
                        type="button"
                        @click.prevent="isLogin = !isLogin" 
                        class="text-blue-600 hover:text-blue-700 font-medium ml-1 focus:outline-none focus:underline"
                    >
                        {{ isLogin ? 'Create one' : 'Sign in' }}
                    </button>
                </p>
            </div>
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
                alert('Registration successful! Please check your email for verification link.')
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