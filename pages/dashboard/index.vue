<template>
    <div class="min-h-screen bg-gray-50">
        <div class="flex">
            <DashboardSideBar />
            <main class="flex-1 p-6 md:p-8">
                <div class="max-w-7xl mx-auto">
                    <!-- Header -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                                <p class="text-gray-600">Overview of your crypto invoices</p>
                            </div>
                            <NuxtLink 
                                to="/dashboard/createInvoice"
                                class="hidden md:inline-flex items-center px-4 py-2 bg-cerulean-blue-600 text-white font-medium rounded-lg hover:bg-cerulean-blue-700 transition-colors duration-200">
                                <span class="material-symbols-outlined mr-2 text-lg">add</span>
                                New Invoice
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <!-- Total Invoices -->
                        <div class="group bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-cerulean-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-cerulean-blue-600 text-xl">receipt_long</span>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-600 mb-0.5">Total Invoices</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ totalInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Paid Invoices -->
                        <div class="group bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-600 mb-0.5">Paid</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ paidInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Pending -->
                        <div class="group bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-amber-600 text-xl">schedule</span>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-600 mb-0.5">Pending</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ pendingInvoices }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Active Wallets -->
                        <div class="group bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-purple-600 text-xl">account_balance_wallet</span>
                                </div>
                                <div>
                                    <p class="text-xs font-medium text-gray-600 mb-0.5">Wallets</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ activeWallets }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <NuxtLink 
                                to="/dashboard/createInvoice"
                                class="group flex items-center gap-4 bg-cerulean-blue-600 text-white rounded-lg p-4 hover:bg-cerulean-blue-700 transition-colors duration-200">
                                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined">add_circle</span>
                                </div>
                                <div>
                                    <p class="font-semibold">Create Invoice</p>
                                    <p class="text-sm text-cerulean-blue-100">New crypto invoice</p>
                                </div>
                            </NuxtLink>

                            <NuxtLink 
                                to="/dashboard/wallets"
                                class="group flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:border-cerulean-blue-300 hover:bg-gray-50 transition-all duration-200">
                                <div class="w-10 h-10 bg-cerulean-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-cerulean-blue-600">account_balance_wallet</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900">Manage Wallets</p>
                                    <p class="text-sm text-gray-600">Update addresses</p>
                                </div>
                            </NuxtLink>

                            <NuxtLink 
                                to="/dashboard/invoices"
                                class="group flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:border-cerulean-blue-300 hover:bg-gray-50 transition-all duration-200">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span class="material-symbols-outlined text-purple-600">receipt_long</span>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900">View Invoices</p>
                                    <p class="text-sm text-gray-600">Track status</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                            <NuxtLink 
                                to="/dashboard/invoices" 
                                class="text-sm font-medium text-cerulean-blue-600 hover:text-cerulean-blue-700">
                                View All →
                            </NuxtLink>
                        </div>
                        <InvoicesList />
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