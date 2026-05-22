export const PLAYER_STATUS = {
  CREATED: (name: string) => `Jugador ${name} creado correctamente`,
  UPDATED: (name: string) => `Jugador ${name} actualizado correctamente`,
  DELETED: (name: string) => `Jugador ${name} eliminado correctamente`,
  ERROR: {
    CREATE: "No se pudo crear el jugador",
    CREATE_ALREADY_EXISTS: (name: string) => `El jugador ${name} ya existe, intentá con otro nombre`,
    UPDATE: "No se pudo actualizar el jugador",
    DELETE: (name: string) => `No se pudo eliminar el jugador "${name}"`,
  }
}

export const CONFIRM_DELETE_PLAYER = {
  TITLE: "¿Estás segurx?",
  TEXT: (name: string) => `Vas a eliminar al jugador "${name}". Esta acción no puede revertirse.`,
  CONFIRM_BTN_TEXT: "Borrar jugador",
  CANCEL_BTN_TEXT: "Cancelar"
}