import * as PlayerApiService from "../api/playerApiService";
import { ref, type Ref } from "vue";
import type { PlayerApiResponse, CreatePlayerRequest, UpdatePlayerRequest } from "../types/domain/playerApi";

export function usePlayerApi() {
  const player: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  const updated: Ref<boolean> = ref(false);

  const fetchPlayer = async (id: string) => {};

  const updatePlayer = async (id: string, name: string) => {};

  return { player, loading, error, updated, fetchPlayer, updatePlayer };
}