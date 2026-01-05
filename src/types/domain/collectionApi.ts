export interface CollectionApiResponse {
  id: string,
  name: string,
  bgg_id: number,
  description: string,
  min_players: number,
  max_players: number,
  playing_time: number,
  complexity: number,
  create_at: string,
  updated_at: string,
}

export interface CollectionListResponse { 
  id: string,
  name: string,
  description: string,
  created_by: string,
  is_primary: string,
  created_at: string,
  updated_at: string,
  games: CollectionApiResponse[],
}