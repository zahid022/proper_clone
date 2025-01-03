<script setup lang="ts">
import { image, product } from '@/services/api';
import { addVariant } from '@/stores/admin/product/AddVariant';
import type { Image, ProductVariant } from '@/types/database.type';
import { CloudIcon, MinusIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { Field, Form, ErrorMessage, type SubmissionHandler } from 'vee-validate';
import { reactive, ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

const addVariantStore = addVariant();

const { current_product } = storeToRefs(addVariantStore);

const {SET_MODAL_CHECK} = addVariantStore

const images: Ref<string[]> = ref([])
const showImages: Ref<Image[]> = ref([])

const toast = useToast()

const schema = yup.object({
    price: yup.number().min(1).required("Price must be required"),
    discountType: yup.string().oneOf(["percentage", "value"]).default("percentage"),
    discount: yup.number().min(0, "Discount cannot be negative").default(0),
    stock: yup.number().min(0, "Stock cannot be negative").default(0),
    image: yup.mixed().required("Image is required"),
});

const initialValues = reactive({
    price: 0,
    discountType: 'percentage',
    discount: 0,
    stock: 0,
});

const selectedValues = reactive<{
    [key: string]: string;
}>({
    color: '',
    size: '',
});

const upload = async (event: Event) => {
    const formData = new FormData()
    const input = event.target as HTMLInputElement;
    if (input.files) {
        formData.append("image", input.files[0])
        try {
            const result: Image | undefined = await image.uploadImage(formData)

            if (result) {
                images.value.push(result._id)
                showImages.value.push({ _id: result._id, url: result.url })
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

const removeImage = async (index: number) => {
    showImages.value.splice(index, 1)
    images.value.splice(index, 1)
}

const onsubmit: SubmissionHandler = async (values) => {
    const specs : any = {}
    
    current_product.value?.specs.map(item => {
        if(values[item.key]){
            specs[item.key] = values[item.key]
        }
    })

    const obj : ProductVariant = {
        specs,
        price: values.price,
        discount: values.discount,
        discountType: values.discountType,
        stock: values.stock,
        images : images.value
    }

    const result = await product.addVariant(current_product.value?._id as string, obj)

    if(result){
        toast.success("Variant is added succussfully")
        SET_MODAL_CHECK(false)
        return
    }else{
        toast.error("Variant add is failed")
        return
    }
};

</script>

<template>
    <Form @submit="onsubmit" :validation-schema="schema" :initial-values="initialValues">
        <div class="flex flex-wrap">
            <div class="w-3/12 mb-4 pr-2">
                <label for="price">Price <span>*</span></label>
                <Field name="price" type="number" id="price" />
                <ErrorMessage class="error" name="price" />
            </div>
            <div class="w-3/12 mb-4 px-2">
                <label for="discountType">Discount Type</label>
                <Field name="discountType" id="discountType" as="select">
                    <option value="">Choose a discount type</option>
                    <option value="percentage">Percentage</option>
                    <option value="value">Value</option>
                </Field>
                <ErrorMessage class="error" name="discountType" />
            </div>
            <div class="w-3/12 mb-4 pl-2">
                <label for="discount">Discount</label>
                <Field name="discount" type="number" id="discount" />
                <ErrorMessage class="error" name="discount" />
            </div>
            <div class="w-3/12 mb-4 pl-2">
                <label for="stock">Stock</label>
                <Field name="stock" type="number" id="stock" />
                <ErrorMessage class="error" name="stock" />
            </div>

            <template v-if="current_product">
                <div class="flex mb-4 flex-wrap items-center gap-4">
                    <div v-for="spec in current_product.specs" class="flex flex-wrap  items-end gap-1" :key="spec._id">
                        <div class="text-white">{{ spec.name }} <span class="text-red-600">*</span> :</div>
                        <div class="flex flex-wrap items-center gap-1">
                            <div v-for="value in spec.values" class="flex radio items-center gap-1" :key="value._id">
                                <label :for="value.key">{{ value.value }}</label>
                                <Field :name="spec.key" type="radio" :value="value.key"
                                    v-model="selectedValues[spec.key]" :id="value.key" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="w-full mb-4">
                <label for="Image">Image <span>*</span></label>
                <div class="border relative flex justify-center items-center min-h-60 rounded-md border-gray-500">
                    <Field @change="upload" name="image" id="image" class="absolute inset-0 opacity-0 cursor-pointer"
                        type="file" />
                    <div>
                        <CloudIcon class="w-20 h-20 text-white" />
                    </div>
                </div>
                <ErrorMessage class="error" name="image" />
            </div>

            <template v-if="showImages.length > 0">
                <div class="flex gap-3">
                    <div v-for="(image, index) in showImages" class="w-28 h-20 relative" :key="image._id">
                        <button @click="() => removeImage(index)" type="button"
                            class="bg-red-600 absolute justify-center items-center flex right-0 top-[-10px] w-5 h-5 rounded-full">
                            <MinusIcon class="w-4 h-7 text-white" />
                        </button>
                        <img :src="image.url" alt="Image" class="w-full  h-full">
                    </div>
                </div>
            </template>

        </div>
        <button class="bg-gray-500 px-5 py-1 rounded-md text-gray-200">Submit</button>
    </Form>
</template>


<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

label {
    padding-left: 4px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
}

label span {
    color: #dc2626;
}

input,
select {
    display: block;
    border-radius: 6px;
    outline: none;
    padding: 4px 12px;
    font-size: 14px;
    margin-bottom: -6px;
    width: 100%;
}

.radio>* {
    margin: 0 !important;
}

.error {
    padding-left: 5px;
    font-size: 12px;
    color: red;
}
</style>