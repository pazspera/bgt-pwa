export const API_ERROR_MESSAGES = {
  GET_PLAYERS_FAILED: (status: number) => `Error ${status}: No se pudieron obtener los jugadores`,

  GET_PLAYER_NOT_FOUND: (id: string) => `Jugador con id ${id} no existe`,
  GET_PLAYER_FAILED: (status: number, id: string) => `Error ${status}: No se pudo obtener el jugador con id ${id}`,

  DELETE_PLAYER_NOT_FOUND: (id: string) => `Jugador con id ${id} no encontrado para eliminar`,
  DELETE_PLAYER_ERROR: (status: number, id: string) => `Error ${status}: No se pudo eliminar el jugador con id ${id}`,

  CREATE_PLAYER_ERROR: (status: number) => `Error: ${status}: No se pudo crear el jugador`,

  UPDATE_PLAYER_ERROR: (status: number) => `Error: ${status}: No se pudo actualizar el jugador`,
  UPDATE_PLAYER_NOT_FOUND: (status: number, id: string) => `Jugador con id ${id} no encontrado`,

  UNKNOWN_ERROR: (message: string) => message ? `${message}` : "Error desconocido",
  
  NETWORK_ERROR: "Error de conexión",

  GET_COLLECTIONS_FAILED: (status: number) => `Error ${status}: No se pudo obtener la ludoteca`,
}