<script setup lang="ts">
import LoginForm from '@/components/public/form/LoginForm.vue'

</script>

<template>
    <main>
        <section class="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
            <div class="max-w-[400px] mx-auto">
                <div>
                    <h2 class="text-center text-[24px] font-medium mb-4">Sign In Account</h2>
                    <p class="text-[14px] text-center text-[#999] mb-6">Sign in for a faster checkout experience and to
                        enjoy membership privileges.</p>
                </div>
                <div class="border border-[#00000020] rounded-md p-3">
                    <LoginForm />
                </div>
                <div class="py-2">
                    <p class="text-center text-[#888] text-[12px]">Don't have an account yet?
                        <RouterLink to="/" class="hover:underline">
                            Sign up
                        </RouterLink>
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>
