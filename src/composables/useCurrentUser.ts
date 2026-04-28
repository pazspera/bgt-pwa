import { ref, onMounted } from "vue";
import { authFetch } from "../utils/apiUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useCurrentUser() {
  const user = ref(null);
  const loading = ref(true);

  async function load() {
    loading.value = true;
    try {
      const res = await authFetch(`${API_BASE_URL}v1/users/me`, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
            if (!res.ok) {
                user.value = null;
            } else {
                user.value = await res.json();
            }
        } catch (e) {
            user.value = null;
        } finally {
            loading.value = false;
        }
    }

    onMounted(load);

    return { user, loading, reload: load };
}
