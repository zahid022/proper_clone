<script setup lang="ts">
const props = defineProps<{
    flag : boolean
}>()
</script>

<template>
    <div
    :class="{'visible' : flag, 'invisible' : !flag}"
    class="fixed bottom-0 left-0 right-0 top-[60px] duration-300 flex items-center justify-center opacity-[.45] bg-gray-500 z-[999]">
        <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black"></div>
    </div>
</template>

