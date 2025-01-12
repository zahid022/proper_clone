<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits(['set-search-flag'])

const value: Ref<string> = ref('')

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
        class="fixed left-0 bottom-0 right-0 top-[60px] bg-[#00000080] z-[999]">
        <div @click="(e) => e.stopPropagation()" class="px-3 md:px-8 py-5 bg-white">
            <div class="relative">
                <input v-model="value" class="block w-full py-[10px] h-full px-3 "
                    placeholder="Search Products..." type="text">
                <button @click="handleSearch" class="absolute right-0 px-3 top-[50%] -translate-y-[50%]">
                    <MagnifyingGlassIcon class="w-5 h-5 text-black " />
                </button>
            </div>
        </div>
    </div>
</template>