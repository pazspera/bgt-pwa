export const PLAYER_STATUS = {
  CREATED: (name: string) => `Jugador ${name} creado correctamente`,
  UPDATED: (name: string) => `Jugador ${name} actualizad correctamente`,
  DELETED: (name: string) => `Jugador ${name} eliminado correctamente`,
  ERROR: {
    CREATE: "No se pudo crear el jugador",
    UPDATE: "No se pudo actualizar el jugador",
    DELETE  : "No se pudo eliminar el jugador",
  }
}