<template>
    <div class="mx-auto text-center card w-96 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h1 v-if="itsLoginForm" class="text-2xl font-bold text-gray-900 mb-6">Login</h1>
        <h1 v-else class="text-2xl font-bold text-gray-900 mb-6">Register</h1>
        <form class="space-y-4">
            <div class="space-y-4">
                <input 
                    v-model="email" 
                    type="email" 
                    placeholder="Email address" 
                    class="input input-bordered w-full"
                    required
                />
                <input 
                    v-model="password" 
                    type="password" 
                    placeholder="Password" 
                    class="input input-bordered w-full"
                    required
                />
                <button 
                    v-if="!itsLoginForm" 
                    type="button"
                    @click.prevent="handleRegister" 
                    class="btn btn-primary w-full"
                    :disabled="loading"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    <span v-if="loading">Loading...</span>
                    <span v-else>Create Account</span>
                </button>
                <button 
                    v-if="itsLoginForm" 
                    type="button"
                    @click.prevent="handleLogin" 
                    class="btn btn-primary w-full"
                    :disabled="loading"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    <span v-if="loading">Loading...</span>
                    <span v-else>Sign In</span>
                </button>
            </div>
            
            <div class="text-center">
                <p v-if="itsLoginForm" class="text-sm text-gray-600">
                    Don't have an account?
                    <button type="button" class="text-blue-600 hover:text-blue-700 font-medium ml-1 focus:outline-none focus:underline" @click="itsLoginForm = false">
                        Create one
                    </button>
                </p>
                <p v-if="!itsLoginForm" class="text-sm text-gray-600">
                    Already have an account?
                    <button type="button" class="text-blue-600 hover:text-blue-700 font-medium ml-1 focus:outline-none focus:underline" @click="itsLoginForm = true">
                        Sign in
                    </button>
                </p>
            </div>
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
        router.replace('/dashboard/wallets')
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
        if (error) throw error
        if (data?.user) {
            alert('Registration successful! Please check your email for verification link.')
        }
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped></style>