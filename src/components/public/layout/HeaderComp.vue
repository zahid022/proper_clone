<script setup lang="ts">
import BasketIcon from '@/static/icon/BasketIcon.vue'
import SearchIcon from "@/static/icon/SearchIcon.vue"
import UserIcon from '@/static/icon/UserIcon.vue';
import { ref, type Ref } from 'vue';

const sideIcon : Ref<boolean> = ref(false)

const openSide = () => {
    sideIcon.value = !sideIcon.value
}
</script>

<template>
    <header class="sticky top-0 left-0 right-0 z-[999] px-3 bg-black md:px-8 lg:px-12">
        <div class="flex items-center min-h-[60px]">
            <div class="w-2/12 md:hidden">
                <button @click="openSide">
                    <span :class="{'w-7' : !sideIcon, 'w-3' : sideIcon}" class="bg-white h-[0.5px] block duration-300 mb-1"></span>
                    <span :class="{'w-7' : !sideIcon, 'w-4' : sideIcon}" class="bg-white h-[1px] block duration-300 my-1"></span>
                    <span :class="{'w-7' : !sideIcon, 'w-5' : sideIcon}" class="bg-white h-[0.5px] block duration-300 mt-1"></span>
                </button>
            </div>
            <ul class="w-4/12 hidden text-white md:flex">
                <li class="text-[#ccc] cursor-pointer font-normal font-gt-america">Shop</li>
            </ul>
            <div class="w-8/12 md:4/12 flex justify-center">
                <p class="text-white text-[18px] font-normal font-gt-america tracking-wider">
                    <RouterLink to="/">PROPER CLOTH</RouterLink>
                </p>
            </div>
            <div class="w-2/12 md:w-4/12 flex items-center md:gap-6 lg:gap-8 justify-end">
                <button class="hidden md:block">
                    <SearchIcon />
                </button>
                <button class="hidden md:block">
                    <UserIcon />
                </button>
                <button>
                    <BasketIcon />
                </button>
            </div>
        </div>
    </header>
</template>