<script setup lang="ts">
import LoginForm from '@/components/public/form/LoginForm.vue'

</script>

<template>
    <main>
        <section class="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
            <div class="max-w-[600px] bg-[#ffffffd6] py-4 rounded-md w-full mx-auto">
                <div class="max-w-[400px] mx-auto">
                    <h2 class="text-center text-[24px] font-medium mb-4">Sign In Account</h2>
                    <p class="text-[14px] text-center text-[#999] mb-6">Sign in for a faster checkout experience and to
                        enjoy membership privileges.</p>
                </div>
                <div class=" max-w-[400px] mx-auto rounded-md p-3">
                    <LoginForm />
                </div>
                <div class="py-2">
                    <p class="text-center text-[#888] text-[12px]">Don't have an account yet?
                        <RouterLink to="/register" class="hover:underline">
                            Sign up
                        </RouterLink>
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>


<style scoped>
section {
    background: url('../../assets/img/auth-bg.jpg')center/cover no-repeat;
}
</style>