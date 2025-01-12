<script setup lang="ts">
import { categoryShop } from '@/stores/public/shop/Category.shop';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import ShopFilterCategory from './ShopFilterCategory.vue';
import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['set-sidebar-flag'])

const router = useRouter()
const route = useRoute()

const shop_store = categoryShop()

const { shopCategories } = storeToRefs(shop_store)

const categories_slug: Ref<string[]> = ref([])

const addCategories_slug = (arg: string) => {
    if (categories_slug.value.includes(arg)) {
        return
    } else {
        categories_slug.value.push(arg)
    }

}

const applySlug = () => {
    if(categories_slug.value.length === 0){
        return
    }

    const slugs = categories_slug.value.join(',')

    router.push({
        path : route.path,
        query : {
            category : slugs
        }
    })

    emit('set-sidebar-flag', false)
}

const clearSlug = () => {
    router.push({
        path : route.path
    })

    emit('set-sidebar-flag', false)
}

</script>

<template>
    <div class="fixed md:hidden inset-0 overflow-y-auto bg-white z-[999]">
        <div class="px-3 h-full relative">
            <div class="flex items-center py-3 border-b border-[#757575] justify-between">
                <h2 class="text-[18px] font-medium">Filters</h2>
                <button @click="() => $emit('set-sidebar-flag', false)">
                    <XMarkIcon class="w-4 h-4 text-black" />
                </button>
            </div>
            <div class="py-3">
                <template v-if="shopCategories.length > 0">
                    <ShopFilterCategory @add-slug="addCategories_slug" v-for="category in shopCategories" :key="category._id" :item="category" />
                </template>
            </div>

            <div class="absolute bottom-3 flex justify-between left-3 right-3">
                <button @click="applySlug" class="uppercase w-[49%] bg-black font-medium text-[14px] text-white py-3 rounded block">Apply filters</button>
                <button @click="clearSlug" class="uppercase w-[49%] border border-black bg-white font-medium text-[14px] text-black py-3 rounded block">clear filters</button>
            </div>
        </div>
    </div>
</template>