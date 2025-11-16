import { ref } from "vue";
import type { Player } from "../types/domain/player";
import { getPlayer } from "../api/playerService";

export function usePlayer() {
  const player = ref<Player>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPlayer = async (id: number)=> {
    try {
      loading.value = true;
      error.value = null;
  
      const data = await getPlayer(id);
      player.value = data;
      console.log(`Jugador ${id} mockeado`, data)
    } catch (e) {
      error.value = e.message;
      console.log("Error en usePlayer", error.value);
    } finally {
      loading.value = false;
    }
  }

  return { player, loading, error, fetchPlayer };
}