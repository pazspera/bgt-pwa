import type { Player } from "../types/domain/player";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players`);
  
  if(!response.ok) {
    throw new Error(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(response.status));
  };

  const data: Player[] = await response.json();
  return data;
  
}

export async function getPlayer(id) {
  const response = await fetch(`${API_BASE_URL}/players/${id}`);
  
  if(response.status === 404){
    throw new Error(API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(id));
  }

  if(!response.ok){
    throw new Error(API_ERROR_MESSAGES.GET_PLAYER_FAILED(response.status, id));
  }

  const data: Player = await response.json();
  return data;

}

export async function deletePlayer(id) {
  const response = await fetch(`${API_BASE_URL}/players/${id}`, {
    method: "DELETE",
  });

  if(response.status === 204 || response.status === 200) {
    return;
  }

  if(response.status === 404) {
    throw new Error(API_ERROR_MESSAGES.DELETE_PLAYER_NOT_FOUND(id));
  }

  if(!response.ok) {
    throw new Error();
  }

}