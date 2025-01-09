<script setup lang="ts">
import type { ProductVariant } from '@/types/database.type';


const props = defineProps<{
    item: ProductVariant
}>();

</script>

<template>
    <div class="w-4/12 md:w-[20%] p-1"> 
        <div>
            <RouterLink :to="`/detail/${item.product_slug}/${item.slug}`">
                <img :src="typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url" alt="image" />
            </RouterLink>
        </div>
    </div>
</template>
