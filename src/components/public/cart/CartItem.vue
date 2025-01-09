<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import QuantityItem from '@/components/public/cart/QuantityItem.vue'
import CartArrow from '@/static/icon/CartArrow.vue'
import { Cart } from '@/services/api';
import { cartStore } from '@/stores/public/Cart.store';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import type {cartListItem, addCartType} from '@/types/cart.types'
import type {ProductVariant} from '@/types/database.type'

const props = defineProps<{
    item: cartListItem
}>()

const router = useRouter()

const toast = useToast()

const variant: Ref<ProductVariant | null> = ref(null)
const specs: Ref<string[]> = ref([])

const quantity: Ref<number> = ref(props.item.count)

const basketStore = cartStore()

const { refetch_basket } = storeToRefs(basketStore)

const { SET_REFETCH_BASKET } = basketStore

const getVariant = () => {
    const foundVariant = props.item.productId.variants.find((item: ProductVariant) => item._id === props.item.variantId);
    variant.value = foundVariant || null;

    specs.value = foundVariant ? Object.values(foundVariant.specs) : [];
}

const update = async () => {
    let obj: addCartType = {
        list: {
            productId: props.item.productId._id as string,
            variantId: props.item.variantId as string,
            count: quantity.value
        }
    }

    let result = await Cart.update(obj)

    if (!result) {
        toast.error("Update is failed")
        return
    }
    toast.success("Update is successfullly")
    SET_REFETCH_BASKET(!refetch_basket.value)
}

const changeQuantity = (num: number) => {
    quantity.value = num
}

const deleteItem = async () => {
    let result = await Cart.deleteCart(props.item._id)

    if (!result) {
        toast.error("Order delete is failed")
        return
    }

    toast.success("Order deleted is successfully")
    SET_REFETCH_BASKET(!refetch_basket.value)
}

const changeCount = (arg: number) => {
    if (quantity.value === 1 && arg === -1) {
        deleteItem()
        return
    }

    quantity.value += arg
}

const quantityFlag = ref(false)

const closeAccordion = () => {
    quantityFlag.value = false
}

const goDetail = () => {
    router.push(`/detail/${props.item.productId.slug}/${variant.value?.slug}`)
}

onMounted(() => getVariant())

watch(() => quantity.value, () => update())

</script>

<template>
    <div class="flex py-4 border-b ">
        <template v-if="variant">
            <div class="w-2/12">
                <img @click="goDetail" class="w-full object-cover cursor-pointer" :src="typeof variant.images[0] === 'string' ? variant.images[0] : variant.images[0].url"  alt="Image">
            </div>
            <div class="w-10/12 pl-3 flex flex-col md:flex-row justify-between">
                <div>
                    <p class="text-[#111] text-[14px]">{{ item.productId.title }}</p>
                    <div>
                        <ul class="flex items-center">
                            <li class="text-sm text-[#999]" v-for="(spec, index) in specs"
                                :class="{ 'pr-1': (index === 0), 'pl-1': (index === 1) }">{{
                                    spec }}</li>
                        </ul>
                    </div>
                    <p class="text-[#757575] hidden md:block md:pt-3 text-[14px]">
                        <template v-if="item.discount === 0">
                            <span>${{ item.count * item.price }}</span>
                        </template>

                        <template v-else>
                            <span class="text-red-600 line-through pr-2">${{ item.count * item.price }}</span>
                            <span>${{ item.count * (item.price - item.discount) }}</span>
                        </template>
                    </p>
                </div>
                <div class="hidden md:block md:w-3/12">
                    <div class="flex flex-wrap justify-between">
                        <button @click="() => changeCount(-1)" 
                            class="rounded-ss rounded-es hover:opacity-100 duration-300 bg-black text-[1.45rem] text-white opacity-[.25] py-[0.1rem] w-[49%]">-</button>
                        <button @click="() => changeCount(1)"
                            class="rounded-se rounded-ee hover:opacity-100 duration-300 bg-black text-[1.45rem] text-white opacity-[.25] py-[0.1rem] w-[49%]">+</button>
                        <p class="w-full text-end text-[#757575] text-[13px] pt-3">
                            Qty: {{ item.count }}
                        </p>
                    </div>
                </div>
                <div class="w-full flex md:hidden justify-between items-center">
                    <div class="flex gap-2">
                        <div class="border border-[#ddd] cursor-pointer relative p-1 w-[50px]">
                            <div @click="() => quantityFlag = !quantityFlag">
                                <span class="absolute right-[-4px] top-[50%] -translate-y-[50%]">
                                    <CartArrow />
                                </span>
                                <p class="text-[12px]">
                                    {{ quantity }}
                                </p>
                            </div>
                            <QuantityItem :stock="variant.stock" @change-quantity="changeQuantity"
                                @close-accordion="closeAccordion" :flag="quantityFlag" />
                        </div>
                        <div>
                            <button @click="deleteItem"
                                class="text-[#757575] bg-[#eee] px-2 py-1 text-[12px]">Remove</button>
                        </div>
                    </div>
                    <div>
                        <p class="text-[#757575] text-[14px]">
                            <template v-if="item.discount === 0">
                                <span>${{ item.count * item.price }}</span>
                            </template>

                            <template v-else>
                                <span class="text-red-600 line-through pr-2">${{ item.count * item.price }}</span>
                                <span>${{ item.count * (item.price - item.discount) }}</span>
                            </template>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>