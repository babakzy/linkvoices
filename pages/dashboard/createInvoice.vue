<template>
    <div class="min-h-screen bg-gray-50">
        <main class="p-8">
            <div class="max-w-7xl mx-auto">
                    <!-- Header -->
                    <div class="flex items-center mb-8">
                        <NuxtLink 
                            to="/dashboard/invoices" 
                            class="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4">
                            <span class="material-symbols-outlined mr-2">arrow_back</span>
                            Back to Invoices
                        </NuxtLink>
                        <div class="border-l border-gray-300 pl-4">
                            <h1 class="text-2xl font-bold text-gray-900">Create Invoice</h1>
                            <p class="text-gray-600 mt-1">Create a new cryptocurrency invoice</p>
                        </div>
                    </div>
                    <!-- Form Container -->
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <!-- Main Form -->
                        <div class="lg:col-span-3 space-y-6">
                            
                            <!-- Invoice Details Card -->
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                                        <input 
                                            v-model="invoiceNumber" 
                                            type="text" 
                                            placeholder="00001"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                                        <VueDatePicker v-model="issueDate" :enable-time-picker="false" class="w-full" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                        <VueDatePicker v-model="dueDate" :enable-time-picker="false" class="w-full" />
                                    </div>
                                </div>
                            </div>
                            <!-- Billing Information -->
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    <!-- From Section -->
                                    <div class="space-y-3">
                                        <div class="flex items-center mb-4">
                                            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                <span class="material-symbols-outlined text-blue-600 text-sm">person</span>
                                            </div>
                                            <h4 class="text-base font-medium text-gray-900">From</h4>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                            <input 
                                                v-model="senderEmail" 
                                                type="email" 
                                                required
                                                placeholder="your@email.com"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Company/Person Name</label>
                                            <input 
                                                v-model="senderName" 
                                                type="text" 
                                                placeholder="Your Company Name"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input 
                                                v-model="senderAddress" 
                                                type="text" 
                                                placeholder="123 Main Street"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">City, State, ZIP</label>
                                            <input 
                                                v-model="senderCity" 
                                                type="text" 
                                                placeholder="New York, NY 10001"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                            <input 
                                                v-model="senderCountry" 
                                                type="text" 
                                                placeholder="United States"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                    </div>

                                    <!-- To Section -->
                                    <div class="space-y-3">
                                        <div class="flex items-center mb-4">
                                            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                <span class="material-symbols-outlined text-green-600 text-sm">business</span>
                                            </div>
                                            <h4 class="text-base font-medium text-gray-900">Bill To</h4>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input 
                                                v-model="recieverEmail" 
                                                type="email" 
                                                placeholder="client@email.com"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Company/Person Name</label>
                                            <input 
                                                v-model="recieverName" 
                                                type="text" 
                                                placeholder="Client Company Name"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input 
                                                v-model="recieverAddress" 
                                                type="text" 
                                                placeholder="456 Client Street"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">City, State, ZIP</label>
                                            <input 
                                                v-model="recieverCity" 
                                                type="text" 
                                                placeholder="Los Angeles, CA 90210"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                            <input 
                                                v-model="recieverCountry" 
                                                type="text" 
                                                placeholder="United States"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Currency Selection -->
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <div class="flex items-center mb-4">
                                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                        <span class="material-symbols-outlined text-yellow-600 text-sm">currency_bitcoin</span>
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900">Payment Currency</h3>
                                </div>
                                
                                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <div class="flex items-start">
                                        <span class="material-symbols-outlined text-blue-600 mr-2">info</span>
                                        <p class="text-sm text-blue-800">
                                            To enable a currency, you must first add the corresponding wallet address in your 
                                            <NuxtLink to="/dashboard/wallets" class="font-medium underline">Wallets settings</NuxtLink>.
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-3">Select Currency</label>
                                    <select 
                                        v-model="invoiceCurrency" 
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="" disabled>Select Base Currency</option>
                                        <option v-if="btcWallet" value="btc">₿ Bitcoin (BTC)</option>
                                        <option v-if="ethWallet" value="ethtrc20">Ξ Ethereum (ETH) - TRC20 Network</option>
                                        <option v-if="usdttrc20Wallet" value="usdt">₮ Tether (USDT)</option>
                                        <option v-if="daiWallet" value="dai">◈ Dai (DAI)</option>
                                    </select>
                                </div>
                                
                                <!-- Selected Currency Display -->
                                <div v-if="currentCurrency.symbol" class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div class="flex items-center space-x-3">
                                        <img :src="currentCurrency.icon" :alt="currentCurrency.name" class="w-6 h-6" />
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">{{ currentCurrency.name }}</div>
                                            <div class="text-xs text-gray-500">{{ currentCurrency.symbol }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Invoice Items -->
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <div class="flex items-center justify-between mb-6">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                            <span class="material-symbols-outlined text-purple-600 text-sm">receipt</span>
                                        </div>
                                        <h3 class="text-lg font-semibold text-gray-900">Invoice Items</h3>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button 
                                            @click="addField"
                                            type="button"
                                            class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                                            <span class="material-symbols-outlined mr-1 text-sm">add</span>
                                            Add Item
                                        </button>
                                        <button 
                                            @click="removeField"
                                            type="button"
                                            :disabled="formRow.length <= 1"
                                            class="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                            <span class="material-symbols-outlined mr-1 text-sm">remove</span>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                
                                <form ref="itemsForm">
                                    <div class="overflow-x-auto">
                                        <table class="w-full">
                                            <thead>
                                                <tr class="border-b border-gray-200">
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                                                    <th class="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">
                                                <tr v-for="(item, index) in formRow" :key="index" class="hover:bg-gray-50">
                                                    <td class="py-3 px-2 text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                                                    <td class="py-3 px-2">
                                                        <input 
                                                            v-model="item.name"
                                                            type="text" 
                                                            :name="'item-name' + index" 
                                                            placeholder="Web Design"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                        />
                                                    </td>
                                                    <td class="py-3 px-2">
                                                        <input 
                                                            v-model.number="item.quantity"
                                                            type="number" 
                                                            :name="'item-quantity' + index" 
                                                            placeholder="1"
                                                            min="0"
                                                            step="1"
                                                            @input="calculateItemAmount(index)"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                        />
                                                    </td>
                                                    <td class="py-3 px-2">
                                                        <input 
                                                            v-model.number="item.rate"
                                                            type="number" 
                                                            step="0.01"
                                                            :name="'item-rate' + index" 
                                                            placeholder="0.00"
                                                            min="0"
                                                            @input="calculateItemAmount(index)"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                        />
                                                    </td>
                                                    <td class="py-3 px-2">
                                                        <input 
                                                            v-model.number="item.tax"
                                                            type="number" 
                                                            :name="'item-tax' + index" 
                                                            placeholder="0 (e.g., 12 for 12%)"
                                                            min="0"
                                                            max="100"
                                                            step="0.01"
                                                            @input="calculateItemAmount(index)"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                        />
                                                    </td>
                                                    <td class="py-3 px-2">
                                                        <div class="relative">
                                                            <input 
                                                                v-model.number="item.amount"
                                                                type="number" 
                                                                step="0.01"
                                                                :name="'item-amount' + index" 
                                                                placeholder="0.00"
                                                                min="0"
                                                                @input="onAmountManualEdit(index)"
                                                                :class="[
                                                                    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                                                                    item.isAmountManual ? 'bg-yellow-50 border-yellow-300' : ''
                                                                ]" 
                                                            />
                                                            <button 
                                                                v-if="item.isAmountManual"
                                                                @click="resetItemCalculation(index)"
                                                                type="button"
                                                                class="absolute right-1 top-1 text-xs text-blue-600 hover:text-blue-800 bg-white px-1 rounded"
                                                                title="Reset to auto-calculate">
                                                                ↻
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                            <!-- Total Section -->
                            <div class="bg-white border border-gray-200 rounded-lg p-6">
                                <div class="flex justify-end">
                                    <div class="w-64">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                                        <div class="relative">
                                            <!-- Currency icon and symbol -->
                                            <div v-if="currentCurrency.symbol" class="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                                                <img :src="currentCurrency.icon" :alt="currentCurrency.name" class="w-4 h-4" />
                                                <span class="text-sm font-medium text-gray-600">{{ currentCurrency.symbol }}</span>
                                            </div>
                                            <input 
                                                v-model.number="invoiceTotal" 
                                                type="number" 
                                                step="0.01"
                                                placeholder="0.00"
                                                min="0"
                                                @input="onTotalManualEdit()"
                                                :class="[
                                                    'w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium',
                                                    currentCurrency.symbol ? 'pl-20 pr-8 py-2' : 'px-3 py-2',
                                                    isTotalManual ? 'bg-yellow-50 border-yellow-300' : ''
                                                ]" 
                                            />
                                            <button 
                                                v-if="isTotalManual"
                                                @click="resetTotalCalculation()"
                                                type="button"
                                                class="absolute right-1 top-1 text-xs text-blue-600 hover:text-blue-800 bg-white px-1 rounded"
                                                title="Reset to auto-calculate">
                                                ↻
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="lg:col-span-1">
                            <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                
                                <!-- Action Buttons -->
                                <div class="space-y-3 mb-6">
                                    <button 
                                        v-if="!invoice_uuid" 
                                        @click="createInvoice"
                                        class="w-full px-4 py-3 bg-green-600  text-green-100 text-sm font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
                                        💾 Save Invoice
                                    </button>
                                    <button 
                                        v-if="invoice_uuid" 
                                        @click="updateInvoice"
                                        class="w-full px-4 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                                        🔄 Update Invoice
                                    </button>
                                    <button 
                                        :disabled="!invoice_uuid" 
                                        @click="previewInvoice"
                                        class="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Preview
                                    </button>
                                </div>
                                
                                <!-- Info -->
                                <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                                    <div class="flex items-start">
                                        <span class="material-symbols-outlined text-gray-400 mr-2">info</span>
                                        <p class="text-sm text-gray-600">
                                            Saving won't send the invoice. You can preview and share the URL after saving.
                                        </p>
                                    </div>
                                </div>
                                
                                <!-- Invoice URL (when created) -->
                                <div v-if="invoice_uuid" class="space-y-4">
                                    <div class="border-t border-gray-200 pt-4">
                                        <h4 class="text-sm font-medium text-gray-900 mb-3">Invoice URL</h4>
                                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 break-all">
                                            <a 
                                                :href="runtimeConfig.public.baseURL + 'invoice/' + invoice_uuid" 
                                                target="_blank"
                                                class="text-sm text-blue-600 hover:text-blue-800 underline">
                                                {{ runtimeConfig.public.baseURL }}invoice/{{ invoice_uuid }}
                                            </a>
                                        </div>
                                        <button 
                                            @click="copyToClipboard(runtimeConfig.public.baseURL + 'invoice/' + invoice_uuid)"
                                            class="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
                                            Copy URL
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="js">
useHead({
    title: 'Dashboard - Create Crypto Invoice'
})
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import convertToSimpleDate from '~/utils';
const runtimeConfig = useRuntimeConfig()
const supabase = useSupabaseClient()
const invoiceNumber = ref("001")
const issueDate = ref(new Date())
const dueDate = ref(new Date())
const senderEmail = ref("")
const recieverEmail = ref("")
const senderName = ref("")
const senderAddress = ref("")
const senderCity = ref("")
const senderCountry = ref("")
const recieverName = ref("")
const recieverAddress = ref("")
const recieverCity = ref("")
const recieverCountry = ref("")
const invoiceCurrency = ref("")
let invoiceItems = []
const itemsForm = ref(null)
const formRow = ref([{ name: '', quantity: 1, rate: 0, tax: 0, amount: 0, isAmountManual: false }])
const invoiceTotal = ref(0)
const isTotalManual = ref(false)
const btcWallet = ref("")
const ethWallet = ref("")
const usdttrc20Wallet = ref("")
const daiWallet = ref("")
const invoice_uuid = ref(null)
let invoiceWalletAddress = ""

