<script setup lang="ts">
import BasketIcon from '@/static/icon/BasketIcon.vue'
import SearchIcon from "@/static/icon/SearchIcon.vue"
import UserIcon from '@/static/icon/UserIcon.vue';
import { ref, type Ref } from 'vue';
import SidebarMenu from '../static/SidebarMenu.vue';
import { sidebarMenuTrigger } from '@/stores/public/Sidebar.store';
import { storeToRefs } from 'pinia';
import { getUser } from '@/stores/user.store';

const categories: Ref<any> = ref([])

const userStore = getUser()

const { user } = storeToRefs(userStore)

const sidebarStore = sidebarMenuTrigger()

const { sidebar_flag } = storeToRefs(sidebarStore)

const { SET_SIDEBAR_FLAG } = sidebarStore

const openSide = () => {
    SET_SIDEBAR_FLAG(!sidebar_flag.value)
}

const getCategories = (arr: any) => {
    categories.value = arr
}
</script>

<template>
    <transition name="slide-in">
        <SidebarMenu v-if="sidebar_flag" :category-cache="categories" @get-categories="getCategories" />
    </transition>
    <header class="sticky top-0 left-0 right-0 z-[999] bg-black px-3 md:px-8 lg:px-12">
        <div class="flex items-center min-h-[60px]">
            <div class="w-2/12 md:hidden">
                <button @click="openSide">
                    <span :class="{ 'w-7': !sidebar_flag, 'w-3': sidebar_flag }"
                        class="bg-white h-[0.5px] block duration-300 mb-1"></span>
                    <span :class="{ 'w-7': !sidebar_flag, 'w-4': sidebar_flag }"
                        class="bg-white h-[1px] block duration-300 my-1"></span>
                    <span :class="{ 'w-7': !sidebar_flag, 'w-5': sidebar_flag }"
                        class="bg-white h-[0.5px] block duration-300 mt-1"></span>
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

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
    transition: transform 0.3s ease;
}

.slide-in-enter-from {
    transform: translateX(-300%);
}

.slide-in-enter-to {
    transform: translateX(0);
}

.slide-in-leave-from {
    transform: translateX(0);
}

.slide-in-leave-to {
    transform: translateX(-300%);
}
</style>