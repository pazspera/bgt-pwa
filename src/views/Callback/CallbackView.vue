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
import { apiClient } from '@/utils/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const router = useRouter();
const error = ref(null);
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await router.replace('/');
    return;
  }

  try {
    const tokens = await handleCallback();
    authStore.setTokens(tokens);

    const userRes = await apiClient(`${API_BASE_URL}v1/users/me`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (userRes.ok) {
      authStore.setUser(await userRes.json());
    }

    const redirect = sessionStorage.getItem('redirect_after_login') || '/';
    sessionStorage.removeItem('redirect_after_login');
    await router.replace(redirect);
  } catch (e) {
    error.value = e.message;
  }
});
</script>