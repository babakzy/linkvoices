<template>
    <div class="min-h-screen bg-gray-50">
        <div class="flex">
            <DashboardSideBar />
            <main class="flex-1 p-8">
                <div class="max-w-7xl">
                    <!-- Header -->
                    <div class="mb-8">
                        <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p class="text-gray-600 mt-1">Welcome back! Here's what's happening with your crypto invoices.</p>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <span class="material-symbols-outlined text-blue-600">receipt_long</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Total Invoices</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ totalInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                    <span class="material-symbols-outlined text-green-600">paid</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Paid Invoices</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ paidInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                    <span class="material-symbols-outlined text-yellow-600">pending</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Pending</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ pendingInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                    <span class="material-symbols-outlined text-purple-600">wallet</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-600">Active Wallets</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ activeWallets }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="mb-8">
                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <NuxtLink 
                                    to="/dashboard/createInvoice"
                                    class="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 group">
                                    <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-opacity-30 transition-all duration-200">
                                        <span class="material-symbols-outlined">add_circle</span>
                                    </div>
                                    <div>
                                        <p class="font-medium">Create New Invoice</p>
                                        <p class="text-sm text-blue-100">Generate a crypto invoice</p>
                                    </div>
                                </NuxtLink>

                                <NuxtLink 
                                    to="/dashboard/wallets"
                                    class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-all duration-200">
                                        <span class="material-symbols-outlined text-gray-600">wallet</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">Manage Wallets</p>
                                        <p class="text-sm text-gray-600">Update wallet addresses</p>
                                    </div>
                                </NuxtLink>

                                <NuxtLink 
                                    to="/dashboard/invoices"
                                    class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-all duration-200">
                                        <span class="material-symbols-outlined text-gray-600">receipt_long</span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">View All Invoices</p>
                                        <p class="text-sm text-gray-600">Track invoice status</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div>
                        <div class="bg-white border border-gray-200 rounded-xl p-6">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                                <NuxtLink 
                                    to="/dashboard/invoices" 
                                    class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    View All
                                </NuxtLink>
                            </div>
                            <InvoicesList />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="js">
useHead({
    title: 'Dashboard - Overview'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Reactive stats
const totalInvoices = ref(0)
const paidInvoices = ref(0)
const pendingInvoices = ref(0)
const activeWallets = ref(0)

onMounted(async () => {
    await loadDashboardStats()
})

async function loadDashboardStats() {
    try {
        // Get invoice stats
        const { data: invoices, error: invoicesError } = await supabase
            .from('invoices')
            .select('status')
            .eq('user_id', user.value.id)

        if (!invoicesError && invoices) {
            totalInvoices.value = invoices.length
            paidInvoices.value = invoices.filter(inv => inv.status === 'paid').length
            pendingInvoices.value = invoices.filter(inv => inv.status === 'pending' || inv.status === 'not_paid').length
        }

        // Get wallet stats
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('btc_wallet, eth_wallet, dai_wallet, usdt_trc20_wallet')
            .eq('id', user.value.id)
            .single()

        if (!profileError && profile) {
            let walletCount = 0
            if (profile.btc_wallet) walletCount++
            if (profile.eth_wallet) walletCount++
            if (profile.dai_wallet) walletCount++
            if (profile.usdt_trc20_wallet) walletCount++
            activeWallets.value = walletCount
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error)
    }
}

</script>

<style scoped>
</style>