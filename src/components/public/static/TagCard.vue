<script setup lang="ts">

const props = defineProps<{
    item: any
}>();

</script>

<template>
    <div class="w-4/12 md:w-[20%] p-1"> 
        <div>
            <RouterLink :to="`/detail/${item.product_slug}/${item.slug}`">
                <img :src="item.images[0].url" alt="image" />
            </RouterLink>
        </div>
    </div>
</template>
