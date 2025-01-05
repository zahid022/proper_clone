<script setup lang="ts">
const img1 = "https://res.cloudinary.com/djlix30nq/image/upload/v1736090438/uploads/1736090438130-lkbk-ivy1.jpg.jpg"
const img2 = "https://res.cloudinary.com/djlix30nq/image/upload/v1736090475/uploads/1736090474769-lkbk-ivy2.jpg.jpg"
</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 py-10">
        <div class="flex flex-wrap">
            <div class="md:pr-1 md:w-6/12 mb-4 md:mb-0">
                <div>
                    <img :src="img1" class="w-full" alt="image">
                </div>
            </div>
            <div class="md:pl-1 md:w-6/12">
                <div class="bg-[#302018] h-full py-[10%] px-[16.5%]">
                    <div class="flex justify-center items-center h-full">
                        <img :src="img2" class="w-full object-cover" alt="image">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>