<template>
    <aside class="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col min-h-screen">
        <!-- Logo/Brand Section -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900">Dashboard</h2>
        </div>

        <!-- Navigation -->
        <nav class="flex-1">
            <ul class="space-y-2">
                <li>
                    <nuxt-link 
                        to="/dashboard" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        active-class="bg-gray-100 text-gray-900"
                        exact>
                        <span class="material-symbols-outlined mr-3 text-lg">dashboard</span>
                        Overview
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/wallets" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        active-class="bg-gray-100 text-gray-900">
                        <span class="material-symbols-outlined mr-3 text-lg">wallet</span>
                        Wallets
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/invoices" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        active-class="bg-gray-100 text-gray-900">
                        <span class="material-symbols-outlined mr-3 text-lg">receipt_long</span>
                        Invoices
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/createInvoice" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-blue-50 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300">
                        <span class="material-symbols-outlined mr-3 text-lg">add_circle</span>
                        Create Invoice
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/dashboard/help" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        active-class="bg-gray-100 text-gray-900">
                        <span class="material-symbols-outlined mr-3 text-lg">help</span>
                        Help
                    </nuxt-link>
                </li>
            </ul>
        </nav>

        <!-- Sign Out Section -->
        <div class="pt-4 border-t border-gray-200">
            <button 
                @click="signOut" 
                class="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-red-50 text-gray-700 hover:text-red-700">
                <span class="material-symbols-outlined mr-3 text-lg">logout</span>
                Sign Out
            </button>
        </div>
    </aside>
</template>

<script setup>

// Function to handle sign out
const supabase = useSupabaseClient();

const signOut = async () => {
    try {
        await supabase.auth.signOut();
        // Optionally, redirect to login or another page after sign out
        window.location.href = '/login';
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

</script>

<style lang="scss" scoped></style>