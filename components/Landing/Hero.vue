<template>
    <div id="textWrap" class=" bg-cerulean-blue-700 min-h-screen  md:min-h-[70vh]  ">
        <div class="md:container mx-auto flex flex-wrap items-center justify-around">
            <div class="basis-full my-10 md:basis-3/4 relative ">
            <div class=" absolute h-auto top-0 left-0 right-0 text-center">
                <h1 class=" text-4xl md:text-6xl text-spring-wood-50 my-16 capitalize ">
                    We dont't need central banks anymore
                </h1>
                <div class="relative my-10">
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
    </div>
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
            end: "+=230",
            scrub: true,
        }
    })
        .to('#textWrap #bank-icon', { duration: 0.5, stagger: 1, opacity: 0, y: -20 })



})






</script>

<style lang="scss" scoped></style>