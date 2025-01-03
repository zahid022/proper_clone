<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import AdminLogin from './views/admin/login/AdminLogin.vue';
import PublicLayout from './layout/PublicLayout.vue';
import AdminLayout from './layout/AdminLayout.vue';
import { getUser } from './stores/user.store';
import getToken from './utils/getToken';
import { authentication } from './services/api';
import { useToast } from 'vue-toastification';
import { storeToRefs } from 'pinia';

const layout = shallowRef(PublicLayout);
const route = useRoute();

const toast = useToast()

const store = getUser()

const { token } = storeToRefs(store)

const { SET_USER } = store

const saveUser = async () => {
  const localToken = getToken()

  if (!localToken) {
    return
  }

  SET_USER({})

  const user = await authentication.check(localToken)

  if (!user && layout.value === AdminLayout) {
    localStorage.removeItem("token")
    location.reload()
  } else if (!user && layout.value === PublicLayout) {
    toast.error("Unauthorized")
    localStorage.removeItem("token")
  }

  SET_USER(user)
}

onMounted(() => {
  saveUser()
})

watch(
  () => route.meta.layout,
  (value) => {
    switch (value) {
      case 'PublicLayout':
        layout.value = PublicLayout;
        break;
      case 'AdminLayout':
        layout.value = AdminLayout;
        break;
      default:
        layout.value = AdminLogin;
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout" />
</template>
