export interface PlayerApiResponse {
  id: string,
  name: string,
  user_id?: string,
  is_registered: boolean,
  created_at: string,
  updated_at: string,
}

export interface PlayersListResponse {
  total: number,
  limit: number,
  offset: number,
  data: PlayerApiResponse[];
}

export interface CreatePlayerRequest {
  name: string,
}

export interface UpdatePlayerRequest {
  name: string,
}