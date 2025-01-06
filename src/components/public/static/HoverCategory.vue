<script setup lang="ts">
import { Category } from '@/services/api';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps<{
    categoryCache: any
}>()

const categories: Ref<any> = ref([])

const emit = defineEmits(["get-categories", "toggle-hover"])

const getData = async () => {
    if (props.categoryCache.length) {
        categories.value = props.categoryCache
        return
    }

    const result = await Category.nested();
    if (!result) return;
    categories.value = result;
    emit('get-categories', result)
};

onMounted(() => getData())

</script>

<template>
    <div @mouseenter="() => $emit('toggle-hover', true)" @mouseleave="() => $emit('toggle-hover', false)" class="fixed hidden top-[60px] left-0 right-0 h-[80vh] bg-[#e2e2e2] md:flex z-[999]">
        <div class="w-full hv:w-9/12 bg-white p-[42px]">
            <div class="relative">
                <span class="absolute top-[50%] -translate-y-[50%] right-5">
                    <MagnifyingGlassIcon class="w-5 h-5 text-black" />
                </span>
                <input type="text" placeholder="Search Product" class="py-3 px-5 block text-[14px] w-full rounded-md bg-[#f0f0f0] mb-4">
            </div>
            <div class="flex flex-wrap">
                <template v-if="categories.length">
                    <div v-for="item in categories" :key="item._id" class="w-3/12 px-1 mb-4">
                        <h2 class="mb-2 font-bold text-[14px]">
                            <RouterLink to="/">
                                {{ item.name }}
                            </RouterLink>
                        </h2>
                        <ul>
                            <template v-if="item.children?.length">
                                <li v-for="cat in item.children" class="py-1 text-[13px] duration-300 hover:text-[#666] hover:underline text-[#999]" :key="cat._id">
                                    <RouterLink to="/">
                                        {{ cat.name }}
                                    </RouterLink>
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
        <div class="hidden hv:block hv:w-3/12 p-[42px]">
            <div class="flex flex-col h-full xl:justify-between">
                <div class="mb-10 hidden xl:block">
                    <img :src="'https://res.cloudinary.com/djlix30nq/image/upload/v1736158702/uploads/1736158701745-nav-new-fa24e.jpg.jpg'" class="w-full object-cover rounded-md" alt="image">
                </div>
                <div class="flex hv:flex-col xl:flex-row xl:items-center hv:justify-between hv:h-full">
                    <div class="xl:w-6/12 xl:pr-2 h-[49%] xl:h-auto  overflow-hidden">
                        <img :src="'https://res.cloudinary.com/djlix30nq/image/upload/v1736158799/uploads/1736158798510-nav-biz-shirt-sp24b.jpg.jpg'" class="w-full h-full object-cover rounded-md" alt="image">
                    </div>
                    <div class="xl:w-6/12 xl:pl-2 h-[49%] xl:h-auto overflow-hidden">
                        <img :src="'https://res.cloudinary.com/djlix30nq/image/upload/v1736158848/uploads/1736158847860-nav-cards-w24a.jpg.jpg'" class="w-full h-full object-cover rounded-md" alt="image">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>