/**
 * usePlayersApi Composable
 * 
 * Composable para gestionar operaciones con la lista de jugadores
 * Proporciona estado reactivo (loading, error) y métodos para fetch
 */

import { ref, type Ref } from 'vue';
import type { PlayerApiResponse, PlayersListResponse } from '../types/domain/playerApi';
import * as PlayerApiService from '../api/playerApiService';

export function usePlayersApi() {
  const players: Ref<PlayerApiResponse[]> = ref([]);
  const totalPlayers: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  /**
   * Obtiene la lista de jugadores
   */
  const fetchPlayers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response: PlayersListResponse = await PlayerApiService.getPlayers();
      players.value = response.data;
      totalPlayers.value = response.total;
      console.log('✅ Jugadores obtenidos:', response);
    } catch (e: any) {
      error.value = e.message || 'Error desconocido al obtener jugadores';
      console.error('❌ Error en fetchPlayers:', error.value);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Crea un nuevo jugador
   */
  const createPlayer = async (name: string): Promise<PlayerApiResponse | null> => {
    loading.value = true;
    error.value = null;

    try {
      const newPlayer = await PlayerApiService.createPlayer({ name });
      
      // Actualiza la lista local agregando el nuevo jugador
      players.value.push(newPlayer);
      totalPlayers.value++;
      
      console.log('✅ Jugador creado:', newPlayer);
      return newPlayer;
    } catch (e: any) {
      error.value = e.message || 'Error desconocido al crear jugador';
      console.error('❌ Error en createPlayer:', error.value);
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Elimina un jugador
   */
  const removePlayer = async (id: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await PlayerApiService.deletePlayer(id);
      
      // Actualiza la lista local eliminando el jugador
      players.value = players.value.filter(p => p.id !== id);
      totalPlayers.value--;
      
      console.log('✅ Jugador eliminado:', id);
      return true;
    } catch (e: any) {
      error.value = e.message || 'Error desconocido al eliminar jugador';
      console.error('❌ Error en removePlayer:', error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    // Estado
    players,
    totalPlayers,
    loading,
    error,
    
    // Métodos
    fetchPlayers,
    createPlayer,
    removePlayer,
  };
}
