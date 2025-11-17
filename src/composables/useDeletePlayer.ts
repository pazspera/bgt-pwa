import { ref } from "vue";
import type { Player } from "../types/domain/player";
import { mockPlayers } from "../mocks/data/players";
import * as PlayerService from "../api/playerService";

export const players = ref<Player[]>(mockPlayers);

export function useDeletePlayer() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const deletePlayer = async (id: number)=> {
    try {
      loading.value = true;
      error.value = null;

      await PlayerService.deletePlayer(id);

      // deletes the player locally after it's deleted from db
      players.value = players.value.filter(p => p.id !== id);

    } catch (e) {
      error.value = e.message ? e.message : "Error desconocido";
      console.log("Error en deletePlayer", error.value);
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, deletePlayer };
}