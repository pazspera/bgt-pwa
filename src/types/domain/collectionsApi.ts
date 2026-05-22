export interface CollectionsApiResponse {
  id: string,
  name: string,
  bgg_id: number,
  description: string,
  min_players: number,
  max_players: number,
  playing_time: number,
  complexity: number,
  created_at: string,
  updated_at: string,
}

export interface CollectionsListResponse {
  id: string,
  name: string,
  description: string,
  created_by: string,
  is_primary: boolean,
  created_at: string,
  updated_at: string,
  games: CollectionsApiResponse[],
}