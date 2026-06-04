import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { refreshToken as refreshTokenFn, logout as logoutFn } from '@/utils/auth';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access_token') || null);
  const refreshToken = ref(localStorage.getItem('refresh_token') || null);
  const idToken = ref(localStorage.getItem('id_token') || null);
  const tokenExpiry = ref(parseInt(localStorage.getItem('token_expiry') || '0'));
  const user = ref(null);

  const isAuthenticated = computed(
    () => !!accessToken.value && Date.now() < tokenExpiry.value
  );

  function setTokens({ access_token, refresh_token, id_token, expires_in }) {
    accessToken.value = access_token;
    refreshToken.value = refresh_token;
    idToken.value = id_token;
    tokenExpiry.value = Date.now() + expires_in * 1000;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('id_token', id_token);
    localStorage.setItem('token_expiry', String(tokenExpiry.value));
  }

  function setUser(userData) {
    user.value = userData;
  }

  function clearTokens() {
    accessToken.value = null;
    refreshToken.value = null;
    idToken.value = null;
    tokenExpiry.value = 0;
    user.value = null;

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token_expiry');
  }

  async function refreshAccessToken() {
    if (!refreshToken.value) throw new Error('No refresh token');

    const tokens = await refreshTokenFn();
    accessToken.value = tokens.access_token;
    refreshToken.value = tokens.refresh_token;
    idToken.value = tokens.id_token;
    tokenExpiry.value = Date.now() + tokens.expires_in * 1000;

    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('id_token', tokens.id_token);
    localStorage.setItem('token_expiry', String(tokenExpiry.value));
  }

  async function logout() {
    clearTokens();
    logoutFn();
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'access_token') {
      accessToken.value = e.newValue;
    }
    if (e.key === 'refresh_token') {
      refreshToken.value = e.newValue;
    }
    if (e.key === 'token_expiry') {
      tokenExpiry.value = e.newValue ? parseInt(e.newValue) : 0;
    }
  });

  return {
    accessToken,
    refreshToken,
    idToken,
    tokenExpiry,
    user,
    isAuthenticated,
    setTokens,
    setUser,
    clearTokens,
    refreshAccessToken,
    logout,
  };
});