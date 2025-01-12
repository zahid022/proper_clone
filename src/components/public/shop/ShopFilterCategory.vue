<script setup lang="ts">
import type { category } from '@/types/database.type';
import {ref, type Ref } from 'vue';

const props = defineProps<{
    item: category
}>()

const emit = defineEmits(['add-slug'])

const dropFlag: Ref<boolean> = ref(false)

const changeFlag = () => {
    dropFlag.value = true

    emit('add-slug', props.item.slug)

}

</script>

<template>
    <div class="text-[#757575] py-1 text-[14px]">
        <button :class="{'underline' : dropFlag}" @click="() => changeFlag()">
            {{ item.name }}
        </button>

        <template v-if="item.children && item.children?.length > 0">
            <div :class="{ 'invisible h-0': !dropFlag, 'visible h-auto duration-300': dropFlag }">
                <div class="p-2">
                    <ShopFilterCategory @add-slug="$emit('add-slug', $event)" v-for="child in item.children" :item="child" />
                </div>
            </div>
        </template>
    </div>
</template>