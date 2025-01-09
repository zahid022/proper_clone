<script setup lang="ts">
import { Field, Form, ErrorMessage, type GenericObject, type SubmissionContext } from 'vee-validate';
import { reactive, ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';
import { User, Country } from '@/services/api'
import * as yup from 'yup';
import type { UpdateUser } from '@/types/user.type';
import type { updateProfile } from '@/types/user.type';

const toast = useToast()

interface countryType {
    country : string;
    region : string;
}

const countries: Ref<countryType[]> = ref([])

const schema = yup.object({
    addressTitle: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Address title must be at least 3 characters")
        .optional(),
    postalCode: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Postal code must be at least 3 characters")
        .optional(),
    city: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "City name must be at least 3 characters")
        .optional(),
    country: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Country name must be at least 3 characters")
        .optional(),
    street: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Street name must be at least 3 characters")
        .optional(),
    phone: yup.string().transform((value) => (value === "" ? undefined : value)).optional()
});

const initialValues = reactive({
    addressTitle: '',
    postalCode: '',
    city: '',
    country: '',
    street: '',
    phone: ''
});

const getCountries = async () => {
    if (countries.value.length) {
        return
    }

    let result = await Country.list()

    if (result) {
        countries.value = result.data
    }
}

const onSubmit = async (values: GenericObject, { resetForm }: SubmissionContext) => {
    let profile : updateProfile = {
        addressTitle: values.addressTitle ? values.addressTitle : undefined,
        state: values.state ? values.state : undefined,
        postalCode: values.postalCode ? values.postalCode : undefined,
        city: values.city ? values.city : undefined,
        country: values.country ? values.country : undefined,
        street: values.street ? values.street : undefined,
        phone: values.phone ? values.phone : undefined,
    }

    let result = await User.update({ profile })

    if (!result) {
        toast.error("Profile update is failed")
        return
    }

    toast.success("Profile updated is successfully")

    resetForm()

}

</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" class="py-5" :initial-values="initialValues">

        <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:w-4/12 md:pr-2">
                <label for="addressTitle">Address Title</label>
                <Field type="text" name="addressTitle" id="addressTitle" />
                <ErrorMessage class="error" name="addressTitle" />
            </div>
            <div class="mb-6 md:w-4/12 md:px-2">
                <label for="postalCode">Postal Code</label>
                <Field type="text" name="postalCode" id="postalCode" />
                <ErrorMessage class="error" name="postalCode" />
            </div>

            <div class="mb-6 md:w-4/12 md:pl-2">
                <label for="country">Country</label>
                <Field name="country" @focus="getCountries" id="country" as="select">
                    <option v-for="country in countries" :value="country.country" :key="country.country">
                        {{ country.country }}
                    </option>
                </Field>
                <ErrorMessage class="error" name="country" />
            </div>
        </div>

        <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:w-4/12 md:pr-2">
                <label for="city">City</label>
                <Field type="text" name="city" id="city" />
                <ErrorMessage class="error" name="city" />
            </div>

            <div class="mb-6 md:w-4/12 md:px-2">
                <label for="street">Street</label>
                <Field type="text" name="street" id="street" />
                <ErrorMessage class="error" name="street" />
            </div>

            <div class="mb-6 md:w-4/12 md:pl-2">
                <label for="phone">Phone</label>
                <Field type="text" name="phone" id="phone" />
                <ErrorMessage class="error" name="phone" />
            </div>
        </div>

        <div>
            <button class="bg-black text-white block w-full rounded-md py-3 md:py-2 md:w-[200px]">Save</button>
        </div>
    </Form>
</template>

<style scoped>
label {
    padding-left: 8px;
    color: #666;
    font-weight: 500;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
}

input,
select {
    display: block;
    border-radius: 6px;
    outline: none;
    padding: 6px 12px;
    font-size: 14px;
    margin-bottom: -6px;
    width: 100%;
    border: 1px solid #00000020;
}

.error {
    padding-left: 5px;
    font-size: 12px;
    color: red;
}
</style>