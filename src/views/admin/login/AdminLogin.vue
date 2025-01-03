<script setup lang="ts">
import {authentication} from '@/services/api';
import type { login } from '@/types/auth.type';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const email = ref('')
const password = ref('')

const toast = useToast()

const handleSubmit = async () => {
    if(email.value.trim().length === 0 || password.value.trim().length === 0){
        toast.error("email and password are empty")
        return
    }

    const obj : login = {
        email : email.value,
        password : password.value
    }
    
    const res = await authentication.login(obj)

    if(!res){
        toast.error("Email and password are invalid")
        return
    }

    localStorage.setItem("token", JSON.stringify(res.token))
    location.reload()
}
</script>

<template>
    <div class="bg-[#F9FAFB] h-screen flex justify-center items-center">
        <div class="w-full max-w-sm p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
            <h1 class="text-2xl font-bold text-center">Login</h1>
            <form action="" class="space-y-6">
                <div class="space-y-1 text-sm">
                    <label for="Email" class="block dark:text-gray-600">E-mail</label>
                    <input v-model="email" type="text" name="Email" id="Email" placeholder="E-mail"
                        class="w-full px-4 py-3 outline-none border rounded-md border-black">
                </div>
                <div class="space-y-1 text-sm">
                    <label for="password" class="block dark:text-gray-600">Password</label>
                    <input v-model="password" type="password" name="password" id="password" placeholder="Password"
                        class="w-full px-4 py-3 outline-none rounded-md border border-black">
                </div>
                <button type="submit" @click.prevent="handleSubmit" class="block w-full p-3 text-center rounded-sm text-gray-50 bg-gray-800">Sign
                    in</button>
            </form>
        </div>
    </div>
</template>