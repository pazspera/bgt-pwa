import { ref } from "vue";
import { apiClient } from "@/utils/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const user = ref<any>(null);
const loading = ref(true);
let loadPromise: Promise<void> | null = null;

async function doLoad() {
  console.log('[useCurrentUser] Starting load...');
  loading.value = true;
  try {
    const res = await apiClient(`${API_BASE_URL}v1/users/me`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    console.log('[useCurrentUser] Response status:', res.status);
    if (res.ok) {
      const userData = await res.json();
      console.log('[useCurrentUser] User data:', userData);
      user.value = userData;
    } else {
      console.log('[useCurrentUser] Response not ok, setting user to null');
      user.value = null;
    }
  } catch (e) {
    console.log('[useCurrentUser] Error:', e);
    user.value = null;
  } finally {
    loading.value = false;
    console.log('[useCurrentUser] Loading complete, user:', user.value);
  }
}

async function waitForUser() {
  console.log('[useCurrentUser] waitForUser called, loading:', loading.value, 'user:', user.value);
  if (!loading.value && user.value) {
    console.log('[useCurrentUser] Early return - already loaded');
    return;
  }
  if (!loadPromise) {
    console.log('[useCurrentUser] Starting new load');
    loadPromise = doLoad();
  } else {
    console.log('[useCurrentUser] Awaiting existing load promise');
  }
  await loadPromise;
}

function reload() {
  loadPromise = doLoad();
  return loadPromise;
}

export function useCurrentUser() {
  return { user, loading, reload, waitForUser };
}
