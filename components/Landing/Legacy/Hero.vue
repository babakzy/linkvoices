<template>
    <section class="border-b border-black bg-white py-14 md:py-24">


        <div class="hero2bg flex min-h-[240px] flex-wrap items-center justify-around md:min-h-[380px]">
            <div class=" basis-full md:basis-9/12 text-center relative">
                <h1 class="relative z-10 inline-block text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-ink md:text-7xl">
                    Send Direct Crypto Invoices for Free
                </h1>
            </div>
        </div>
        <div
            class="mx-4 my-8 flex flex-col items-center justify-center gap-2 border-y border-black py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink md:mx-auto md:max-w-4xl md:flex-row md:gap-4 md:px-0">
            <span class="inline-block">Direct Transfers</span>
            <span class="hidden h-4 w-px bg-black md:inline-block"></span>
            <span class="inline-block">Zero Platform Fees</span>
            <span class="hidden h-4 w-px bg-black md:inline-block"></span>
            <span class="inline-block">Complete Privacy</span>
            <span class="hidden h-4 w-px bg-black md:inline-block"></span>
            <span class="inline-block">Global Access</span>
        </div>
        <div class="basis-full text-center md:my-0">
            <nuxt-link class="inline-flex h-10 items-center justify-center rounded-ui border border-ink bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                :to="runtimeConfig.public.baseURL + 'invoice/fff45e65-9088-4928-9261-38abe1944cec'">See Demo
                Invoice</nuxt-link>
        </div>
        <div class="text-center mt-20 hidden">
            <img class=" w-10 inline-block mx-1" src="@/assets/images/btc-logo-blue.svg" alt="BTC crypto logo">
            <img class=" w-10 inline-block mx-1" src="@/assets/images/eth-logo-blue.svg" alt="BTC crypto logo">
            <img class=" w-10 inline-block mx-1" src="@/assets/images/dai-logo-blue.svg" alt="BTC crypto logo">
            <img class=" w-10 inline-block mx-1" src="@/assets/images/litecoin-ltc-logo-blue.svg" alt="BTC crypto logo">
        </div>
    </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()



onMounted(() => {
    //gsap.set('#textWrap', {xPercent:-50, yPercent:-50})
    //gsap.set('#textWrap #bank-icon', {y:'+=50'})


})






</script>

<style lang="scss" scoped>
.hero2bg {
    background-image: url('@/assets/images/hero2bg.svg');
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
}

// .btn-outline{
//     @apply .borde
// }</style>