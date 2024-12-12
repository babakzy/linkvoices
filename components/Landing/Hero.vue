<template>
    <div  class=" flex h-[70vh] flex-wrap items-center justify-around ">
        <div id="textWrap" class="basis-full absolute top-10  left-0.5 right-0.5 text-center">
            <h1  class=" text-4xl md:text-5xl text-spring-wood-950 mt-20 capitalize ">
                We dont't need central banks anymore
            </h1>
            <div class="relative mt-20">
                <div id="bank-icon"  class="inline-block absolute w-[120px] z-10 top-[50%] mt-[-30px] md:mt-0 md:top-[-60px] right-0 left-0 m-auto bg-spring-wood-50 p-5 rounded-full ">
                    <img  class="w-full"  src="@/assets/images/bank-icon.svg" alt="Central Bank">
                </div>
               
                <img class="w-full hidden md:block relative z-0" src="@/assets/images/hero-people.svg" alt="">
                <img class="w-full p-4 md:hidden relative z-0" src="@/assets/images/mobile-people.svg" alt="">
            </div>
          
        </div>
    </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


onMounted(()=>{
 //gsap.set('#textWrap', {xPercent:-50, yPercent:-50})
//gsap.set('#textWrap #bank-icon', {y:'+=50'})


var hero = gsap.timeline({
  scrollTrigger: {
    trigger: "#pageWrap",
    pin:true,
    start: "top top",
    end: "+=230",
    scrub:true,
  } 
})
.to('#textWrap #bank-icon',{ duration:0.5, stagger:1, opacity: 0 , y:-20 })



})






</script>

<style lang="scss" scoped>

</style>