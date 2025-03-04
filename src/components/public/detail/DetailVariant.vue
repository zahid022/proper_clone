<script setup lang="ts">

import SaveBlackIcon from '@/static/icon/SaveBlackIcon.vue'
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DetailSize from './DetailSize.vue';
import AccordionQuantity from '../static/AccordionQuantity.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { Cart } from '@/services/api';
import { useToast } from 'vue-toastification';
import { cartStore } from '@/stores/public/Cart.store';
import { storeToRefs } from 'pinia';
import type { productSpec, ProductType, ProductVariant, specValue } from '@/types/database.type';
import type { addCartType } from '@/types/cart.types';
import getToken from '@/utils/getToken';

const props = defineProps<{
    variant: ProductVariant,
    product: ProductType
}>()

const route = useRoute()
const router = useRouter()

const toast = useToast()

const colors: Ref<specValue[]> = ref([])
const sizes: Ref<specValue[]> = ref([])
const variants: Ref<ProductVariant[]> = ref([])

const currentVariant: Ref<ProductVariant | undefined> = ref()
const currentSize: Ref<string> = ref('')

const quantity: Ref<number> = ref(1)

const accordionFlag = ref(false)

const price = ref('')

const basketStore = cartStore()

const {refetch_basket} = storeToRefs(basketStore)

const {SET_REFETCH_BASKET} = basketStore

const getSpecs = () => {
    if (!props.product) {
        return
    }

    const variant_slug = route.params.variant_slug

    const color : productSpec | undefined = props.product.specs.find((item: productSpec) => item.key === 'color')
    const size : productSpec | undefined = props.product.specs.find((item: productSpec) => item.key === 'size')
    const vari : ProductVariant[] = props.product.variants.filter((item: ProductVariant) => item.specs.color === props.variant.specs.color)

    const selectedVariant = vari.find((item: ProductVariant) => item.slug === variant_slug)

    if (!selectedVariant || !selectedVariant.specs) {
        return;
    }
    
    currentSize.value = selectedVariant.specs.size

    if(color?.values){
        colors.value = color?.values 
    }

    if(size?.values){ 
        sizes.value = size.values
    }

    variants.value = vari

    if(props.variant.discount){
        if(props.variant.discountType === "percentage"){
            let sumPrice = (props.variant.price - ((props.variant.price * props.variant.discount) /100)).toFixed(2)
            price.value = sumPrice
        }else{
            let sumPrice = (props.variant.price - props.variant.discount).toFixed(2)
            price.value = sumPrice
        }
    }
}

const changeVariant = (index: number) => {
    let color = colors.value[index].key

    let variantSlug = props.product.variants.find((item: ProductVariant) => item.specs.color === color)

    router.push(`/detail/${props.product.slug}/${variantSlug?.slug}`)
}

const checkVariant = (size: string) => {
    let check : ProductVariant | undefined = variants.value.find((item: ProductVariant) => item.specs.size === size)
    
    router.push(`/detail/${props.product.slug}/${check?.slug}`)
    currentVariant.value = check
}

const chooseCount = (index: number) => {
    quantity.value = index
}

const toggleAccordion = (arg: boolean) => {
    accordionFlag.value = arg
}

const addFlagDisabled = ref(false)

const handleAddCart = async () => {
    addFlagDisabled.value = true
    const token = getToken()
    
    if(props.variant.stock < quantity.value){
        toast.error("Stock is out")
        addFlagDisabled.value = false
        return
    }

    if(!token){
        router.push({
            path : '/login'
        })
        return
    }

    let obj: addCartType = {
        list: {
            productId: props.product._id as string,
            variantId: props.variant._id as string,
            count: quantity.value
        }
    }
    
    const result = await Cart.update(obj)

    if(!result) {
        toast.error("Product add is failed")
        return
    }

    toast.success("Product added is successfully")
    addFlagDisabled.value = false
    SET_REFETCH_BASKET(!refetch_basket.value)
}

onMounted(() => getSpecs())

watch(() => route.params, () => getSpecs())

watch(() => currentSize.value, () => checkVariant(currentSize.value))

watch([() => props.product, () => props.variant], () => {
    getSpecs();
});

</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <p class="text-[#444] text-[22px] xl:text-[32px]">
                {{ product.title }}
            </p>
            <button>
                <SaveBlackIcon />
            </button>
        </div>

        <div class="mb-8">
            <span
            :class="{'!text-red-600 line-through' : props.variant.discount}" 
            class="text-[#555] text-[14px]">${{ variant.price }}</span>
            <span class="text-[#555] text-[14px] pl-2" :class="{'hidden' : !props.variant.discount}"> ${{ price }}</span>
        </div>

        <div class="mb-10">
            <template v-if="colors.length > 0">
                <p class="text-[#555] text-[14px] mb-4">{{ variant.specs.color }}</p>
                <div class="flex flex-wrap">
                    <div v-for="(color, index) in colors" :key="color._id" class="mr-[5px] mb-[5px]">
                        <span @click="() => changeVariant(index)"
                            :class="{ 'border-black': color.key === variant.specs.color, 'border-transparent hover:border-[#ddd]': color.key !== variant.specs.color }"
                            class="block w-11 h-11 border p-[3px] cursor-pointer rounded">
                            <img :src="color.value" alt="color image" class="w-full h-full">
                        </span>
                    </div>
                </div>
            </template>
        </div>

        <div class="mb-8">
            <p class="text-[24px] mb-4">Select your Size</p>
            <template v-if="sizes.length > 0">
                <div class="flex flex-wrap">
                    <div v-for="(size, index) in sizes" :key="size._id" class="mr-[5px] mb-[5px]">
                        <DetailSize @check-variant="checkVariant" :current-size="currentSize" :variants="variants"
                            :size="size" :color="variant.specs.color" />
                    </div>
                </div>
            </template>
        </div>

        <template v-if="currentVariant">
            <p class="mb-2 text-[#888] text-sm">
                Stock in {{ currentVariant.stock }}
            </p>
        </template>

        <div class="flex mb-6">
            <div class="w-10/12 pr-2">
                <button :disabled="addFlagDisabled" @click="handleAddCart" class="bg-black text-white block w-full py-3 rounded">Add to Bag</button>
            </div>
            <div class="w-2/12 pl-2">
                <template v-if="currentVariant">
                    <div class="border border-black rounded cursor-pointer relative h-[50px]">
                        <span @click="() => toggleAccordion(!accordionFlag)"
                            class="flex h-full w-full pl-2 items-center">
                            {{ quantity }}
                        </span>
                        <div :class="{ 'hidden': !accordionFlag, 'block': accordionFlag }"
                            class="absolute top-full left-0 right-0 h-[200px] element overflow-y-auto shadow-lg">
                            <AccordionQuantity v-for="(_, index) in currentVariant.stock"
                                @toggle-accordion="toggleAccordion" @choose-count="chooseCount" :quantity="quantity"
                                :index="index" :key="index" />
                        </div>
                        <ChevronDownIcon :class="{ 'rotate-[180deg]': accordionFlag }"
                            class="w-4 duration-300 h-4 text-black absolute right-2 top-[55%] -translate-y-[50%]" />
                    </div>
                </template>
            </div>
        </div>

        <div>
            <h3 class="text-[#777] text-[15px] mb-4">Description</h3>
            <p class="text-[#999] text-[13px]">{{ props.product.description }}</p>
        </div>
    </div>
</template>

<style scoped>
.element::-webkit-scrollbar {
    display: none;
}
</style>