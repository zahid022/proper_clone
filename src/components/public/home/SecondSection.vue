<script setup lang="ts">
const data = [
    {
        image: "https://res.cloudinary.com/djlix30nq/image/upload/v1735901584/uploads/1735901583689-tile_dress-shirts2.jpg.jpg",
        text: "Dress Shirts",
        path: "/shop?category=shirts,dress-shirts"
    },
    {
        image: "https://res.cloudinary.com/djlix30nq/image/upload/v1735901608/uploads/1735901607560-tile_suits_fw24c.jpg.jpg",
        text: "Men's Suits",
        path: "/shop?category=suits"
    }
]
</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 py-10">
        <div class="flex flex-wrap justify-between gap-6 md:gap-0">
            <RouterLink :to="item.path" v-for="(item, index) in data" :key="index" class="w-full tile block cursor-pointer relative md:w-[49%]">
                <figure>
                    <img :src="item.image" class="w-full h-full rounded-[4px]" alt="image">
                </figure>
                <div class="absolute left-8 bottom-12 z-[900] text-white">
                    <span class="text-[15px] block mb-1">Explore</span>
                    <h2 class="text-[28px] md:text-[32px] font-serif">{{ item.text }}</h2>
                </div>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
.tile:hover h2 {
    text-decoration: underline;
}

figure::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.3) 100%);
}
</style>