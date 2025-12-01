// Types para la API real de players

export interface PlayerApiResponse {
  id: string;
  name: string;
  user_id?: string;
  is_registered: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlayersListResponse {
  total: number;
  limit: number;
  offset: number;
  data: PlayerApiResponse[];
}

export interface CreatePlayerRequest {
  name: string;
}

export interface UpdatePlayerRequest {
  name: string;
}

// Type guards
export function isPlayerApiResponse(obj: any): obj is PlayerApiResponse {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.is_registered === 'boolean' &&
    typeof obj.created_at === 'string'
  );
}
