<script setup lang="ts">
import { authentication } from '@/services/api';
import { getUser } from '@/stores/user.store';
import type { login } from '@/types/auth.type';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid';
import { Field, Form, ErrorMessage, type GenericObject } from 'vee-validate';
import { reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

const router = useRouter()
const toast  = useToast()

const emailValue = ref('')

const store = getUser()

const {SET_TOKEN, SET_USER} = store

const schema = yup.object({
    email: yup.string().email().trim().required("Email is invalid"),
    password: yup.string().min(8).trim().required("Password min 8 symbols")
});

const password_flag : Ref<boolean> = ref(false)

const initialValues = reactive<login>({
    email: '',
    password: ''
});

const onSubmit = async (values: GenericObject) => {
    const loginValues = values as login;
    const result = await authentication.login(loginValues)

    if(!result){
        toast.error("Email or password is wrong")
        return
    }

    SET_TOKEN(result.token)
    SET_USER(result.user)
    localStorage.setItem("token", JSON.stringify(result.token))
  
    router.push('/')
    
}

const forgotPassword = async () => {
    let result = await authentication.forgot(emailValue.value)
    
    if(!result) {
        toast.error("Email is required")
        return
    }

    toast.success("Message send to email")
    emailValue.value = ''
}
</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues">
        <div class="mb-6">
            <label for="email">E-mail</label>
            <Field type="text" v-model="emailValue" name="email" id="email" />
            <ErrorMessage class="error" name="email" />
        </div>
        <div class="mb-3">
            <label for="password">Password</label>
            <div class="relative">
                <Field :type="password_flag ? 'text' : 'password' " name="password" id="password" />
                <button @click="() => password_flag = !password_flag" type="button" class="absolute right-3 top-[50%] -translate-y-[50%]">
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
        <div class="mb-4 flex justify-center">
            <button @click="forgotPassword" type="button" class="text-[#888] hover:underline text-[12px]">
                Forgot password ?
            </button>
        </div>
        <div>
            <button class="bg-black text-white block w-full rounded-md py-3">Sign In</button>
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