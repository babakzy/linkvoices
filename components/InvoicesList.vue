<template>
    <div>
        <div v-if="currentUserInvoices.length" class="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-for="(invoiceItem, index) in currentUserInvoices" :key="index" class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ index + 1 }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {{ convertToSimpleDate(invoiceItem.created_at) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ invoiceItem.from }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ invoiceItem.to }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div class="flex items-center">
                                    <span class="font-medium">{{ invoiceItem.total || '0' }}</span>
                                    <span class="ml-1 text-xs text-gray-500 uppercase">{{ invoiceItem.currency }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span 
                                    :class="{
                                        'bg-green-100 text-green-800': invoiceItem.status === 'paid',
                                        'bg-yellow-100 text-yellow-800': invoiceItem.status === 'pending',
                                        'bg-red-100 text-red-800': invoiceItem.status === 'not_paid',
                                        'bg-gray-100 text-gray-800': invoiceItem.status === 'draft'
                                    }"
                                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                                    {{ getStatusLabel(invoiceItem.status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center space-x-2">
                                    <button 
                                        @click="viewInvoice(invoiceItem.invoice_uuid)"
                                        class="text-blue-600 hover:text-blue-800 font-medium">
                                        View
                                    </button>
                                    <button 
                                        @click="editInvoice(invoiceItem.invoice_uuid)"
                                        class="text-gray-600 hover:text-gray-800 font-medium">
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-gray-400 text-2xl">receipt_long</span>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                <p class="text-gray-600 mb-6">Get started by creating your first crypto invoice</p>
                <NuxtLink 
                    to="/dashboard/createInvoice" 
                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                    <span class="material-symbols-outlined mr-2 text-sm">add</span>
                    Create Invoice
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import convertToSimpleDate from '~/utils';
const supabase = useSupabaseClient()
const currentUserInvoices = ref([])
const user = useSupabaseUser()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

onMounted(() => {
    readInvoices();
})

async function readInvoices() {
    let { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user.value.id)
    currentUserInvoices.value = invoices || [];
}

function getStatusLabel(status) {
    const statusLabels = {
        'paid': 'Paid',
        'pending': 'Pending',
        'not_paid': 'Unpaid',
        'draft': 'Draft'
    }
    return statusLabels[status] || status
}

function viewInvoice(invoiceUuid) {
    window.open(`${runtimeConfig.public.baseURL}invoice/${invoiceUuid}`, '_blank')
}

function editInvoice(invoiceUuid) {
    router.push(`/dashboard/createInvoice?edit=${invoiceUuid}`)
}

</script>

<style scoped></style>