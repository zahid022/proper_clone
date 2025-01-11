<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    flag: boolean;
}>()

const router = useRouter()

const value: Ref<string> = ref('')

const emit = defineEmits(['set-search-flag'])

const handleSearch = () => {
    if (value.value.length === 0) {
        return
    }

    router.push({
        path: '/shop',
        query: {
            q: value.value
        }
    })

    emit('set-search-flag', false)
}

</script>

<template>
    <div @click="() => $emit('set-search-flag', false)"
        class="fixed hidden md:block bg-[#00000080] top-[60px] left-0 right-0 bottom-0 z-[999]">
        <div @click="(e) => e.stopPropagation()" class="flex duration-300">
            <div class="md:px-8 md:w-9/12 lg:px-12 py-10 bg-white">
                <div class="relative">
                    <input v-model="value" @keyup.enter="handleSearch" type="text"
                        class="block w-full px-3 py-[10px] rounded bg-[#F0F0F0]" placeholder="Search Products">
                    <MagnifyingGlassIcon class="h-5 w-5 text-black absolute right-3 top-[50%] -translate-y-[50%]" />
                </div>
            </div>
            <div class="md:px-8 md:w-3/12 lg:px-12 py-10 bg-[#E2E2E2]">
                <p class="font-medium text-[14px]">Trending</p>
                <ul class="flex flex-wrap gap-1">
                    <li class="text-[#777] text-[13px] underline">
                        <RouterLink to="/shop?category=shirts">Shirts,</RouterLink>
                    </li>
                    <li class="text-[#777] text-[13px] underline">
                        <RouterLink to="/shop?category=suits">Suits,</RouterLink>
                    </li>
                    <li class="text-[#777] text-[13px] underline">
                        <RouterLink to="/shop?category=pants">Pants,</RouterLink>
                    </li>
                    <li class="text-[#777] text-[13px] underline">
                        <RouterLink to="/shop?category=sweaters">Sweaters</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>