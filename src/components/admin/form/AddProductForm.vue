<script setup lang="ts">
import { Category, Tag, image, product } from '@/services/api';
import { addProduct } from '@/stores/admin/product/AddProduct';
import type { category, productSpec, postProduct, tag, Image } from '@/types/database.type';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const store = addProduct()

const { refetch } = storeToRefs(store)

const { SET_REFETCH, SET_PRODUCT_CHECK } = store

const title: Ref<string> = ref('')
const description: Ref<string> = ref('')
const detailValue: Ref<string> = ref('')
const specKey: Ref<string> = ref('')
const specValues: Ref<{ [key: string]: string }> = ref({});

const specValueName: Ref<string> = ref('')

const categoryData: Ref<category[]> = ref([])
const tagData: Ref<tag[]> = ref([])

const multipleCategory: Ref<category[]> = ref([])
const multipleTag: Ref<tag[]> = ref([])
const multipleDetail: Ref<string[]> = ref([])
const multipleSpec: Ref<productSpec[]> = ref([])

const specKeys: Ref<string[]> = ref([])

const getCategory = async () => {
    const response = await Category.categories()
    if (response) {
        categoryData.value = response
    }
}

const getTag = async () => {
    const response = await Tag.tags()
    if (response) {
        tagData.value = response
    }
}

const handleCategory = (event: Event) => {
    const target = event.target as HTMLSelectElement;

    const checkCategory: category | undefined = categoryData.value.find(
        item => item._id?.toString() === target.value
    );

    if (checkCategory) {
        if (multipleCategory.value.includes(checkCategory)) {
            multipleCategory.value = multipleCategory.value.filter(
                item => item !== checkCategory
            );
        } else {
            multipleCategory.value.push(checkCategory);
        }
    }
};

const handleTag = (event: Event) => {
    const target = event.target as HTMLSelectElement;

    const checkTag: tag | undefined = tagData.value.find(
        item => item._id?.toString() === target.value
    );

    if (checkTag) {
        if (multipleTag.value.includes(checkTag)) {
            multipleTag.value = multipleTag.value.filter(
                item => item !== checkTag
            );
        } else {
            multipleTag.value.push(checkTag);
        }
    }
};

const handleAddDetail = () => {
    if (multipleDetail.value.includes(detailValue.value)) {
        toast.error(`${detailValue.value} is exists`)
        return
    }

    multipleDetail.value.push(detailValue.value)
    detailValue.value = ''
}

const handleAddSpecKey = () => {
    if (specKeys.value.includes(specKey.value)) {
        toast.error("Spek key is exists")
        return
    }

    specKeys.value.push(specKey.value)

    specKey.value = ''
}

const handleAddSpecValue = (key: string) => {

    const item = key.toLowerCase();
    const name = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();

    const specValue = specValues.value[item]?.toLowerCase() || '';

    if (!specValueName.value) {
        specValueName.value = specValue.charAt(0).toUpperCase() + specValue.slice(1).toLowerCase();
    }

    let specValueExists = false;

    multipleSpec.value.forEach(element => {
        const checkKey = element.key.toString().toLowerCase() === item.toString();

        if (checkKey) {
            const checkValue = element.values.some(spec => {
                return spec.key.toString().toLowerCase() === specValue;
            });

            if (checkValue) {
                toast.error("Spec value already exists");
                specValueExists = true;
                return;
            } else {
                element.values.push({
                    key: specValue,
                    value: specValueName.value
                });
            }
            specValueName.value = ''
            specValueExists = true;
            return;
        }
    });

    specValues.value[item] = ''

    if (specValueExists) return;

    const obj: productSpec = {
        key: item,
        name,
        values: [
            {
                key: specValue,
                value: specValueName.value
            }
        ]
    };
    multipleSpec.value.push(obj);
    specValueName.value = ''
};

const handleDeleteCategory = (id: string) => {
    multipleCategory.value = multipleCategory.value.filter(item => item._id?.toString() !== id)
}

const handleDeleteTag = (id: string) => {
    multipleTag.value = multipleTag.value.filter(item => item._id?.toString() !== id)
}

const handleDeleteDetail = (name: string) => {
    multipleDetail.value = multipleDetail.value.filter(item => item.toLowerCase() !== name.toLowerCase())
}

const handleAddProduct = async () => {
    const category: string[] = []
    const tag: string[] = []

    multipleCategory.value.forEach(item => category.push(item._id as string))
    multipleTag.value.forEach(item => tag.push(item._id as string))

    const obj: postProduct = {
        title: title.value,
        categories: category,
        description: description.value,
        details: multipleDetail.value,
        specs: multipleSpec.value,
        tags: tag
    }

    const result = await product.addProduct(obj)

    if (!result) {
        toast.error("Product add is failed")
        return
    }

    toast.success("Product is created successfully")
    SET_REFETCH(!refetch.value)
    SET_PRODUCT_CHECK(false)
    title.value = ''
    multipleCategory.value = []
    description.value = ''
    multipleDetail.value = []
    multipleSpec.value = []
    multipleTag.value = []
}

const uploadValueImage = async (event : Event) => {
    const formData = new FormData()
    const input = event.target as HTMLInputElement;
    if (input.files) {
        formData.append("image", input.files[0])
        try {
            const result: Image | undefined = await image.uploadImage(formData)

            if (result) {
                specValueName.value = result.url
                toast.success("Image upload is successfully")
            }
            else {
                toast.error("Images upload is failed")
            }
        } catch {
            return
        }
    }
}

onMounted(() => {
    getCategory()
    getTag()
})

</script>

