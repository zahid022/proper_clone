<script setup lang="ts">
import { authentication } from '@/services/api';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { reactive} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import * as yup from 'yup';

const router = useRouter()
const route = useRoute()
const toast  = useToast()

const schema = yup.object({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Please confirm your password"),
});

const initialValues = reactive({
    password: '',
    repeatPassword : ''
});

const onSubmit = async (values: any) => {
    const token = route.query.token;
    
    values.token = token
    
    let result = await authentication.confirm(values)

    if(!result) {
        toast.error("Password repeat is failed")
        return
    }

    router.push('/login')
}

</script>

<template>
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues">
        <div class="mb-3">
            <label for="password">Password</label>
            <Field type="text" name="password" id="password" />
            <ErrorMessage class="error" name="password" />
        </div>
        <div class="mb-6">
            <label for="repeatPassword">Repeat Password</label>
            <Field type="text" name="repeatPassword" id="repeatPassword" />
            <ErrorMessage class="error" name="repeatPassword" />
        </div>
        <div>
            <button class="bg-black text-white block w-full rounded-md py-3">Submit</button>
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