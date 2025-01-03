<script setup lang="ts">

</script>

<template>
    <section class="min-h-[70vh] relative max-h-[87.5vh] overflow-hidden">
        <picture>
            <source media="(min-width: 850px)" srcset="https://res.cloudinary.com/djlix30nq/image/upload/v1735901038/uploads/1735901037794-hero_dk.jpg.jpg" >
            <img  class="object-cover" src="https://res.cloudinary.com/djlix30nq/image/upload/v1735900997/uploads/1735900996350-hero_mb.jpg.jpg" alt="image" width="2000" height="1300">
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