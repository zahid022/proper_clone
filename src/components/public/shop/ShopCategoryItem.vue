<script setup lang="ts">
import type { category } from '@/types/database.type';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const props = defineProps<{
    item: category
}>()

const dropFlag: Ref<boolean> = ref(false)

const changeFlag = () => {

    if (!route.query.category) {
        dropFlag.value = false
        return
    }

    let category: string = route.query.category as string

    let categoryArr = category.split(',')

    let flag = categoryArr.includes(props.item.slug)

    dropFlag.value = flag
}

const changeSlug = (slug: string) => {

    const existingCategory = route.query.category;
    let categoryArray = existingCategory
        ? String(existingCategory).split(',')
        : [];
    
    if (categoryArray.includes(slug)) {
        return

    } else {
        categoryArray.push(slug);
    }

    router.push({
        path: route.path,
        query: {
            category: categoryArray.length ? categoryArray.join(',') : undefined,
        },
    });
};

onMounted(() => changeFlag())

watch(() => route.query, () => changeFlag())

</script>

<template>
    <div class="text-[#757575] py-1 text-[14px]">
        <button :class="{'underline' : dropFlag}" @click="() => changeSlug(item.slug)">
            {{ item.name }}
        </button>

        <template v-if="item.children && item.children?.length > 0">
            <div :class="{ 'invisible h-0': !dropFlag, 'visible h-auto duration-300': dropFlag }">
                <div class="p-2">
                    <ShopCategoryItem v-for="child in item.children" :item="child" />
                </div>
            </div>
        </template>
    </div>
</template>