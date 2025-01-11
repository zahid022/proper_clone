<script setup lang="ts">
import { categoryShop } from '@/stores/public/shop/Category.shop';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ShopLoading from '@/components/public/static/ShopLoading.vue'
import ShopHeader from '@/components/public/shop/ShopHeader.vue'
import ShopContent from '@/components/public/shop/ShopContent.vue';

const route = useRoute()

const isLoading = ref(true)

const categoryName = ref('')

const shop_store = categoryShop()

const { shopCategories } = storeToRefs(shop_store)

const getCategoryName = () => {
    if(!route.query.category){
        categoryName.value = 'Clothing & Accessories'
        return
    }

    let category = route.query.category as string 

    let categoryArr = category.split(',')

    categoryName.value = categoryArr[categoryArr.length - 1]
}

const setIsLoading = (arg : boolean) => {
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
        <ShopHeader :name="categoryName" />
        <ShopContent @set-is-loading="setIsLoading" />
    </main>
</template>