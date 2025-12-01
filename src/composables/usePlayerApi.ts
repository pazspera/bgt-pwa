/**
 * usePlayerApi Composable
 * 
 * Composable para gestionar operaciones con un jugador individual
 * Similar a usePlayer.ts pero para la API real
 */

import { ref, type Ref } from 'vue';
import type { PlayerApiResponse } from '../types/domain/playerApi';
import * as PlayerApiService from '../api/playerApiService';

export function usePlayerApi() {
  const player: Ref<PlayerApiResponse | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  /**
   * Obtiene un jugador por ID
   */
  const fetchPlayer = async (id: string) => {
    loading.value = true;
    error.value = null;
    player.value = null;

    try {
      const data = await PlayerApiService.getPlayerById(id);
      player.value = data;
      console.log(`✅ Jugador ${id} obtenido:`, data);
    } catch (e: any) {
      error.value = e.message || 'Error desconocido al obtener jugador';
      console.error('❌ Error en fetchPlayer:', error.value);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Actualiza un jugador
   */
  const updatePlayer = async (id: string, name: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      const updatedPlayer = await PlayerApiService.updatePlayer(id, { name });
      player.value = updatedPlayer;
      console.log('✅ Jugador actualizado:', updatedPlayer);
      return true;
    } catch (e: any) {
      error.value = e.message || 'Error desconocido al actualizar jugador';
      console.error('❌ Error en updatePlayer:', error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    // Estado
    player,
    loading,
    error,
    
    // Métodos
    fetchPlayer,
    updatePlayer,
  };
}
