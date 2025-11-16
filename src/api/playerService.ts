import { triggerAsyncId } from "async_hooks";
import type { Player } from "../types/domain/player";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function getPlayers(): Promise<Player[]> {
  const response = await fetch(`${API_BASE_URL}/players`);
  
  if(!response.ok) {
    throw new Error(`Error ${response.status}: No se pudieron obtener los jugadores`);
  };

  const data: Player[] = await response.json();
  return data;
  
}

export async function getPlayer(id) {
  const response = await fetch(`${API_BASE_URL}/players/${id}`);
  
  if(response.status === 404){
    throw new Error(`Jugador con id ${id} no existe`);
  }

  if(!response.ok){
    throw new Error(`Error ${response.status}: No se pudo obtener el jugador con id ${id}`);
  }

  const data: Player = await response.json();
  return data;

}