import * as PlayerApiService from "../api/playerApiService";
import { ref, type Ref } from "vue";
import type { PlayerApiResponse, PlayersListResponse, CreatePlayerRequest } from "../types/domain/playerApi";

export function usePlayersApi() {
  const players: Ref<PlayerApiResponse[]> = ref([]);
  const totalPlayers: Ref<number> = ref(0);
  const newPlayer: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  const deleted: Ref<boolean> = ref(false);
  const errorCreatePlayer: Ref<string | null> = ref(null);
  const errorDeletePlayer: Ref<string | null> = ref(null);

  const fetchPlayers = async (sortBy: string = "created_at", order: string = "asc") => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedPlayers: PlayersListResponse = await PlayerApiService.getPlayers(sortBy, order);
      totalPlayers.value = fetchedPlayers.total;
      players.value = fetchedPlayers.data;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const createPlayer = async (playerData: CreatePlayerRequest) => {
    loading.value = true;
    errorCreatePlayer.value = null;

    try {
      const response = await PlayerApiService.createPlayer(playerData);
      newPlayer.value = response; 
      return response;
    } catch (e) {
      errorCreatePlayer.value = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const deletePlayer = async (id: string) => {
    loading.value = true;
    errorDeletePlayer.value = null;

    try {
      await PlayerApiService.deletePlayer(id);
      deleted.value = true;
    } catch (err) {
      errorDeletePlayer.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { players, totalPlayers, newPlayer, loading, error, errorCreatePlayer, errorDeletePlayer, deleted, fetchPlayers, createPlayer, deletePlayer };
}