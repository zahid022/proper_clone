<script setup lang="ts">
import { product, Tag } from '@/services/api';
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import TagCard from '@/components/public/static/TagCard.vue'
import { tagVariant } from '@/stores/public/Tag.variant.store';
import { storeToRefs } from 'pinia';
import type { ProductType, ProductVariant, tag } from '@/types/database.type';

const tags: Ref<tag[]> = ref([])
const checkedTag = ref('')
const data: Ref<ProductType[]> = ref([])
const itemsToShow = ref(10);

const store = tagVariant()

const { checkVariants } = storeToRefs(store)

const { SET_CHECK_VARIANTS, CLEAR_CHECK_VARIANTS } = store

const getData = async () => {
    const result = await Tag.tags()
    if (!result) {
        return
    }
    
    tags.value = result

    checkedTag.value = result[0]._id
}

const getProductData = async () => {
    const filter = {
        tags: checkedTag.value
    }

    const result = await product.getProducts(filter)

    data.value = result.products
    showVariants(result.products)
}

const showVariants = (arr: ProductType[]) => {
    CLEAR_CHECK_VARIANTS()
    const seenVariants = new Set();

    arr.forEach((item: ProductType) => {
        const id = item._id;

        item.variants.forEach((variant: ProductVariant) => {
            const color = variant.specs.color;
            const uniqueKey = `${id}-${color}`;

            if (!seenVariants.has(uniqueKey)) {
                variant.product_slug = item.slug
                SET_CHECK_VARIANTS(variant);
                seenVariants.add(uniqueKey);
            }
        });
    });
};

const updateItemsToShow = () => {
    if (window.innerWidth < 768) {
        itemsToShow.value = 9;
    } else {
        itemsToShow.value = 10;
    }
};

watch(() => checkedTag.value, () => getProductData())

onMounted(() => {
    getData()
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
})

onUnmounted(() => {
    window.removeEventListener('resize', updateItemsToShow);
});
</script>

<template>
    <section class="px-3 md:px-8 lg:px-12 py-10">
        <template v-if="tags.length">
            <ul class="flex items-center gap-3 pl-1 pb-2">
                <li v-for="(item, index) in tags" class="flex items-center gap-3 italic text-[20px] md:text-[32px]">
                    <span class="text-[#666]" v-if="index !== 0">/</span>
                    <button
                        :class="{ 'text-black': checkedTag === item._id, 'text-[#999] hover:text-[#555] duration-200': checkedTag !== item._id }"
                        @click="() => checkedTag = item._id as string">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </template>

        <template v-if="checkVariants.length">
            <div class="flex flex-wrap">
                <TagCard v-for="(item, index) in checkVariants.slice(0, itemsToShow)" :key="item._id" :item="item" />
            </div>
        </template>
    </section>
</template>