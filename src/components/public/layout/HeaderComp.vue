<script setup lang="ts">
import BasketIcon from '@/static/icon/BasketIcon.vue'
import SearchIcon from "@/static/icon/SearchIcon.vue"
import UserIcon from '@/static/icon/UserIcon.vue';
import { ref, watch, type Ref } from 'vue';
import SidebarMenu from '../static/SidebarMenu.vue';
import { sidebarMenuTrigger } from '@/stores/public/Sidebar.store';
import { storeToRefs } from 'pinia';
import { getUser } from '@/stores/user.store';
import HoverCategory from '../static/HoverCategory.vue';
import { useRouter } from 'vue-router';
import { cartStore } from '@/stores/public/Cart.store'
import { Cart } from '@/services/api'
import type { category } from '@/types/database.type';
import { categoryShop } from '@/stores/public/shop/Category.shop';
import SearchDesktop from '../static/SearchDesktop.vue';

const router = useRouter()

const hover_flag: Ref<boolean> = ref(false)

const search_flag: Ref<boolean> = ref(false)

const categories: Ref<category[]> = ref([])

const userStore = getUser()

const { user } = storeToRefs(userStore)

const sidebarStore = sidebarMenuTrigger()

const { sidebar_flag } = storeToRefs(sidebarStore)

const { SET_SIDEBAR_FLAG } = sidebarStore

const cart_store = cartStore()

const { basket, refetch_basket } = storeToRefs(cart_store)

const { SET_BASKET } = cart_store

const category_shop_store = categoryShop()

const { SET_SHOP_CATEGORIES } = category_shop_store

const checkBasket = async () => {
    if ('_id' in user.value && user.value._id) {
        let result = await Cart.list()

        if (!result) {
            return
        }
        SET_BASKET(result)
    } else {
        SET_BASKET({
            list: [],
            totalDiscount: 0,
            totalPrice: 0,
        })
    }
}

const setSearchFlag = (arg: boolean) => {
    search_flag.value = arg
}

const toggleHover = (arg: boolean) => {
    hover_flag.value = arg
}

const openSide = () => {
    SET_SIDEBAR_FLAG(!sidebar_flag.value)
}

const getCategories = (arr: category[]) => {
    categories.value = arr
    SET_SHOP_CATEGORIES(arr)
}

const checkAccount = () => {
    if ('_id' in user.value && user.value._id) {
        router.push('/account')
        return
    }
    router.push('/login')
}

const gobasket = () => {
    if ('_id' in user.value && user.value._id) {
        router.push("/bag")
    } else {
        router.push("/login")
    }
}

watch(() => refetch_basket.value, () => checkBasket())
watch(() => user.value, () => checkBasket())
</script>

<template>
    <HoverCategory v-show="hover_flag" @toggle-hover="toggleHover" :category-cache="categories"
        @get-categories="getCategories" />
    <transition name="slide-in">
        <SidebarMenu v-if="sidebar_flag" :category-cache="categories" @get-categories="getCategories" />
    </transition>
    <transition name="search-in">
        <SearchDesktop v-if="search_flag" :flag="search_flag" @set-search-flag="setSearchFlag" />
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
                <li @mouseenter="() => toggleHover(true)" @mouseleave="() => toggleHover(false)"
                    class="text-[#ccc] min-h-[60px] flex items-center pr-2 cursor-pointer font-normal font-gt-america">
                    <RouterLink to="/shop">
                        Shop
                    </RouterLink>
                </li>
            </ul>
            <div class="w-8/12 md:4/12 flex justify-center">
                <p class="text-white text-[18px] font-normal font-gt-america tracking-wider">
                    <RouterLink to="/">PROPER CLOTH</RouterLink>
                </p>
            </div>
            <div class="w-2/12 md:w-4/12 flex items-center md:gap-6 lg:gap-8 justify-end">
                <button @click="() => setSearchFlag(!search_flag)" class="hidden md:block">
                    <SearchIcon />
                </button>
                <button @click="checkAccount" class="hidden md:block">
                    <UserIcon />
                </button>
                <button @click="gobasket" class="flex items-center gap-2">
                    <BasketIcon />
                    <span v-if="basket?.list?.length > 0" class="text-gray-50 text-sm">
                        {{ basket.list.length }}
                    </span>
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

.search-in-enter-active,
.search-in-leave-active {
    transition: opacity 0.3s ease;
}

.search-in-enter-from {
    opacity: 0;
}

.search-in-enter-to {
    opacity: 1;
}

.search-in-leave-from {
    opacity: 1;
}

.search-in-leave-to {
    opacity: 0;
}
</style>