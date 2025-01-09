<script setup lang="ts">
import { product } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailSlider from '@/components/public/detail/DetailSlider.vue'
import DetailVariant from '@/components/public/detail/DetailVariant.vue';
import { type Image, type ProductType, type ProductVariant } from '@/types/database.type';

const route = useRoute()

const productDetail: Ref<ProductType | null> = ref(null)

const variant: Ref<ProductVariant | null> = ref(null)

const getProduct = async () => {
    const slug = route.params.product_slug
    let result = await product.getBySlug(slug as string)

    if (!result) {
        return
    }
    
    productDetail.value = result

    showVariant(result)
}

const showVariant = (arg: ProductType) => {
    const item = arg.variants.find((item: ProductVariant) => item.slug === route.params.variant_slug)
    variant.value = item || null
    
}

onMounted(() => getProduct())

watch(() => route.params, () => getProduct())

</script>

<template>
    <main>

        <template v-if="variant">
            <section class="px-3 md:px-8 lg:px-12 py-10">
                <div class="flex flex-wrap md:justify-between">
                    <div class="w-full md:w-6/12">
                        <DetailSlider :images="(variant.images as Image[])" />
                    </div>

                    <div class="w-full md:w-5/12">
                        <DetailVariant :product="productDetail as ProductType" :variant="variant" />
                    </div>
                </div>
            </section>
        </template>

    </main>
</template>