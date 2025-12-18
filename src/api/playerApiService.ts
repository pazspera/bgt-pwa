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
    const response = await fetch(`${API_BASE_URL}/players/${id}`, { method: "GET" });

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

export async function createPlayer(player: CreatePlayerRequest) {}

export async function updatePlayer(updatedPlayer: UpdatePlayerRequest) {}

export async function deletePlayer(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, { method: "DELETE" });

    if(response.status === 404) {
      throw new Error(API_ERROR_MESSAGES.DELETE_PLAYER_NOT_FOUND(id));
    }
    
    if(response.status !== 200 && response.status !== 204) {
      throw new Error(API_ERROR_MESSAGES.DELETE_PLAYER_ERROR(response.status, id));
    }

    return true;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}
