<script setup lang="ts">
import { Category } from '@/services/api';
import { addCategory } from '@/stores/admin/category/addCategory';
import type { postCategory } from '@/types/database.type';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const store = addCategory()

const { parentId, refetch } = storeToRefs(store)

const { SET_IS_MODAL_OPEN, SET_REFETCH } = store

const categoryName: Ref<string> = ref('')
const categoryOrder: Ref<number> = ref(0)

const handleAddCategory = async () => {
    const obj: postCategory = {
        name: categoryName.value,
        order: categoryOrder.value,
        parentId: parentId.value !== '' ? parentId.value : undefined
    }

    const result = await Category.create(obj)

    if (!result) {
        toast.error("Category create is failed")
        return
    }

    toast.success("Category is created successfully")

    SET_REFETCH(!refetch.value)
    SET_IS_MODAL_OPEN(false)
    categoryName.value = ''
    categoryOrder.value = 0
    parentId.value = ''
}

</script>

<template>
    <div class="pt-2">
        <div class="mb-4">
            <label for="name">Category name <span class="text-red-500">*</span></label>
            <input type="text" id="name" v-model="categoryName" name="name" placeholder="Category name">
        </div>
        <div class="mb-4">
            <label for="order">Category order <span class="text-red-500">*</span></label>
            <input type="number" id="order" v-model="categoryOrder" name="order" placeholder="Category order">
        </div>
        <template v-if="parentId">
            <div class="mb-4">
                <label for="parentId">Category parentId</label>
                <p class="input bg-white min-h-9">{{ parentId }}</p>
            </div>
        </template>
        <div>
            <button @click="handleAddCategory" class="block py-3 rounded-md w-full bg-gray-500 text-gray-50">
                Add Category
            </button>
        </div>
    </div>
</template>


<style scoped>
label {
    display: block;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    padding-left: 10px;
    margin-bottom: 2px;
}

input,
.input {
    display: block;
    width: 100%;
    padding: 6px 12px;
    border-radius: 6px;
    outline: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>