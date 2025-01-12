<script setup lang="ts">
import { categoryShop } from '@/stores/public/shop/Category.shop';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import ShopLoading from '@/components/public/static/ShopLoading.vue'
import ShopHeader from '@/components/public/shop/ShopHeader.vue'
import ShopContent from '@/components/public/shop/ShopContent.vue';
import ShopSearchMobile from '@/components/public/shop/ShopSearchMobile.vue';
import ShopFilterSidebar from '@/components/public/shop/ShopFilterSidebar.vue';

const route = useRoute()



const isLoading = ref(true)
const categoryName = ref('')
const search_flag: Ref<boolean> = ref(false)
const sidebar_flag: Ref<boolean> = ref(false)

const set_search_flag = (arg: boolean) => {
    search_flag.value = arg
}

const set_sidebar_flag = (arg: boolean) => {
    sidebar_flag.value = arg
}

const shop_store = categoryShop()

const { shopCategories } = storeToRefs(shop_store)

const getCategoryName = () => {
    if (route.query.q) {
        categoryName.value = `'${route.query.q as string}'`
        return
    }

    if (!route.query.category) {
        categoryName.value = 'Clothing & Accessories'
        return
    }

    let category = route.query.category as string

    let categoryArr = category.split(',')

    categoryName.value = categoryArr[categoryArr.length - 1]
}

const setIsLoading = (arg: boolean) => {
    isLoading.value = arg
}

const showIsLoading = () => {
    isLoading.value = false
}

onMounted(() => getCategoryName())

watch(() => route.query, () => getCategoryName())
watch(() => shopCategories.value, () => showIsLoading())
</script>

<template>
    <ShopLoading :flag="isLoading" />
    <main class="min-h-[81vh] relative">
        <transition name="search-shop-in">
            <ShopSearchMobile v-if="search_flag" @set-search-flag="set_search_flag" />
        </transition>
        <transition name="sidebar-in">
            <ShopFilterSidebar v-if="sidebar_flag" @set-sidebar-flag="set_sidebar_flag" />
        </transition>
        <ShopHeader @set-search-flag="set_search_flag" :name="categoryName" />
        <ShopContent @set-sidebar-flag="set_sidebar_flag" :sidebar_flag="sidebar_flag" @set-is-loading="setIsLoading" />
    </main>
</template>

<style scoped>
.search-shop-in-enter-active,
.search-shop-in-leave-active {
    transition: opacity 0.3s ease;
}

.search-shop-in-enter-from {
    opacity: 0;
}

.search-shop-in-enter-to {
    opacity: 1;
}

.search-shop-in-leave-from {
    opacity: 1;
}

.search-shop-in-leave-to {
    opacity: 0;
}

.sidebar-in-enter-active,
.sidebar-in-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-in-enter-from {
    transform: translateX(300%);
}

.sidebar-in-enter-to {
    transform: translateX(0);
}

.sidebar-in-leave-from {
    transform: translateX(0);
}

.sidebar-in-leave-to {
    transform: translateX(300%);
}
</style>