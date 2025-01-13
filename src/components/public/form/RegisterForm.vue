<script setup lang="ts">
import { authentication } from '@/services/api';
import { getUser } from '@/stores/user.store';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { Field, Form, ErrorMessage, type GenericObject } from 'vee-validate';
import { reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';
import type {register} from '@/types/auth.type'

const router = useRouter()
const toast = useToast()

const store = getUser()

const { SET_TOKEN, SET_USER } = store

const schema = yup.object({
    email: yup.string().email().trim().required("Email is invalid"),
    password: yup.string().min(8).trim().required("Password min 8 symbols"),
    firstName: yup.string().min(3).trim().required("Firstname is required"),
    lastName: yup.string().min(3).trim().required("Lastname is required")
});

const password_flag: Ref<boolean> = ref(false)

const initialValues = reactive({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
});

const registerFlag = ref(false)

const onSubmit = async (values: GenericObject) => {
    registerFlag.value = true
    let obj : register = values as register
    const result = await authentication.register(obj)

    if (!result) {
        toast.error("Register is failed")
        return
    }
    registerFlag.value = false
    router.push('/login')

}
</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues">
        <div class="mb-6">
            <label for="firstName">Firstname</label>
            <Field type="text" name="firstName" id="firstName" />
            <ErrorMessage class="error" name="firstName" />
        </div>
        <div class="mb-6">
            <label for="lastName">Lastname</label>
            <Field type="text" name="lastName" id="lastName" />
            <ErrorMessage class="error" name="lastName" />
        </div>
        <div class="mb-6">
            <label for="email">E-mail</label>
            <Field type="text" name="email" id="email" />
            <ErrorMessage class="error" name="email" />
        </div>
        <div class="mb-6">
            <label for="password">Password</label>
            <div class="relative">
                <Field :type="password_flag ? 'text' : 'password'" name="password" id="password" />
                <button @click="() => password_flag = !password_flag" type="button"
                    class="absolute right-3 top-[50%] -translate-y-[50%]">
                    <template v-if="!password_flag">
                        <EyeIcon class="w-4 h-4 text-black" />
                    </template>

                    <template v-else>
                        <EyeSlashIcon class="w-4 h-4 text-black" />
                    </template>
                </button>
            </div>
            <ErrorMessage class="error" name="password" />
        </div>
        <div>
            <button :disabled="registerFlag" class="bg-black text-white block w-full rounded-md py-3">Sign In</button>
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