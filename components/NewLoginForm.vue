<template>
    <div class="mx-auto text-center card w-96 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 v-if="isLogin" class="text-2xl font-bold text-gray-900 mb-6">Login</h1>
        <h1 v-else class="text-2xl font-bold text-gray-900 mb-6">Register</h1>
        <form class="space-y-4">
            <p
                v-if="statusMessage"
                :class="[
                    'rounded-lg px-3 py-2 text-sm text-left',
                    statusType === 'error'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-green-50 text-green-700 border border-green-200'
                ]"
            >
                {{ statusMessage }}
            </p>
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
                <input
                    v-if="!isLogin"
                    type="password"
                    v-model="repeatPassword"
                    placeholder="Repeat password"
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
                        @click.prevent="toggleAuthMode" 
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
const repeatPassword = ref('')
const statusMessage = ref('')
const statusType = ref('success')
const isLogin = ref(true)
const router = useRouter()

const clearStatus = () => {
    statusMessage.value = ''
}

const toggleAuthMode = () => {
    isLogin.value = !isLogin.value
    password.value = ''
    repeatPassword.value = ''
    clearStatus()
}

const handleEmailAuth = async () => {
    clearStatus()

    if (!isLogin.value && password.value !== repeatPassword.value) {
        statusType.value = 'error'
        statusMessage.value = 'Passwords do not match. Please re-enter them.'
        return
    }

    try {
        loading.value = true
        let { data, error } = {}

        if (isLogin.value) {
            ({ data, error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value
            }))
        } else {
            ({ data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    emailRedirectTo: `${runtimeConfig.public.url}/confirm`
                }
            }))
        }

        if (error) throw error

        if (data?.user) {
            if (isLogin.value) {
                router.push('/dashboard')
            } else {
                statusType.value = 'success'
                statusMessage.value = 'Registration successful. Check your email to confirm your account.'
                repeatPassword.value = ''
            }
        }
    } catch (error) {
        statusType.value = 'error'
        statusMessage.value = error.error_description || error.message || 'Authentication failed. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped></style>