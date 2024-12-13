<template>
    <div class=" bg-spring-wood-100 py-16 md:py-32">


    <div class="flex flex-wrap items-center justify-around hero2bg min-h-[360px]">
        <div class=" basis-full md:basis-7/12 text-center relative">
            <h2 class="inline-block text-4xl z-10 md:text-6xl text-cerulean-blue-900 capitalize ">
                Send crypto invoice for free
            </h2>
        </div>
    </div>
    <div class="basis-full text-center md:my-0">
        <nuxt-link class="btn bg-cerulean-blue-50 border-cerulean-blue-700 !hover:bg-white text-cerulean-blue-900"
            :to="runtimeConfig.public.baseURL + 'invoice/fff45e65-9088-4928-9261-38abe1944cec'">See Demo
            Invoice</nuxt-link>
    </div>
    <div class="text-center mt-20 hidden">
<img class=" w-10 inline-block mx-1" src="@/assets/images/btc-logo-blue.svg" alt="BTC crypto logo">
<img class=" w-10 inline-block mx-1" src="@/assets/images/eth-logo-blue.svg" alt="BTC crypto logo">
<img class=" w-10 inline-block mx-1" src="@/assets/images/dai-logo-blue.svg" alt="BTC crypto logo">
<img class=" w-10 inline-block mx-1" src="@/assets/images/litecoin-ltc-logo-blue.svg" alt="BTC crypto logo">
    </div>
</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()



onMounted(() => {
    //gsap.set('#textWrap', {xPercent:-50, yPercent:-50})
    //gsap.set('#textWrap #bank-icon', {y:'+=50'})


})






</script>

<style lang="scss" scoped>
.hero2bg{
    background-image: url('@/assets/images/hero2bg.svg');
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
}
// .btn-outline{
//     @apply .borde
// }
</style>