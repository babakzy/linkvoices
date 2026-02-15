<template>
    <aside class="w-full md:w-64 bg-gradient-to-b from-cerulean-blue-900 via-cerulean-blue-800 to-cerulean-blue-900 text-white flex flex-col min-h-screen shadow-lg">
        <!-- Logo/Brand Section -->
        <div class="p-6 pb-4">
            <NuxtLink to="/" class="block">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <span class="material-symbols-outlined text-xl">account_balance_wallet</span>
                    </div>
                    <div>
                        <h2 class="text-lg font-bold">LinkVoices</h2>
                        <p class="text-xs text-cerulean-blue-200">Crypto Invoices</p>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 pb-4">
            <ul class="space-y-1">
                <li>
                    <nuxt-link 
                        to="/dashboard" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-cerulean-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                        active-class="bg-white bg-opacity-20 text-white"
                        exact>
                        <span class="material-symbols-outlined mr-3 text-lg">dashboard</span>
                        Overview
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/invoices" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-cerulean-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                        active-class="bg-white bg-opacity-20 text-white">
                        <span class="material-symbols-outlined mr-3 text-lg">receipt_long</span>
                        Invoices
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/wallets" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-cerulean-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                        active-class="bg-white bg-opacity-20 text-white">
                        <span class="material-symbols-outlined mr-3 text-lg">wallet</span>
                        Wallets
                    </nuxt-link>
                </li>
                
                <!-- Create Invoice - Featured -->
                <li class="pt-2">
                    <nuxt-link 
                        to="/dashboard/createInvoice" 
                        class="flex items-center px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 bg-spring-wood-400 text-cerulean-blue-900 hover:bg-spring-wood-300">
                        <span class="material-symbols-outlined mr-3 text-lg">add_circle</span>
                        Create Invoice
                    </nuxt-link>
                </li>
                
                <li class="pt-2">
                    <nuxt-link 
                        to="/dashboard/help" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-cerulean-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                        active-class="bg-white bg-opacity-20 text-white">
                        <span class="material-symbols-outlined mr-3 text-lg">help</span>
                        Help
                    </nuxt-link>
                </li>
                
                <li class="pt-2">
                    <button 
                        @click="signOut" 
                        class="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-red-500 hover:bg-opacity-20 text-cerulean-blue-100 hover:text-white">
                        <span class="material-symbols-outlined mr-3 text-lg">logout</span>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>

// Function to handle sign out
const supabase = useSupabaseClient();

const signOut = async () => {
    try {
        await supabase.auth.signOut();
        // Redirect to login page after sign out
        window.location.href = '/login';
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

</script>

<style lang="scss" scoped></style>