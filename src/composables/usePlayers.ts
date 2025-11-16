import { ref } from "vue";
import type { Player } from "../types/domain/player";
import { getPlayers } from "../api/playerService";

export function usePlayers() {
  const players = ref<Player[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetch = async ()=> {
    loading.value = true;
    error.value = null;

    try {
      const data = await getPlayers();
      players.value = data;
      console.log("Jugadores mockeados ok:", data);
    } catch (e) {
      error.value = e.message;
      console.log("Error en usePlayers", error.value);
    } finally {
      loading.value = false;
    }
  };

  return { players, loading, error, fetch };
}