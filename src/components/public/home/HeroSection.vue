<script setup lang="ts">
import imgMobile from '@/assets/img/hero_mb.jpg'
import imgDesktop from '@/assets/img/hero_dk.jpg'
</script>

<template>
    <section class="min-h-[70vh] relative max-h-[87.5vh] overflow-hidden">
        <picture>
            <source media="(min-width: 850px)" :srcset="imgDesktop" >
            <img  class="object-cover" :src="imgMobile" alt="image" width="2000" height="1300">
        </picture>
        <div class="absolute left-3 bottom-6 md:bottom-10 lg:bottom-20 md:left-8 lg:left-12 z-[900]">
            <h2 class="text-[30px] md:text-[36px] font-serif text-white mb-4 tracking-wider font-normal">Fresh Fits</h2>
            <button class="bg-white text-black rounded-[3px] text-[14px] font-medium py-[10px] px-5 uppercase tracking-wider">Shop New Arrivals</button>
        </div>
    </section>
</template>

<style scoped>
img{
    object-position: 50% 33%;
    min-height: 70vh;
    max-height: 87.5vh;
}
</style>