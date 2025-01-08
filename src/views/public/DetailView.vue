<script setup lang="ts">
import { product } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailSlider from '@/components/public/detail/DetailSlider.vue'
import DetailVariant from '@/components/public/detail/DetailVariant.vue';

const route = useRoute()

const productDetail: Ref<any> = ref(null)

const variant: Ref<any> = ref(null)

const getProduct = async () => {
    const slug = route.params.product_slug
    let result = await product.getBySlug(slug as string)

    if (!result) {
        return
    }

    productDetail.value = result

    showVariant(result)
}

const showVariant = (arg: any) => {
    const item = arg.variants.find((item: any) => item.slug === route.params.variant_slug)

    variant.value = item
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
                        <DetailSlider :images="variant.images" />
                    </div>
                    <div class="w-full md:w-5/12">
                        <DetailVariant :product="productDetail" :variant="variant" />
                    </div>
                </div>
            </section>
        </template>

    </main>
</template>