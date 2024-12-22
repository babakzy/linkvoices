<template>
    <div>
        <div class="crypto-wallet-input mb-3">
            <div class="label">
                <span class="label-text">Bitcoin (BTC)</span>
            </div>
            <label class="input input-bordered flex items-center gap-2">
                <img src="/assets/images/bitcoin-btc-logo.svg" class="inline-block w-7" alt="BTC WALLET">
                <input v-model="btcWallet" type="text" class="grow" placeholder="Bitcoin wallet address" />
            </label>
        </div>
        <div class="crypto-wallet-input">
            <div class="label">
                <span class="label-text">Etherium (ETH) _ TRC20 Network</span>
            </div>
            <label class="input input-bordered flex items-center gap-2">
                <img src="/assets/images/ethereum-eth-logo.svg" class="inline-block w-7 h-7" alt="ETH WALLET">
                <input v-model="ethWallet" type="text" class="grow" placeholder="Etherium wallet address" />
            </label>
        </div>
        <div class="crypto-wallet-input">
            <div class="label">
                <span class="label-text">Tether (USDT)</span>
            </div>
            <label class="input input-bordered flex items-center gap-2">
                <img src="/assets/images/tether-usdt-logo.svg" class="inline-block w-7" alt="USDT WALLET">
                <input v-model="usdttrc20Wallet" type="text" class="grow" placeholder="Tether wallet address" />
            </label>
        </div>
        <div class="crypto-wallet-input">
            <div class="label">
                <span class="label-text">Dai (DAI)</span>
            </div>
            <label class="input input-bordered flex items-center gap-2">
                <img src="/assets/images/multi-collateral-dai-dai-logo.svg" class="inline-block w-7" alt="DAI WALLET">
                <input v-model="daiWallet" type="text" class="grow" placeholder="Dai wallet address" />
            </label>
        </div>
        <p class="text-slate-600 font-light mt-4">New currencies will add soon. E-mail us your favorite currencies to
            list.</p>
        <div class="text-right">
            <button @click="updateWallets" class="btn btn-primary px-8 mt-4">Save</button>
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