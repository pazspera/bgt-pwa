import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import type { PlayerApiResponse, PlayersListResponse, CreatePlayerRequest, UpdatePlayerRequest } from "../types/domain/playerApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPlayers() {
  try {
    const response = await fetch(`${API_BASE_URL}/players`, { method: "GET" });

    if(!response.ok) {
      throw new Error(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(response.status));
    }

    const data: PlayersListResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}

export async function getPlayer(id: string) {
}

export async function createPlayer() {}

export async function updatePlayer() {}

export async function deletePlayer(id: string) {}
