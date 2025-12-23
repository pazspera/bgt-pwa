import * as PlayerApiService from "../api/playerApiService";
import { ref, type Ref } from "vue";
import type { PlayerApiResponse, CreatePlayerRequest, UpdatePlayerRequest } from "../types/domain/playerApi";

export function usePlayerApi() {
  const player: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  const updated: Ref<boolean> = ref(false);

  const fetchPlayer = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const fetchPlayer: PlayerApiResponse = await PlayerApiService.getPlayer(id);
      player.value = fetchPlayer;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updatePlayer = async (id: string, name: UpdatePlayerRequest) => {
    loading.value = true;
    error.value = null;

    try {
      const updatedPlayer = await PlayerApiService.updatePlayer(id, name);
      player.value = updatedPlayer;
      updated.value = true;
    } catch (error) {
      
    } finally {
      loading.value = false;
    }
  };

  return { player, loading, error, updated, fetchPlayer, updatePlayer };
}