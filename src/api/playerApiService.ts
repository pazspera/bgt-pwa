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
  try {
    const response = await fetch(`${API_BASE_URL}/players/${id}`);

    if(response.status === 404){
      throw new Error(API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(id));
    }
  
    if(!response.ok){
      throw new Error(API_ERROR_MESSAGES.GET_PLAYER_FAILED(response.status, id));
    }
  
    const data: PlayerApiResponse = await response.json();
    return data;
  } catch(error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}

export async function createPlayer() {}

export async function updatePlayer() {}

export async function deletePlayer(id: string) {}
