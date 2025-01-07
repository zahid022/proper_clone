<script setup lang="ts">
import ProfileAddressForm from '@/components/public/form/ProfileAddressForm.vue';
import ProfileForm from '@/components/public/form/ProfileForm.vue';
import ResetPasswordForm from '@/components/public/form/ResetPasswordForm.vue';


</script>

<template>
    <div>
        <div class="pb-3 border-b border-[#ddd]">
            <h2 class="text-[24px] font-medium md:text-[32px]">Account Details</h2>
        </div>
        <div>
            <ProfileForm />
            <ResetPasswordForm />
            <ProfileAddressForm />
        </div>
    </div>
</template>