import { API_ERROR_MESSAGES } from "@/constants/apiErrorMessages";
import type { GameApiResponse, GamesListResponse, PlayerInGame, CreateGameRequest } from "@/types/domain/gamesApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createGame(newGame: CreateGameRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/games`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newGame),
    })

    if(response.status === 400) {
      throw new Error(API_ERROR_MESSAGES.CREATE_GAME_ERROR(400))
    }

    if(!response.ok) {
      throw new Error(API_ERROR_MESSAGES.CREATE_GAME_ERROR(response.status));
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(err?.message));    
  }


}

export async function getGames(limit: number = 12, offset: number = 0) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/games?limit=${limit}&offset=${offset}&include=players`, { method: "GET" });

    if(!response.ok) {
      //throw new Error(API_ERROR_MESSAGES.GET_GAMES_FAILED(response.status));
      throw new Error(`${response.status}: No se pudieron obtener las partidas`);
    }

    const data: GamesListResponse = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(err?.message));
  }
}

export async function deleteGame(gameId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}v1/games/${gameId}`, { method: "DELETE" });

    if(response.status === 404) {
      throw new Error(API_ERROR_MESSAGES.DELETE_GAME_NOT_FOUND(gameId));
    }

    return true;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(error?.message));
  }
}