// Currency mapping with symbols and icons
const currencyData = {
    btc: { symbol: 'BTC', icon: '/images/btc-logo-blue.svg', name: 'Bitcoin' },
    ethtrc20: { symbol: 'ETH', icon: '/images/eth-logo-blue.svg', name: 'Ethereum' },
    usdt: { symbol: 'USDT', icon: '/images/tether-usdt-logo.svg', name: 'Tether' },
    dai: { symbol: 'DAI', icon: '/images/dai-logo-blue.svg', name: 'Dai' }
}

// Computed property for current currency info
const currentCurrency = computed(() => {
    return currencyData[invoiceCurrency.value] || { symbol: '', icon: '', name: '' }
})

onMounted(() => {
    readProfile();
    calculateTotal(); // Initialize total calculation
})

// Watch for changes in formRow to recalculate totals (only for non-manual fields)
watch(formRow, (newVal, oldVal) => {
    // Only recalculate if this isn't a manual edit
    calculateTotal();
}, { deep: true })

async function readProfile() {
    let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
    console.log(profile);
    console.log(error);
    btcWallet.value = profile[0].btc_wallet
    ethWallet.value = profile[0].eth_wallet
    daiWallet.value = profile[0].dai_wallet
    usdttrc20Wallet.value = profile[0].usdt_trc20_wallet
}