<template>
    <div>
        <div class="mb-4">
            <label for="title">Product title <span class="text-red-600">*</span></label>
            <input v-model="title" type="text" id="title" name="title" placeholder="Product title">
        </div>
        <div class="mb-4">
            <label for="category">Product categories <span class="text-red-600">*</span></label>
            <select name="category" @change="handleCategory" id="category">
                <option value="">Choose a category</option>

                <template v-if="categoryData.length > 0">
                    <option v-for="category in categoryData" :key="category._id" :value="category._id">
                        {{ category.name }}
                    </option>
                </template>

            </select>

            <template v-if="multipleCategory.length > 0">
                <div class="flex gap-3 flex-wrap py-3">
                    <div v-for="item in multipleCategory" :key="item._id">
                        <button @click="() => handleDeleteCategory(item._id as string)"
                            class="flex items-center gap-2 px-4 py-1 rounded-[50px] bg-gray-400 text-black">
                            <span>{{ item.name }}</span>
                            <XMarkIcon class="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>
            </template>

        </div>
        <div class="mb-4">
            <label for="tag">Product tags</label>
            <select name="tag" @change="handleTag" id="tag">
                <option value="">Choose a tag</option>

                <template v-if="tagData.length > 0">
                    <option v-for="tag in tagData" :key="tag._id" :value="tag._id">
                        {{ tag.name }}
                    </option>
                </template>

            </select>

            <template v-if="multipleTag.length > 0">
                <div class="flex gap-3 flex-wrap py-3">
                    <div v-for="item in multipleTag" :key="item._id">
                        <button @click="() => handleDeleteTag(item._id as string)"
                            class="flex items-center gap-2 px-4 py-1 rounded-[50px] bg-gray-400 text-black">
                            <span>{{ item.name }}</span>
                            <XMarkIcon class="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>
            </template>

        </div>
        <div class="mb-4">
            <label for="detail">Product detail</label>
            <div class="relative">
                <button @click="handleAddDetail"
                    class="bg-gray-500 hover:bg-gray-600 duration-300 text-gray-50 text-[14px] absolute top-0 bottom-0 right-0 rounded-ee-[4px] px-3 rounded-se-[4px]">
                    Add
                </button>
                <input v-model="detailValue" placeholder="Product detail" type="text" id="detail" name="detail" />
            </div>

            <template v-if="multipleDetail.length > 0">
                <ul class="pt-4">
                    <li v-for="item in multipleDetail" class="mb-2" :key="item">
                        <button @click="() => handleDeleteDetail(item)"
                            class="flex items-center gap-2 px-4 py-1 rounded-[50px] bg-gray-400 text-black">
                            <span>{{ item }}</span>
                            <XMarkIcon class="w-5 h-5 text-red-500" />
                        </button>
                    </li>
                </ul>
            </template>

        </div>
        <div class="mb-4">
            <label for="description">Product description <span class="text-red-600">*</span></label>
            <textarea v-model="description" id="description" name="description"
                placeholder="Product description"></textarea>
        </div>
        <div class="mb-4">
            <label for="specKey">Product spec key <span class="text-red-600">*</span></label>
            <div class="relative">
                <button @click="handleAddSpecKey"
                    class="bg-gray-500 hover:bg-gray-600 duration-300 text-gray-50 text-[14px] absolute top-0 bottom-0 right-0 rounded-ee-[4px] px-3 rounded-se-[4px]">
                    Add
                </button>
                <input v-model="specKey" placeholder="Product specKey" type="text" id="specKey" name="spec key" />
            </div>
        </div>

        <template v-if="specKeys.length > 0">
            <div v-for="(key, index) in specKeys" class="mb-4 flex flex-wrap justify-between" :key="key">
                <div class="w-[48%]">
                    <label for="specValue">Product {{ key }} key <span class="text-red-600">*</span></label>
                    <div class="relative">
                        <input type="text" v-model="specValues[key]" id="specValue" name="specValue"
                            :placeholder="`Product ${key} value`">
                    </div>
                </div>
                <div class="w-[48%] relative">
                    <label>Product {{ specValues[key] }} value <span class="text-red-600">*</span></label>
                    <div class="border border-gray-50 flex justify-center items-center h-10 rounded-md">

                        <template v-if="specValueName !== ''">
                            <div class="flex justify-center">
                                <img :src="specValueName" class="h-8 w-8 rounded-full overflow-hidden"
                                    alt="image">
                            </div>
                        </template>

                        <template v-else>
                            <input @change="uploadValueImage" type="file"
                                class="absolute opacity-0 cursor-pointer inset-0 block w-full">
                            <p class="text-[14px] text-gray-50">Upload</p>
                        </template>

                    </div>
                </div>

                <div class="w-full pt-3">
                    <button @click="() => handleAddSpecValue(key)"
                        class="bg-gray-400 hover:bg-gray-600 duration-300 text-gray-900 text-[14px] font-medium py-2 rounded-md block w-full">
                        Add {{ specValues[key] }} Spec
                    </button>
                </div>
            </div>
        </template>

        <template v-if="multipleSpec.length > 0">
            <div v-for="(item, i) in multipleSpec" class="flex items-center text-gray-50 flex-wrap gap-1 pb-2" :key="i">
                <h2 class="font-medium">{{ item.name }} value :</h2>
                <ul v-for="(sp, index) in item.values" class="flex gap-1 items-center" :key="index">
                    <li>
                        <span v-if="index !==0">,</span>
                        {{ sp.key }}
                    </li>
                </ul>
            </div>
        </template>

        <div>
            <button @click="handleAddProduct"
                class="block w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-md duration-300 text-gray-50">Add
                Product</button>
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
}

input,
textarea {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
}

select {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border-radius: 6px;
    outline: none;
}
</style>