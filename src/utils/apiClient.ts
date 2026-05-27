import { useAuthStore } from '@/stores/AuthStore';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(newToken: string) {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
}

async function getValidToken() {
  const authStore = useAuthStore();
  const { accessToken, tokenExpiry, refreshAccessToken } = authStore;

  if (accessToken && Date.now() < tokenExpiry - 30000) {
    return accessToken;
  }

  if (isRefreshing) {
    return new Promise<string>((resolve) => {
      subscribeTokenRefresh(resolve);
    });
  }

  isRefreshing = true;

  try {
    await refreshAccessToken();
    const newToken = authStore.accessToken || '';
    onTokenRefreshed(newToken);
    return newToken;
  } catch {
    onTokenRefreshed('');
    authStore.logout();
    throw new Error('Token refresh failed');
  } finally {
    isRefreshing = false;
  }
}

async function fetchWithAuth(url: string, options: RequestInit, token: string): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': options.headers?.['Content-Type'] || 'application/json',
    },
    credentials: 'include',
  });
}

export async function apiClient(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getValidToken();
  const response = await fetchWithAuth(url, options, token);

  if (response.status === 401) {
    try {
      const authStore = useAuthStore();
      await authStore.refreshAccessToken();
      const retryToken = authStore.accessToken || '';
      return fetchWithAuth(url, options, retryToken);
    } catch {
      throw new Error('Unauthorized and refresh failed');
    }
  }

  return response;
}