function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard");
}

// Calculate amount for a specific item (only if not manually edited)
function calculateItemAmount(index) {
    const item = formRow.value[index];
    
    // Only auto-calculate if the amount hasn't been manually edited
    if (!item.isAmountManual) {
        const quantity = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        const taxPercent = parseFloat(item.tax) || 0;
        
        const subtotal = quantity * rate;
        const taxAmount = subtotal * (taxPercent / 100);
        const total = subtotal + taxAmount;
        
        item.amount = parseFloat(total.toFixed(2));
    }
    calculateTotal();
}

// Mark amount as manually edited
function onAmountManualEdit(index) {
    formRow.value[index].isAmountManual = true;
    calculateTotal();
}

// Reset auto-calculation for an item (useful if user wants to go back to auto-calc)
function resetItemCalculation(index) {
    formRow.value[index].isAmountManual = false;
    calculateItemAmount(index);
}

// Calculate total amount of all items (auto-calculated total)
function calculateTotal() {
    const total = formRow.value.reduce((sum, item) => {
        return sum + (parseFloat(item.amount) || 0);
    }, 0);
    // Only update total if it hasn't been manually overridden
    if (!isTotalManual.value) {
        invoiceTotal.value = parseFloat(total.toFixed(2));
    }
}

// Mark total as manually edited
function onTotalManualEdit() {
    isTotalManual.value = true;
}

