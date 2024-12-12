<template>
    <div class="flex flex-wrap items-center justify-around hero2bg min-h-[50vh]">
        <div class="basis-8/12 text-center relative">
            <h2 class="inline-block text-4xl  z-10 md:text-5xl text-spring-wood-950 mt-20 capitalize ">
                Send crypto invoice for free with no extra fee
            </h2>
        </div>
    </div>
    <div class="basis-full text-center md:my-0">
        <nuxt-link class="btn btn-outline"
            :to="runtimeConfig.public.baseURL + 'invoice/fff45e65-9088-4928-9261-38abe1944cec'">See Demo
            Invoice</nuxt-link>
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
</style>