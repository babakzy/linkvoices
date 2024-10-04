<template>
    <div class="flex flex-wrap items-center justify-around ">
        <div class="basis-full md:basis-1/2 ">
            <h1 class=" text-5xl md:text-6xl text-slate-900 ">
                Create and send instance crypto invoice for <span class="">free</span>
            </h1>
            <ul class="my-3 text-slate-600">
                <li
                    class=" bg-gradient-to-br ml-4 my-1 from-green-100 to-green-300 px-4 py-1 text-green-950  inline-block rounded-full">
                    No Fee/Commesion
                </li>
                <li
                    class="bg-gradient-to-br ml-4 my-1 from-green-100 to-green-300 px-4 py-1 text-green-950  inline-block rounded-full">
                    With your prefered wallet
                </li>
            </ul>
        </div>
        <div class="basis-full md:basis-1/2 ">
            <img src="@/assets/images/hero-crypro-invoice.png" alt="send cryprocurrency invoice">
        </div>
        <div class="basis-full text-center my-6 md:my-0">
            <nuxt-link class="btn btn-outline" :to="runtimeConfig.public.baseURL+'invoice/fff45e65-9088-4928-9261-38abe1944cec'" >See Demo Invoice</nuxt-link> 
        </div>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped>

</style>