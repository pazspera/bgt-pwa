<template>
  <div class="callback-container">
    <p v-if="error">Error: {{ error }}</p>
    <p v-else>Procesando login...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { handleCallback } from '@/utils/auth';
import { useAuthStore } from '@/stores/AuthStore';

const router = useRouter();
const error = ref(null);
const authStore = useAuthStore();

onMounted(async () => {
  const token = authStore.accessToken;
  if (token) {
    router.push('/');
    return;
  }

  try {
    const tokens = await handleCallback();
    authStore.setTokens(tokens);
    const redirect = sessionStorage.getItem('redirect_after_login') || '/';
    sessionStorage.removeItem('redirect_after_login');
    await router.replace(redirect);
  } catch (e) {
    error.value = e.message;
  }
});
</script>