<script setup lang="ts">
import FilterIcon from '@/static/icon/FilterIcon.vue';
import { categoryShop } from '@/stores/public/shop/Category.shop';
import { storeToRefs } from 'pinia';
import ShopCategoryItem from '@/components/public/shop/ShopCategoryItem.vue'
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { Category, product } from '@/services/api';
import type { category, ProductType, ProductVariant } from '@/types/database.type';
import ShopCard from './ShopCard.vue';
import ShopPagination from '@/components/public/shop/ShopPagination.vue'

const route = useRoute()
const router = useRouter()

const products: Ref<ProductType[]> = ref([])
const variants: Ref<ProductVariant[]> = ref([])

const page: Ref<number> = ref(1)
const limit: Ref<number> = ref(10)
const total: Ref<number> = ref(0)
const totalPages: Ref<number> = ref(1)

const selectedCategories: Ref<string[]> = ref([])

const emit = defineEmits(['set-is-loading'])

const getSelectedCategories = () => {
    page.value = 1

    if (!route.query.category) {
        selectedCategories.value = []
        return
    }

    const existingCategory = route.query.category;
    let categoryArray = existingCategory
        ? String(existingCategory).split(',')
        : [];

    selectedCategories.value = categoryArray
}

const removeUrl = (arg: string, index: number) => {
    selectedCategories.value = selectedCategories.value.slice(0, index);

    router.push({
        path: route.path,
        query: {
            ...route.query,
            category: selectedCategories.value.length ? selectedCategories.value.join(',') : undefined,
        },
    });
}

const getProducts = async () => {
    emit('set-is-loading', true)
    let response = null

    if (route.query.q) {
        let obj = {
            search: route.query.q,
            limit: limit.value,
            page: page.value
        }
        response = await product.getProducts(obj)
    } else {
        const result = await Category.categories()

        if (!result) {
            return
        }

        const filterCategories: string[] = []

        result.forEach((item: category) => {
            if (selectedCategories.value.includes(item.slug)) {
                filterCategories.push(item._id as string)
            }
        })

        let requestCategoryURL = filterCategories.join(",")
        let obj = {
            categories: requestCategoryURL,
            limit: limit.value,
            page: page.value
        }

        response = await product.getProducts(obj)
    }

    if (!response) {
        return
    }

    products.value = []
    variants.value = []
    total.value = 0

    total.value = response.total
    products.value = response.products

    totalPages.value = Math.ceil(total.value / limit.value);
    const seenVariants = new Set();

    products.value.forEach((item: ProductType) => {

        item.variants.forEach((variant: ProductVariant) => {
            const color = variant.specs.color;
            const name = item.title
            const uniquekey = `${name}-${color}`

            if (!seenVariants.has(color)) {
                variant.product_slug = item.slug
                variant.product_name = item.title
                seenVariants.add(color);
                variants.value.push(variant)
            }
        });
    });

    emit("set-is-loading", false)
}

const setPage = (arg: number) => {
    page.value = arg
}

const shop_store = categoryShop()

const { shopCategories } = storeToRefs(shop_store)

const filter_flag: Ref<boolean> = ref(false)

onMounted(() => { getSelectedCategories(), getProducts() })

watch(() => page.value, () => getProducts())
watch(() => route.query, () => { getSelectedCategories(), getProducts() })

</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 relative py-4 md:py-10">
        <div
            class="flex pb-3 border-b sticky bg-white top-[60px] pt-3 left-0 right-0 z-[900] md:justify-end border-[#00000033]">
            <button @click="() => filter_flag = !filter_flag" class="flex items-center gap-2">
                <FilterIcon />
                <p>
                    <span v-if="!filter_flag">Hide</span> Filters
                </p>
            </button>
        </div>

        <template v-if="selectedCategories.length > 0">
            <div class="flex gap-2 pt-6">
                <div class="flex items-center gap-1 py-1 px-3 rounded-full border-2 border-black"
                    v-for="(item, index) in selectedCategories">
                    <span>
                        {{ item }}
                    </span>
                    <button @click="() => removeUrl(item, index)">
                        <XMarkIcon class="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </template>

        <div class="flex flex-wrap pt-10">
            <div class="w-2/12 hidden md:block" :class="{ 'md:!hidden': filter_flag }">
                <h3 class="uppercase font-medium text-[14px] mb-4 tracking-widest">Category</h3>
                <div v-if="shopCategories.length > 0">
                    <ShopCategoryItem v-for="category in shopCategories" :item="category" :key="category._id" />
                </div>
            </div>
            <div class="w-full" :class="{ 'md:!w-10/12': !filter_flag, 'md:!w-full': filter_flag }">
                <div class="flex flex-wrap">
                    <template v-if="products.length > 0">
                        <ShopCard v-for="item in variants" :key="item._id" :flag="filter_flag" :item="item" />
                        <ShopPagination :total="total" @set-page="setPage" :total-pages="totalPages" :limit="limit"
                            :page="page" />
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>