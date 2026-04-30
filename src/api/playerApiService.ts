import { API_ERROR_MESSAGES } from "@/constants/apiErrorMessages";
import type { PlayerApiResponse, PlayersListResponse, CreatePlayerRequest, UpdatePlayerRequest } from "@/types/domain/playerApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPlayers(sortBy: string = "created_at", order: string = "asc") {
  const params = new URLSearchParams({
    sortBy: sortBy,
    order: order
  })

  try {
    const response = await fetch(`${API_BASE_URL}v1/players?${params.toString()}`, { method: "GET" });

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
    const response = await fetch(`${API_BASE_URL}v1/players/${id}`, { method: "GET" });

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

export async function createPlayer(newPlayer: CreatePlayerRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/players`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newPlayer),
    });

    if(response.status === 400) {
      throw new Error(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(400));
    }
    
    if(!response.ok) {
      throw new Error(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(response.status));
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}

export async function updatePlayer(id: string, updatedData: UpdatePlayerRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if(response.status === 204) {
      return true;
    }

    if(response.status === 400) {
      throw new Error(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(400));
    }

    if(response.status === 404) {
      throw new Error(API_ERROR_MESSAGES.UPDATE_PLAYER_NOT_FOUND(404, id));
    }

    if(!response.ok) {
      throw new Error(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(500));
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}

export async function deletePlayer(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/players/${id}`, { method: "DELETE" });

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
