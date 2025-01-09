<script setup lang="ts">
import { Field, Form, ErrorMessage, type GenericObject, type SubmissionContext } from 'vee-validate';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { User } from '@/services/api'
import * as yup from 'yup';
import type { forgetPasswordType } from '@/types/user.type';

const toast = useToast()

const schema = yup.object({
    currentPassword: yup.string().min(8, "Current password must be at 8 characters").required("Current password is required"),
    newPassword: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    repeatPassword: yup.string().oneOf([yup.ref('newPassword')], "Passwords must match").required("Please confirm your password")
});

const initialValues = reactive({
    currentPassword: '',
    newPassword: '',
    repeatPassword: ''
});

const onSubmit = async (values: GenericObject, { resetForm }: SubmissionContext) => {
    const obj : forgetPasswordType = values as forgetPasswordType
    let result = await User.resetPassword(obj)

    if (!result) {
        toast.error("Password update is failed")
        return
    }

    toast.success("Password updated is successfully")

    resetForm()

}

</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" class="py-5 md:border-b md:border-[#ddd]" :initial-values="initialValues">
        <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:w-4/12 md:pr-2">
                <label for="currentPassword">Current Password</label>
                <Field type="password" name="currentPassword" id="currentPassword" />
                <ErrorMessage class="error" name="currentPassword" />
            </div>

            <div class="mb-6 md:w-4/12 md:px-2">
                <label for="newPassword">New Password</label>
                <Field type="password" name="newPassword" id="newPassword" />
                <ErrorMessage class="error" name="newPassword" />
            </div>

            <div class="mb-6 md:w-4/12 md:pl-2">
                <label for="repeatPassword">Repeat Password</label>
                <Field type="password" name="repeatPassword" id="repeatPassword" />
                <ErrorMessage class="error" name="repeatPassword" />
            </div>
        </div>

        <div>
            <button class="bg-black text-white block w-full rounded-md py-3 md:w-[200px] md:py-2">Save New Password</button>
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