<template>
    <section  id="pageWrap" class=" bg-cerulean-blue-700 min-h-screen md:min-h-[80vh] py-16 md:py-32 ">
        <div id="textWrap" class="md:container mx-auto flex flex-wrap items-center justify-around">
            <div class="basis-full md:basis-3/4 relative ">
            <div class=" absolute h-auto top-0 left-0 right-0 text-center">
                <h2 class=" text-3xl md:text-5xl text-spring-wood-50 capitalize ">
                    We dont't need central banks anymore
                </h2>
                <p class="text-spring-wood-100 max-w-3xl mt-4 mx-auto leading-6">Decentralized finance removes traditional banking intermediaries, allowing you to securely manage and grow your wealth through blockchain technology - without high fees or restricted access.</p>
                <div class="relative mt-16 ">
                    <div id="bank-icon"
                        class="inline-block absolute w-[120px] z-10 top-[50%] mt-[-30px] md:mt-0 md:top-[-60px] right-0 left-0 m-auto  bg-cerulean-blue-700 p-5 rounded-full ">
                        <img class="w-full" src="@/assets/images/Bank-icon.svg" alt="Central Bank">
                    </div>

                    <img class="w-full hidden md:block relative z-0" src="@/assets/images/hero-people.svg" alt="">
                    <img class="w-full p-4 md:hidden relative z-0" src="@/assets/images/mobile-people.svg" alt="">
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