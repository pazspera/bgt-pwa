export interface GameApiResponse {
  boardgame_id: string,
  notes: string,
  boardgame_name: string,
  start_date?: string,
  end_date?: string,
  players: PlayerInGame[],
  
  // PROPS NOT USED
  // se usa el collection_id?
  // si, se usa. viene en la rta, es el id de CollectionsListResponse
  // collection_id: string,
  // player_group?: string | null,
}

export interface GamesListResponse {
  total: number,
  limit: number,
  offset: number,
  data: GameApiResponse[],
}

export interface PlayerInGame {
  player_id: string,
  is_winner: boolean,
  // agregaría el name para no tener que 
  // hacer una 2da request para buscarlo
  // o el player entero
  is_registered?: boolean,
}

export interface CreateGameRequest {
  boardgame_id: string,
  collection_id: string,
  player_group_id?: string | null,
  start_date: string,
  end_date: string,
  notes: string,
  players: PlayerInGame[],
}