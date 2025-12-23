import * as PlayerApiService from "../api/playerApiService";
import { ref, type Ref } from "vue";
import type { PlayerApiResponse, PlayersListResponse } from "../types/domain/playerApi";

export function usePlayersApi() {
  const players: Ref<PlayerApiResponse[]> = ref([]);
  const totalPlayers: Ref<number> = ref(0);
  const newPlayer: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const fetchPlayers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedPlayers = await PlayerApiService.getPlayers();
      totalPlayers.value = fetchedPlayers.total;
      players.value = fetchedPlayers.data;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }

    return { players, loading, error, fetchPlayers };
  };

  const createPlayer = async () => {};

  const deletePlayer = async () => {};

  return { players, totalPlayers, newPlayer, loading, error, fetchPlayers, createPlayer, deletePlayer };
}