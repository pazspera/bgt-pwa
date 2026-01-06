export interface GameApiResponse {
  boardgame_id: string,
  // se usa el collection_id?
  collection_id: string,
  player_group?: string | null,
  start_date: string,
  end_date: string,
  notes: string,
  players: PlayerInGame[],
}

export interface PlayerInGame {
  player_id: string,
  is_winner: boolean,
  // agregaría el name para no tener que 
  // hacer una 2da request para buscarlo
  // o el player entero
}