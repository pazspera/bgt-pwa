import * as PlayerApiService from "../api/playerApiService";
import { ref, type Ref } from "vue";
import type { PlayerApiResponse, PlayersListResponse } from "../types/domain/playerApi";

export function usePlayersApi() {
  const players: Ref<PlayerApiResponse[]> = ref([]);
  const totalPlayers: Ref<number> = ref(0);
  const newPlayer: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const fetchPlayers = async () => {};

  const createPlayer = async () => {};

  const deletePlayer = async () => {};

  return { players, totalPlayers, newPlayer, loading, error, fetchPlayers, createPlayer, deletePlayer };
}