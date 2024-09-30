<template>
    <div class="my-16">
        <div class="flex flex-wrap">
            <div class="basis-full md:basis-2/3">
                <div class="bg-slate-100 rounded-lg  p-4 md:p-8 m-2 ">
                   <UserWallets/>
                </div>
            </div>
            <div class="basis-full md:basis-1/3">
                <!-- <div class="crypto-pay-profile-card py-10 pl-40 pr-5 m-2 rounded-lg">
                    <p class="text-purple-800 text-xl">Create</p>
                    <h2 class="text-4xl text-purple-900">CryptoPay Profile</h2>
                </div> -->
<nuxt-link to="/dashboard/createInvoice">
                <div class="create-invoice-card m-2 py-10 pl-40 pr-5 rounded-lg">
                    <p class="text-green-800 text-xl">Create New</p>
                    <h2 class="text-4xl text-green-900">Crypto Invoice</h2>
                </div>
            </nuxt-link>
            </div>
            
        </div>
        <div class="flex flex-wrap my-8">
            <div class="basis-full md:basis-2/3">
            <InvoicesList/>
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