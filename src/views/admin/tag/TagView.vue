<script setup lang="ts">
import DeleteModal from '@/components/admin/delete_confirm/DeleteModal.vue';
import { Tag } from '@/services/api';
import type { tag, postTag } from '@/types/database.type';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const data: Ref<tag[]> = ref([])

const createName: Ref<string> = ref('')

const modalFlag: Ref<boolean> = ref(false)

const deleteId: Ref<string> = ref('')

const editName: Ref<string> = ref('')
const editId: Ref<string> = ref('')

const refetch: Ref<boolean> = ref(false)

const getData = async () => {
    const result = await Tag.tags()

    data.value = result
}

const handleCreate = async () => {
    if (createName.value.length === 0) {
        toast.error("Tag name is required")
        return
    }

    const obj: postTag = {
        name: createName.value
    }

    const result = await Tag.create(obj)

    if (!result) {
        toast.error("Tag create is failed")
        return
    }

    toast.success("Tag is created successfully")
    createName.value = ''
    refetch.value = !refetch.value
}

const handleModalDelete = (id : string) => {
    deleteId.value = id
    modalFlag.value = true
}

const closeModal = () => {
    modalFlag.value = false
}

const handleDelete = async (id: string) => {
    const result = await Tag.deleteTag(id)

    if (!result) {
        toast.error("Tag delete is failed")
        return
    }

    toast.success("Tag deleted is successfully")

    refetch.value = !refetch.value
    modalFlag.value = false
}

const handleUpdate = async () => {
    if (editName.value.length === 0 || editId.value.length === 0) {
        toast.error("Name and id are required")
        return
    }

    const obj: postTag = {
        name: editName.value
    }

    const result = await Tag.update(editId.value, obj)

    if (!result) {
        toast.error("Tag update is failed")
        return
    }

    toast.success("Tag is updated successfully")

    editId.value = ''
    editName.value = ''
    refetch.value = !refetch.value
}

onMounted(() => {
    getData()
})

watch(() => refetch.value, () => getData())
</script>

<template>
    <DeleteModal @close-modal="closeModal" @confirm="handleDelete" :product-id="deleteId" :item="modalFlag" />
    <main class="min-h-[91.8vh] p-5 h-full bg-gray-800">
        <div>
            <h1 class="text-center text-gray-50 text-[32px] font-medium">Tags</h1>
        </div>
        <div class="flex pt-6">
            <div class="w-6/12 flex justify-center">
                <div class="w-full max-w-md">
                    <template v-if="data.length > 0">
                        <div v-for="(tag, index) in data" :key="tag._id"
                            class="flex mb-4 px-4 py-2 rounded-md bg-gray-500 justify-between items-center">
                            <p class="text-gray-50 text-[18px]">
                                {{ index + 1 + ') ' + tag.name }}
                            </p>
                            <button @click="() => handleModalDelete(tag._id as string)"
                                class="py-2 px-5 text-white bg-red-600 rounded-md">
                                Delete
                            </button>
                        </div>
                    </template>
                </div>
            </div>
            <div class="w-6/12 flex flex-col gap-32 items-center justify-center">
                <div class="w-72">
                    <div class="mb-6">
                        <label for="name">Tag name <span class="text-red-500">*</span></label>
                        <input v-model="createName" placeholder="Tag name" type="text" id="name" name="name"
                            class="block w-full">
                    </div>
                    <button @click="handleCreate" class="block w-full rounded-md bg-gray-500 text-white py-2">
                        Add Tag
                    </button>
                </div>
                <div class="w-72">
                    <div class="mb-2">
                        <label for="tag">Tag<span class="text-red-500">*</span></label>
                        <select name="tag" v-model="editId" id="tag">
                            <option value="">Select e tag</option>
                            <template v-if="data.length > 0">
                                <option v-for="tag in data" :key="tag._id" :value="tag._id">{{ tag.name }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="newName">Tag new name <span class="text-red-500">*</span></label>
                        <input type="text" v-model="editName" placeholder="Tag name" id="newName" name="newName">
                    </div>
                    <button @click="handleUpdate" class="block w-full rounded-md bg-gray-500 text-white py-2">
                        Edit Tag
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
label {
    display: block;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    padding-left: 10px;
}

input,
select {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
}
</style>