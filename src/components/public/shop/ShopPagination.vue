<script setup lang="ts">

const props = defineProps<{
    total: number;
    page: number;
    limit: number;
    totalPages : number;
}>()

const emit = defineEmits(['set-page'])

const handleChangePage = (arg : number) => {
    emit('set-page', arg)
}

const handlePlusMinus = (arg : number) => {
    let setPage = props.page + arg

    emit('set-page', setPage)
}

</script>

<template>
    <div class="flex justify-center pt-4 border-t border-[#757575] gap-5 items-center w-full">
        <button @click="() => handlePlusMinus(-1)" :disabled="page === 1">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                stroke-linejoin="round" class="w-4">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <div class="flex items-center gap-3">
            <button class="text-[18px] text-[#757575]" @click="() => handleChangePage(index + 1)" v-for="(_, index) in totalPages" :key="index + 1"
                :class="{ '!text-black': (index + 1) === page }">
                {{ index + 1 }}
            </button>
        </div>
        <button @click="() => handlePlusMinus(1)" :disabled="page === totalPages">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                stroke-linejoin="round" class="w-4">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    </div>
</template>