<template>
    <div class="my-16">
        <div class="flex flex-wrap">
            <div class="basis-full md:basis-2/3">
                <div class="bg-slate-100 rounded-lg  p-4 md:p-8 m-2 ">
                    <h2 class="text-2xl font-normal text-slate-700 my-3">My Wallet Addresses</h2>
                    <div class="crypto-wallet-input">
                        <div class="label">
                            <span class="label-text">Bitcoin (BTC)</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <img
                                src="/assets/images/bitcoin-btc-logo.svg"
                                class="inline-block w-7"
                                alt="BTC WALLET"
                            >
                            <input
                                type="text"
                                class="grow"
                                placeholder="Bitcoin wallet address"
                            />
                        </label>
                    </div>
                    <div class="crypto-wallet-input">
                        <div class="label">
                            <span class="label-text">Etherium (ETH) _ TRC20 Network</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <img
                                src="/assets/images/ethereum-eth-logo.svg"
                                class="inline-block w-7 h-7"
                                alt="ETH WALLET"
                            >
                            <input
                                type="text"
                                class="grow"
                                placeholder="Etherium wallet address"
                            />
                        </label>
                    </div>
                    <div class="crypto-wallet-input">
                        <div class="label">
                            <span class="label-text">Tether (USDT)</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <img
                                src="/assets/images/tether-usdt-logo.svg"
                                class="inline-block w-7"
                                alt="USDT WALLET"
                            >
                            <input
                                type="text"
                                class="grow"
                                placeholder="Tether wallet address"
                            />
                        </label>
                    </div>
                    <div class="crypto-wallet-input">
                        <div class="label">
                            <span class="label-text">Dai (DAI)</span>
                        </div>
                        <label class="input input-bordered flex items-center gap-2">
                            <img
                                src="/assets/images/multi-collateral-dai-dai-logo.svg"
                                class="inline-block w-7"
                                alt="DAI WALLET"
                            >
                            <input
                                type="text"
                                class="grow"
                                placeholder="Dai wallet address"
                            />
                        </label>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-primary px-8 mt-4">Save</button>
                    </div>
               
                </div>
            </div>
            <div class="basis-full md:basis-1/3">
                <div class="crypto-pay-profile-card py-10 pl-40 pr-5 m-2 rounded-lg">
                    <p class="text-purple-800 text-xl">Create</p>
                    <h2 class="text-4xl text-purple-900">CryptoPay Profile</h2>
                </div>

                <div class="create-invoice-card mt-5 m-2 py-10 pl-40 pr-5 rounded-lg">
                    <p class="text-green-800 text-xl">Create New</p>
                    <h2 class="text-4xl text-green-900">Crypto Invoice</h2>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap my-8">
            <div class="basis-full md:basis-2/3">
                <h2 class="text-2xl font-normal text-slate-700 my-4">Last Payments</h2>
                <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="js"
>
definePageMeta({
    layout: 'default-page'
})
useHead({
    title: 'Dashboard - Home'
})
</script>

<style
    scoped
    lang="scss"
>
.crypto-pay-profile-card {
    background-color: rgb(237, 238, 248);
    background-image: url(/assets/images/Crypto-Profile-Link.svg);
    background-position: 10px bottom;
    background-repeat: no-repeat;
    background-size: 140px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: rgb(222, 225, 245);
    }
}

.create-invoice-card {
    background-color: #e5eee9;
    background-image: url(/assets/images/Crypto-Invoice.svg);
    background-position: 10px bottom;
    background-repeat: no-repeat;
    background-size: 140px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #cbdad0;
    }
}
.crypto-wallet-input input{
    font-weight: 300;
}
</style>