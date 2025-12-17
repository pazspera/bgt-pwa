export const API_ERROR_MESSAGES = {
  GET_PLAYERS_FAILED: (status: number) => `Error ${status}: No se pudieron obtener los jugadores`,

  GET_PLAYER_NOT_FOUND: (id: number) => `Jugador con id ${id} no existe`,
  GET_PLAYER_FAILED: (status: number, id: number) => `Error ${status}: No se pudo obtener el jugador con id ${id}`,

  DELETE_PLAYER_NOT_FOUND: (id: number) => `Jugador con id ${id} no encontrado para eliminar`,
  DELETE_PLAYER_ERROR: (status: number, id: number) => `Error ${status}: No se pudo eliminar el jugador con id ${id}`,

  UNKNOWN_ERROR: (message: string) => message ? `${message}` : "Error desconocido",
  // UNKNOWN_ERROR: "Error desconocido",
  NETWORK_ERROR: "Error de conexión"
}