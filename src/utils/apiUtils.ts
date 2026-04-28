import { refreshToken, login } from './auth';
import router from '@/router';

export function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('access_token');
  const expiry = localStorage.getItem('token_expiry');

  // Si no hay token directamente, login — no intentar refresh
  if (!token) {
    await login();
    throw new Error('Unauthorized');
  }

  // Solo intentar refresh si el expiry es válido y está próximo a vencer
  const expiryMs = parseInt(expiry);
  if (!isNaN(expiryMs) && Date.now() > expiryMs - 300000) {
    try {
      await refreshToken();
    } catch {
      await login();
      throw new Error('Unauthorized');
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...getAuthHeaders(),
    },
    credentials: 'include',
  });

  if (response.status === 401) {
    localStorage.clear();
    await login();
    throw new Error('Unauthorized');
  }

  return response;
}