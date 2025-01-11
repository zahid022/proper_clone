<script setup lang="ts">
import type {ProductVariant } from '@/types/database.type';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps<{
    item: ProductVariant;
    flag : boolean;
}>()

const price : Ref<number> = ref(0)

const sumPrice = () => {
    if(props.item.discount){
        if(props.item.discountType === 'percentage'){
            price.value = props.item.price - ((props.item.price * props.item.discount) / 100)
        }else{
            price.value = props.item.price - props.item.discount
        }
    }else{
        price.value = props.item.price
    }
}   

onMounted(() => sumPrice())

</script>

<template>
    <div class="px-2 mb-4 w-6/12" :class="{'md:!w-4/12 lg:md:!w-3/12' : !flag, 'md:!w-3/12 lg:!w-[20%]' : flag}">
        <RouterLink class="cursor-pointer div" :to="`/detail/${item.product_slug}/${item.slug}`">
            <div>
                <img class="w-full" :src="typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url" alt="product image">
            </div>
            <div class="pt-3">
                <p class="text-[#333] text-[13px] mb-1">{{ item.product_name }}</p>
                <div class="flex items-center text-[12px] gap-1" v-if="item.discount">
                    <p class="text-red-500 line-through">${{ item.price }}</p>
                    <p class="text-[#555]">${{ price }}</p>
                </div>
                <p class="text-[#555] text-[12px]" v-else>${{ price }}</p>
                <p class="text-[#757575] text-[12px] capitalize pt-1">{{ item.specs.color }}</p>
            </div>
        </RouterLink>
    </div>
</template>