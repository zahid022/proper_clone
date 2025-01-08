<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';


const props = defineProps<{
    images: any
}>()

const currentSlide = ref(0);

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length;
};

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % props.images.length;
};

const changeSlide = (index : number) => {
    currentSlide.value = index
};

</script>

<template>
    <div class="slider relative sl:flex ">
        <button @click="prevSlide" class="p-1 absolute md:hidden left-0 top-[50%] -translate-y-[50%]">
            <ChevronLeftIcon class="w-10 h-10 text-black" />
        </button>
        <div class="slides overflow-hidden sl:order-1 mb-6 sl:pl-20">
            <div v-for="(slide, index) in images" :key="index" :class="{ active: index === currentSlide }">
                <img :src="slide.url" alt="image">
            </div>
        </div>
        <div class="pagination hidden md:flex sl:flex-col md:gap-5">
            <div v-for="(slide, index) in images" @click="() => changeSlide(index)" :key="index" class="w-9 cursor-pointer" :class="{ active: index === currentSlide }">
                <img :src="slide.url" alt="image" class="w-full">
            </div>
        </div>
        <button @click="nextSlide" class="p-1 absolute right-0 md:hidden top-[50%] -translate-y-[50%]">
            <ChevronRightIcon class="w-10 h-10 text-black" />
        </button>
    </div>
</template>


<style>
.slides>div {
    display: none;
}

.slides>div.active {
    display: block;
}
</style>