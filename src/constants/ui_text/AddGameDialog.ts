export const AddGameDialogText = {
  title: "Nueva partida",
  labels: {
    selectDate: "Fecha",
    selectPlayers: "¿Quiénes jugaron?",
    selectWinner: "¿Quién ganó?",
    notes: "Notas"
  },
  hints: {
    selectPlayers: "Podés elegir más de un jugador",
  },
  buttons: {
    save: "Guardar partida",
    cancel: "Cancelar",
    retryFirstTry: "Reintentar",
    retrySecondTry: "Recargar"
  },
  errors: {
    failedLoadTitleFirst: "¡Oh, no! Ocurrió un error",
    failedLoadTitleSecond: "No sos vos, somos nosotrxs",
    loadFirstTry: "Algo falló en el camino, probá otra vez.",
    loadSecondTry: "Empecemos de nuevo. Por favor, recargá la página."
  },
  validationErrors: {
    dateRequired: "La fecha es obligatoria",
    dateMax: "No podemos guardar partidas del futuro",
    playersMin: (minPlayers: number) => `Agregá al menos ${minPlayers} jugadores`,
    playersMax: (maxPlayers: number) => `Podés agregar hasta ${maxPlayers} jugadores`,
    winnerRequired: "Elegí quién ganó la partida",
    notesMax: "Las notas son demasiado extensas"
  }
}