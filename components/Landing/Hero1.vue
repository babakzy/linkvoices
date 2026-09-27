<template>
    <section id="pageWrap" class="min-h-screen border-b border-black bg-brand-blue py-16 text-white md:min-h-[80vh] md:py-32">
        <div id="textWrap" class="mx-auto flex flex-wrap items-center justify-around px-4 md:container md:px-6">
            <div class="relative basis-full md:basis-3/4">
            <div class="absolute left-0 right-0 top-0 h-auto text-center">
                <h2 class="text-3xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-5xl">
                    We Don't Need Central Banks Anymore
                </h2>
                <p class="mx-auto mt-6 max-w-3xl px-4 text-base leading-relaxed text-white/85 md:text-lg">Decentralized finance removes traditional banking intermediaries, allowing you to securely manage and grow your wealth through blockchain technology—without excessive fees or restricted access.</p>
                <div class="relative mt-16 ">
                    <div id="bank-icon"
                        class="absolute left-0 right-0 top-[50%] z-10 m-auto mt-[-30px] inline-block w-[120px] rounded-ui border border-white/70 bg-brand-blue p-5 md:top-[-60px] md:mt-0">
                        <img class="w-full" src="@/assets/images/Bank-icon.svg" alt="Central Bank">
                    </div>

                    <img class="w-full hidden md:block relative z-0" src="@/assets/images/hero-people.svg" alt="People using decentralized finance without traditional banks">
                    <img class="w-full p-4 md:hidden relative z-0" src="@/assets/images/mobile-people.svg" alt="People using decentralized finance on mobile">
                </div>
            </div>
        </div>
        </div>
    </section>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(() => {
    //gsap.set('#textWrap', {xPercent:-50, yPercent:-50})
    //gsap.set('#textWrap #bank-icon', {y:'+=50'})


    var hero = gsap.timeline({
        scrollTrigger: {
            trigger: "#pageWrap",
            pin: true,
            start: "top top",
            end: "+=430",
            scrub: true,
        }
    })
        .to('#textWrap #bank-icon', { duration: 0.5, stagger: 1, opacity: 0, y: -20 })



})






</script>

<style lang="scss" scoped></style>