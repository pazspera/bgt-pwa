import { describe, it, expect, vi, afterEach } from 'vitest';
import { getPlayers } from './playerApiService';
import type { PlayersListResponse } from '../types/domain/playerApi';

describe('playerApiService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getPlayers', () => {
    it('should return players list on success', async () => {
      // Arrange: Preparar mock data que coincida con PlayersListResponse
      const mockResponse: PlayersListResponse = {
        total: 2,
        limit: 10,
        offset: 0,
        data: [
          {
            id: '64ad9367-f5a0-49b1-b3a8-2c426aeb71ec',
            name: 'Juan',
            user_id: 'user1',
            is_registered: true,
            created_at: '2025-01-01T10:00:00Z',
            updated_at: '2025-01-02T10:00:00Z'
          },
          {
            id: '64ad9367-f5a0-49b1-b3a8-2c426aeb71ed',
            name: 'María',
            user_id: 'user2',
            is_registered: true,
            created_at: '2025-01-03T10:00:00Z',
            updated_at: '2025-01-04T10:00:00Z'
          }
        ]
      };

      // Mock global fetch para devolver respuesta exitosa
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      // Act: Llamar función
      const result = await getPlayers();

      // Assert: Verificar que devolvió exactamente lo que esperábamos
      expect(result).toEqual(mockResponse);
      expect(result.total).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].name).toBe('Juan');

      // Verificar que fetch fue llamado correctamente
      expect(global.fetch).toHaveBeenCalledWith('/api/v1/players', expect.objectContaining({
        method: 'GET'
      }));
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error on server error (5xx)', async () => {
      // Arrange: Mock que devuelve error 500
      vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);

      // Act & Assert: Verificar que lanza error
      await expect(getPlayers()).rejects.toThrow();

      // Opcionalmente, verificar el mensaje de error contiene "500"
      await expect(getPlayers()).rejects.toThrow(/500/);
    });

    it('should throw error on network failure', async () => {
      // Arrange: Mock que lanza TypeError (fallo de red)
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(
        new TypeError('Failed to fetch')
      );

      // Act & Assert: Verificar que lanza error
      await expect(getPlayers()).rejects.toThrow();

      // Opcionalmente, verificar el mensaje
      await expect(getPlayers()).rejects.toThrow(/Failed to fetch|Network/);
    });
  });
});
