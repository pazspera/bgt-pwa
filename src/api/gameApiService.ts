import App from "../App.vue";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import type { GameApiResponse, GamesListResponse, PlayerInGame, CreateGameRequest } from "../types/domain/gamesApi";

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

export async function getGames(limit: number = 10, offset: number = 0): Promise<GamesListResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}v1/games?limit=${limit}&offset=${offset}&include=players`, { method: "GET" });

    if(!response.ok) {
      //throw new Error(API_ERROR_MESSAGES.GET_GAMES_FAILED(response.status));
      throw new Error(`${response.status}: No se pudieron obtener las partidas`);
    }

    const data: GamesListResponse = await response.json();
    return data;
  } catch (err) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(err?.message));
  }
}