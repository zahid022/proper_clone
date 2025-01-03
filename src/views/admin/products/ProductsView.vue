<script setup lang="ts">
import AddVariantModal from '@/components/admin/products/AddVariantModal.vue';
import { product } from '@/services/api';
import { addProduct } from '@/stores/admin/product/AddProduct';
import { addVariant } from '@/stores/admin/product/AddVariant';
import AddProductModal from '@/components/admin/products/AddProductModal.vue'
import type { ProductType } from '@/types/database.type';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch, type Ref } from 'vue';
import DeleteModal from '@/components/admin/delete_confirm/DeleteModal.vue';
import { useToast } from 'vue-toastification';

const data: Ref<ProductType[]> = ref([])
const localProductId: Ref<string> = ref('')
const deleteProductId: Ref<string> = ref('')

const addProductStore = addProduct()

const { refetch } = storeToRefs(addProductStore)

const { SET_PRODUCT_CHECK, SET_REFETCH } = addProductStore

const isModal_open: Ref<boolean> = ref(false)

const toast = useToast()

const deleteProduct = async () => {
    const result = await product.deleteProduct(deleteProductId.value)

    if (!result) {
        toast.error("Product deleted is failed")
        return
    }

    toast.success("Product deleted is successfully")

    SET_REFETCH(!refetch.value)
    isModal_open.value = false
}

const closeDeleteModal = () => {
    isModal_open.value = false
}

const openDeleteModal = (id :string) => {
    deleteProductId.value = id
    isModal_open.value = true
}

const getData = async () => {
    const result = await product.getProducts()
    data.value = result.products
}

onMounted(() => {
    getData()
})

const addVariantStore = addVariant()

const { SET_MODAL_CHECK, SET_CURRENT_PRODUCT } = addVariantStore

const showAddVariantModal = (id: string) => {
    localProductId.value = id
}

const getById = async () => {
    const result: ProductType = await product.getByIdProduct(localProductId.value)
    SET_CURRENT_PRODUCT(result)
    if (result) SET_MODAL_CHECK(true)
}

watch(() => refetch.value, () => getData())
watch(() => localProductId.value, () => getById())

</script>

<template>
    <AddProductModal />
    <AddVariantModal />
    <DeleteModal @confirm="deleteProduct" @closeModal="closeDeleteModal" :product-id="deleteProductId" :item="isModal_open" />
    <main class="min-h-[91.8vh] p-5 h-full bg-gray-800">
        <div class="relative z-[900] mb-8">
            <button @click="() => SET_PRODUCT_CHECK(true)"
                class="absolute top-0 right-2 bg-lime-600 text-gray-50 px-6 py-3 rounded-md">
                Add Product
            </button>
            <h1 class="text-3xl mb-5 text-center text-white">All Product</h1>
        </div>
        <table>
            <thead>
                <tr class="text-white bg-gray-700">
                    <th class="w-[5%]">#</th>
                    <th class="w-[10%]">Title</th>
                    <th class="w-[20%]">Categories</th>
                    <th class="w-[10%]">Variants</th>
                    <th class="w-[10%]">Price</th>
                    <th class="w-[10%]">Discount</th>
                    <th class="w-[15%]">Tags</th>
                    <th class="w-[20%]">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in data" class="text-white" :key="product._id">
                    <td class="w-[5%]">{{ index + 1 }}</td>
                    <td class="w-[10%]">{{ product.title }}</td>

                    <td class="w-[20%]">
                        <span v-for="(category, index) in product.categories" :key="category._id">
                            {{ category.name }}{{ index !== product.categories.length - 1 ? ", " : "" }}
                        </span>
                    </td>
                    <td class="w-[10%]">
                        {{ product?.variants?.length && product.variants.length > 0 ?
                            Object.values(product.variants[0].specs).join("-") : 'none' }}
                    </td>
                    <td class="w-[10%]">
                        {{ product?.variants?.length && product.variants.length > 0 ? product.variants[0].price : 0 }}
                    </td>
                    <td class="w-[10%]">
                        {{ product?.variants?.length && product.variants.length > 0 ? product.variants[0].discount : 0
                        }}
                    </td>
                    <td class="w-[15%]">
                        <span v-for="(tag, index) in product.tags" :key="tag._id">
                            {{ tag.name }}{{ index !== product.tags.length - 1 ? ", " : "" }}
                        </span>
                    </td>

                    <td class="w-[20%]">
                        <div class="flex items-center gap-3 justify-center">
                            <button @click="() => showAddVariantModal(product._id as string)"
                                class="bg-gray-500 px-3 py-1 rounded-md">Add
                                Variant</button>
                            <button class="bg-lime-600 px-3 py-1 rounded-md">Edit</button>
                            <button @click="() => openDeleteModal(product._id as string)" class="bg-red-600 px-3 py-1 rounded-md">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped>
table {
    width: 100%;
}

th {
    font-weight: 500;
    padding: 10px 0;
}

td {
    text-align: center;
    padding: 10px 0;
    font-weight: 400;
}

tr:nth-child(even) {
    background-color: #374151;
}
</style>