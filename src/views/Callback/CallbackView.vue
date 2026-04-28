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

const router = useRouter();
const error = ref(null);

onMounted(async () => {
  console.log('[Callback] Mounted, processing...');
  
  // Si ya tenemos tokens válidos, no reprocesar
  const token = localStorage.getItem('access_token');
  if (token) {
    console.log('[Callback] Already authenticated, redirecting...');
    router.push('/');
    return;
  }

  try {
    await handleCallback();
    console.log('[Callback] Tokens saved, redirecting to /');
    router.push('/');
  } catch (e) {
    console.log('[Callback] Error:', e.message);
    error.value = e.message;
  }
});
</script>