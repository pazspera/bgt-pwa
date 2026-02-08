import type { PlayerApiResponse, PlayersListResponse } from "../../types/domain/playerApi"
export const mockPlayersApi: PlayerApiResponse[] = [
  { 
    id: "1", 
    name: "Zeuchi", 
    created_at: "1999-10-10-0:00:00Z",
    updated_at: "1999-10-10-0:00:00Z",
    is_registered: false,
  },
  { 
    id: "2", 
    name: "Mareita", 
    created_at: "1999-10-10-0:00:00Z",
    updated_at: "1999-10-10-0:00:00Z",
    is_registered: false,
  },
  { 
    id: "3", 
    name: "Pini", 
    created_at: "1999-10-10-0:00:00Z",
    updated_at: "1999-10-10-0:00:00Z",
    is_registered: false,
  },
  { 
    id: "4", 
    name: "Paz", 
    created_at: "1999-10-10-0:00:00Z",
    updated_at: "1999-10-10-0:00:00Z",
    is_registered: false,
  },
]

export const mockPlayersListResponse: PlayersListResponse = {
  total: mockPlayersApi.length,
  limit: mockPlayersApi.length,
  offset: 0,
  data: mockPlayersApi,
}

export const mockSinglePlayer: PlayerApiResponse = { 
  id: "1", 
  name: "Zeuchi", 
  created_at: "1999-10-10-0:00:00Z",
  updated_at: "1999-10-10-0:00:00Z",
  is_registered: false,
};

export const mockRegisteredSinglePlayer: PlayerApiResponse = { 
  id: "1", 
  name: "Zeuchi", 
  created_at: "1999-10-10-0:00:00Z",
  updated_at: "1999-10-10-0:00:00Z",
  is_registered: true,
};

