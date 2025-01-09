<script setup lang="ts">
import { Field, Form, ErrorMessage, type GenericObject, type SubmissionContext } from 'vee-validate';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { User } from '@/services/api'
import * as yup from 'yup';
import type { UpdateUser } from '@/types/user.type';

const toast = useToast()

const schema = yup.object({
    firstName: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Firstname must be at least 3 characters")
        .optional(),
    lastName: yup
        .string()
        .transform((value) => (value === "" ? undefined : value))
        .min(3, "Lastname must be at least 3 characters")
        .optional(),
});

const initialValues = reactive({
    firstName: '',
    lastName: ''
});

const onSubmit = async (values: GenericObject, { resetForm }: SubmissionContext) => {
    let obj : UpdateUser = {
        firstName: values.firstName ? values.firstName : undefined,
        lastName: values.lastName ? values.lastName : undefined
    }

    let result = await User.update(obj)

    if (!result) {
        toast.error("Profile update is failed")
        return
    }

    toast.success("Profile updated is successfully")

    resetForm()

}

</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" class="py-5 md:border-b md:border-[#ddd]" :initial-values="initialValues">
        <div class="md:flex md:justify-between md:items-center">
            <div class="mb-6 md:w-5/12">
                <label for="firstName">Firstname</label>
                <Field type="text" name="firstName" id="firstName" />
                <ErrorMessage class="error" name="firstName" />
            </div>

            <div class="mb-6 md:w-5/12">
                <label for="lastName">Lastname</label>
                <Field type="text" name="lastName" id="lastName" />
                <ErrorMessage class="error" name="lastName" />
            </div>
        </div>

        <div>
            <button class="bg-black md:w-[200px] text-white block w-full rounded-md py-3 md:py-2">Save</button>
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

input {
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