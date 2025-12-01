/**
 * Player API Service
 * 
 * Servicio para interactuar con la API real de players en http://dev.bgt.local/api/v1/players
 * Sigue el patrón del proyecto: funciones puras con fetch que manejan errores apropiadamente
 */

import type { 
  PlayerApiResponse, 
  PlayersListResponse, 
  CreatePlayerRequest,
  UpdatePlayerRequest 
} from '../types/domain/playerApi';

// URL base de la API
// En desarrollo (con MSW), usa la ruta relativa para que MSW la intercepte
// En producción, cambia a la URL completa o usa variable de entorno
const API_BASE_URL = import.meta.env.DEV 
  ? '/api/v1'  // Para desarrollo con MSW
  : import.meta.env.VITE_API_BASE_URL || 'http://dev.bgt.local/api/v1';

/**
 * GET /api/v1/players
 * Obtiene la lista de todos los jugadores
 */
export async function getPlayers(): Promise<PlayersListResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/players`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener los jugadores`);
    }
    
    const data: PlayersListResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión: No se pudo conectar con el servidor');
    }
    throw error;
  }
}

/**
 * GET /api/v1/players/:id
 * Obtiene un jugador específico por su ID
 */
export async function getPlayerById(id: string): Promise<PlayerApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/players/${id}`);
    
    if (response.status === 404) {
      throw new Error(`Jugador con id ${id} no encontrado`);
    }
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo obtener el jugador`);
    }
    
    const data: PlayerApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión: No se pudo conectar con el servidor');
    }
    throw error;
  }
}

/**
 * POST /api/v1/players
 * Crea un nuevo jugador
 */
export async function createPlayer(playerData: CreatePlayerRequest): Promise<PlayerApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    
    if (response.status === 400) {
      throw new Error('Datos inválidos: Verifica que el nombre sea válido');
    }
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo crear el jugador`);
    }
    
    const data: PlayerApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión: No se pudo conectar con el servidor');
    }
    throw error;
  }
}

/**
 * PUT /api/v1/players/:id
 * Actualiza un jugador existente
 */
export async function updatePlayer(
  id: string, 
  playerData: UpdatePlayerRequest
): Promise<PlayerApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    
    if (response.status === 404) {
      throw new Error(`Jugador con id ${id} no encontrado`);
    }
    
    if (response.status === 400) {
      throw new Error('Datos inválidos: Verifica que el nombre sea válido');
    }
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo actualizar el jugador`);
    }
    
    const data: PlayerApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión: No se pudo conectar con el servidor');
    }
    throw error;
  }
}

/**
 * DELETE /api/v1/players/:id
 * Elimina un jugador
 */
export async function deletePlayer(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, {
      method: 'DELETE',
    });
    
    if (response.status === 404) {
      throw new Error(`Jugador con id ${id} no encontrado`);
    }
    
    // DELETE puede retornar 204 (No Content) o 200
    if (response.status !== 204 && response.status !== 200) {
      throw new Error(`Error ${response.status}: No se pudo eliminar el jugador`);
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Error de conexión: No se pudo conectar con el servidor');
    }
    throw error;
  }
}
