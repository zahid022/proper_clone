<script setup lang="ts">
import type { getOrderList, Image } from '@/types/database.type';


const props = defineProps<{
    list : getOrderList
}>()

</script>

<template>
    <div class="border border-[#e2e2e2] p-3 mb-4 rounded">
        <div class="flex gap-3">
            <RouterLink :to="`/detail/${list.product.slug}/${list.variant.slug}`" class="w-[100px] block">
                <img class="w-full h-full" :src="(list.variant.images[0] as Image).url" alt="">
            </RouterLink>
            <div>
                <p class="text-[#444] text-[16px]">{{ list.product.title }}</p>
                <span class="block text-[#757575] text-[14px]">Color : {{ list.variant.specs.color }}</span>
                <span class="block text-[#757575] text-[14px]">Size : {{ list.variant.specs.size }}</span>
            </div>
        </div>
    </div>
</template>