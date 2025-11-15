import type { Player } from "../types/domain/player";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function getPlayers(): Promise<Player[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/players`);

    if(!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener los jugadores`);
    };

    const data: Player[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
}