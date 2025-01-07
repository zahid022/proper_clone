<script setup lang="ts">
import RegisterForm from '@/components/public/form/RegisterForm.vue';


</script>

<template>
    <main>
        <section class="px-3 md:px-8 min-h-[81vh] flex items-center justify-center lg:px-12 py-10">
            <div class="max-w-[600px] bg-[#ffffffd6] py-4 w-full mx-auto">
                <div class="max-w-[400px] mx-auto">
                    <h2 class="text-center text-[24px] font-medium mb-4">Create an Account</h2>
                </div>
                <div class="max-w-[400px] mx-auto rounded-md p-3">
                    <RegisterForm />
                </div>
                <div class="py-2">
                    <p class="text-center text-[#888] text-[12px]">Already have an account?
                        <RouterLink to="/login" class="hover:underline">
                            Sign in
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