<template>
    <main>
        <section class="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
            <div class="max-w-[400px] w-full mx-auto">
                <div>
                    <h2 class="text-center text-[24px] font-medium mb-4">Reset Password</h2>
                </div>
                <div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import ForgotPasswordForm from '@/components/public/form/ForgotPasswordForm.vue';


</script>