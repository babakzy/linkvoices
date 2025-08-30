<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-lg font-semibold text-gray-900">Crypto Wallets</h3>
                <p class="text-sm text-gray-600 mt-1">Manage your cryptocurrency wallet addresses</p>
            </div>
        </div>

        <!-- Wallet Cards -->
        <div class="grid gap-4">
            <!-- Bitcoin Wallet -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                <div class="flex items-center mb-4">
                    <div class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mr-3">
                        <img src="/assets/images/bitcoin-btc-logo.svg" class="w-6 h-6" alt="BTC">
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900">Bitcoin</h4>
                        <p class="text-xs text-gray-500">BTC</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-medium text-gray-700">Wallet Address</label>
                    <input 
                        v-model="btcWallet" 
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Enter your Bitcoin wallet address" 
                    />
                </div>
            </div>

            <!-- Ethereum Wallet -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                <div class="flex items-center mb-4">
                    <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                        <img src="/assets/images/ethereum-eth-logo.svg" class="w-6 h-6" alt="ETH">
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900">Ethereum</h4>
                        <p class="text-xs text-gray-500">ETH - TRC20 Network</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-medium text-gray-700">Wallet Address</label>
                    <input 
                        v-model="ethWallet" 
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Enter your Ethereum wallet address" 
                    />
                </div>
            </div>

            <!-- USDT Wallet -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                <div class="flex items-center mb-4">
                    <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-3">
                        <img src="/assets/images/tether-usdt-logo.svg" class="w-6 h-6" alt="USDT">
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900">Tether</h4>
                        <p class="text-xs text-gray-500">USDT</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-medium text-gray-700">Wallet Address</label>
                    <input 
                        v-model="usdttrc20Wallet" 
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Enter your Tether wallet address" 
                    />
                </div>
            </div>

            <!-- DAI Wallet -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200">
                <div class="flex items-center mb-4">
                    <div class="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mr-3">
                        <img src="/assets/images/multi-collateral-dai-dai-logo.svg" class="w-6 h-6" alt="DAI">
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900">Dai</h4>
                        <p class="text-xs text-gray-500">DAI</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-medium text-gray-700">Wallet Address</label>
                    <input 
                        v-model="daiWallet" 
                        type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Enter your Dai wallet address" 
                    />
                </div>
            </div>
        </div>

        <!-- Info and Save Section -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <span class="material-symbols-outlined text-blue-600">info</span>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-blue-800">
                        New currencies will be added soon. Email us your favorite currencies to list.
                    </p>
                </div>
            </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end pt-4 border-t border-gray-200">
            <button 
                @click="updateWallets" 
                class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Save Wallets
            </button>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userProfile = ref(null)
const btcWallet = ref("")
const ethWallet = ref("")
const usdttrc20Wallet = ref("")
const daiWallet = ref("")
// currencies to add later
//const xrpWallet =  ref("")
//const dogeWallet =  ref("")
//const tronWallet =  ref("")
//const bnbWallet =  ref("")

onMounted(() => {
    readProfile();
})

async function readProfile() {
    let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
    userProfile.value = profile[0];
    btcWallet.value = profile[0].btc_wallet
    ethWallet.value = profile[0].eth_wallet
    daiWallet.value = profile[0].dai_wallet
    usdttrc20Wallet.value = profile[0].usdt_trc20_wallet
}

async function updateWallets() {
    const { data, error } = await supabase
        .from('profiles')
        .update({ btc_wallet: btcWallet.value, eth_wallet: ethWallet.value, dai_wallet: daiWallet.value, usdt_trc20_wallet: usdttrc20Wallet.value })
        .eq('id', user.value.id)
        .select()
    alert("Your wallet addresses updated successfully.")
}
</script>

<style lang="scss" scoped></style>