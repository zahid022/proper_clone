<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { Category } from '@/services/api';
import UserBlackIcon from '@/static/icon/UserBlackIcon.vue'
import AccountBlackIcon from '@/static/icon/AccountBlackIcon.vue'
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { sidebarMenuTrigger } from '@/stores/public/Sidebar.store';
import { storeToRefs } from 'pinia';
import { getUser } from '@/stores/user.store';
import type { category } from '@/types/database.type';
import { useRouter } from 'vue-router';

const props = defineProps<{
    categoryCache: category[]
}>()

const emit = defineEmits(["get-categories"])

const value: Ref<string> = ref('')
const router = useRouter()

const categories: Ref<category[]> = ref([]);
const currentCategory: Ref<category | null> = ref(null);

const userStore = getUser()

const { user } = storeToRefs(userStore)

const { SIGN_OUT } = userStore

const sidebarStore = sidebarMenuTrigger()

const { SET_SIDEBAR_FLAG } = sidebarStore

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

const findCategoryById = (list: category[], id: string): category | null => {

    for (const item of list) {
        if (item._id === id) return item;
        if (item.children) {
            const found = findCategoryById(item.children, id);
            if (found) return found;
        }
    }
    return null;
};

const goBack = () => {
    if (currentCategory.value?.parentId) {
        const parentId = currentCategory.value.parentId;
        const parentCategory = findCategoryById(categories.value, parentId);
        currentCategory.value = parentCategory;
    } else {
        currentCategory.value = null;
    }
};

const buildCategoryPath = (category: category | null): string => {
    if (!category) return '';
    const parentCategory = findCategoryById(categories.value, category.parentId as string);
    return parentCategory
        ? `${buildCategoryPath(parentCategory)},${category.slug}` 
        : category.slug;
};

const handleCategoryClick = (category: category) => {
    if (!category.children || category.children.length === 0) {
        const categoryPath = buildCategoryPath(category); 

        SET_SIDEBAR_FLAG(false); 
        router.push({
            path: '/shop',
            query: {
                category: categoryPath,
            },
        });

        return;
    }

    currentCategory.value = category;
};

const handleSearch = () => {
    if(value.value.length === 0){
        return
    }

    router.push({
        path: '/shop',
        query: {
            q: value.value
        }
    })

    SET_SIDEBAR_FLAG(false)
}

onMounted(() => getData())
</script>

<template>
    <div class="max-w-[400px] duration-300 w-full bg-white z-[999] md:hidden fixed top-[60px] left-0 bottom-0">
        <div class="p-4 h-full relative">
            <template v-if="currentCategory">
                <button @click="goBack" class="text-[#888] mb-4 flex items-center gap-1">
                    <ChevronLeftIcon class="w-4 h-4" />
                    <span>Back</span>
                </button>
            </template>

            <template v-if="!currentCategory">
                <div class="relative mb-4">
                    <button @click="handleSearch" class="absolute top-[50%] -translate-y-[50%] right-3">
                        <MagnifyingGlassIcon class="w-4 h-4 text-black" />
                    </button>
                    <input v-model="value" type="text" class="block w-full py-[13px] text-sm px-3 rounded-[4px] bg-[#f0f0f0]"
                        placeholder="Search product" />
                </div>
            </template>

            <div class="relative overflow-hidden">
                <ul v-if="!currentCategory">
                    <li v-for="category in categories" :key="category._id" @click="handleCategoryClick(category)"
                        class="py-2 flex cursor-pointer text-[#333] items-center justify-between">
                        <span>
                            {{ category.name }}
                        </span>
                        <template v-if="category.children">
                            <span>
                                <ChevronRightIcon class="w-4 h-4 text-[#888]" />
                            </span>
                        </template>
                    </li>
                </ul>

                <ul v-if="currentCategory">
                    <li class="uppercase py-2">shop all {{ currentCategory.name }}</li>
                    <li v-for="child in currentCategory.children" :key="child._id" @click="handleCategoryClick(child)"
                        class="py-2 cursor-pointer flex text-[#333] items-center justify-between">
                        <span>
                            {{ child.name }}
                        </span>
                        <template v-if="child.children">
                            <span>
                                <ChevronRightIcon class="w-4 h-4 text-[#888]" />
                            </span>
                        </template>
                    </li>
                </ul>
            </div>

            <template v-if="!currentCategory">

                <div class="absolute left-4 bottom-0 right-4 border-t border-[#333] py-4">

                    <template v-if="'_id' in user && user._id">
                        <div class="flex justify-between items-center">
                            <button @click="() => SET_SIDEBAR_FLAG(false)">
                                <RouterLink to="/account" class="flex gap-2 items-center">
                                    <AccountBlackIcon />
                                    <p class="uppercase font-bold text-[13px]">Account</p>
                                </RouterLink>
                            </button>
                            <button @click="SIGN_OUT" class="text-[#888] text-[13px]">
                                Sign out
                            </button>
                        </div>
                    </template>

                    <template v-else>
                        <button @click="() => SET_SIDEBAR_FLAG(false)">
                            <RouterLink to="/login" class="flex gap-2 items-center">
                                <UserBlackIcon />
                                <p class="uppercase font-bold text-[13px]">Sign in</p>
                            </RouterLink>
                        </button>
                    </template>

                </div>

            </template>
        </div>
    </div>
</template>