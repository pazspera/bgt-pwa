export const getBoardgameComplexity = (complexity: number) => {
  if(complexity <=2) return "Juego casual";
  if(complexity <=3.5) return "Para jugadorxs habituales";
  return "Para jugadorxs experimentados"
}