// Reset total to auto-calculation
function resetTotalCalculation() {
    isTotalManual.value = false;
    calculateTotal();
}

const addField = () => {
    formRow.value.push({ name: '', quantity: 1, rate: 0, tax: 0, amount: 0, isAmountManual: false });
}

const removeField = () => {
    if (formRow.value.length > 1) {
        formRow.value.pop();
        calculateTotal();
    }
}

function getInvoiceSelectedWalletAddress() {
    switch (invoiceCurrency.value) {
        case 'btc':
            invoiceWalletAddress = btcWallet.value;
            break;
        case 'ethtrc20':
            invoiceWalletAddress = ethWallet.value;
            break;
        case 'usdt':
            invoiceWalletAddress = usdttrc20Wallet.value;
            break;
        case 'dai':
            invoiceWalletAddress = daiWallet.value;
            break;
        default:
            invoiceWalletAddress = "";
    }
}

function getInvoiceItems() {
    // Clear previous items
    invoiceItems = [];
    
    // Use the reactive formRow data directly
    formRow.value.forEach(item => {
        if (item.name.trim() !== '') { // Only include items with names
            invoiceItems.push({
                'name': item.name,
                'quantity': item.quantity,
                'rate': item.rate,
                'tax': item.tax,
                'amount': item.amount,
            });
        }
    });
}

async function createInvoice() {
    let issueDateConverted = convertToSimpleDate(issueDate)
    let dueDateConverted = convertToSimpleDate(dueDate)
    getInvoiceSelectedWalletAddress()
    getInvoiceItems();
    const { data, error } = await supabase
        .from('invoices')
        .insert([
            {
                number: invoiceNumber.value,
                issue_date: issueDate.value,
                due_date: dueDate.value,
                from: senderEmail.value,
                to: recieverEmail.value,
                from_info: { 'name': senderName.value, 'address': senderAddress.value, 'city': senderCity.value, 'country': senderCountry.value },
                to_info: { 'name': recieverName.value, 'address': recieverAddress.value, 'city': recieverCity.value, 'country': recieverCountry.value },
                status: 'not_paid',
                currency: invoiceCurrency.value,
                items: invoiceItems,
                wallet_address: invoiceWalletAddress,
                total: invoiceTotal.value
            },
        ])
        .select()
        console.log(data);
        console.log(error);
    // itemsForm.value.reset()
    invoice_uuid.value = data[0].invoice_uuid
}


async function updateInvoice() {
    let issueDateConverted = convertToSimpleDate(issueDate)
    let dueDateConverted = convertToSimpleDate(dueDate)
    getInvoiceItems();
    const { data, error } = await supabase
        .from('invoices')
        .update([
            {
                number: invoiceNumber.value,
                issue_date: issueDate.value,
                due_date: dueDate.value,
                from: senderEmail.value,
                to: recieverEmail.value,
                from_info: { 'name': senderName.value, 'address': senderAddress.value, 'city': senderCity.value, 'country': senderCountry.value },
                to_info: { 'name': recieverName.value, 'address': recieverAddress.value, 'city': recieverCity.value, 'country': recieverCountry.value },
                status: 'not_paid',
                currency: invoiceCurrency.value,
                total: invoiceTotal.value
            },
        ])
        .eq('invoice_uuid', invoice_uuid.value)
        .select()
}

function previewInvoice() {
    window.open(runtimeConfig.public.baseURL+'invoice/' + invoice_uuid.value, '_blank').focus();
}

</script>

<style scoped>

</style>