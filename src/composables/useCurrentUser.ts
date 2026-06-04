import { ref } from "vue";
import { apiClient } from "@/utils/apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const user = ref<any>(null);
const loading = ref(true);
let loadPromise: Promise<void> | null = null;

async function doLoad() {
  loading.value = true;
  try {
    const res = await apiClient(`${API_BASE_URL}v1/users/me`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      user.value = await res.json();
    } else {
      user.value = null;
    }
  } catch {
    user.value = null;
  } finally {
    loading.value = false;
  }
}

function reload() {
  loadPromise = doLoad();
  return loadPromise;
}

export function useCurrentUser() {
  return { user, loading, reload };
}
