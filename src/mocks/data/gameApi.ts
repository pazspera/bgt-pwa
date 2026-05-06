import { CreateGameRequest, CreatedGameResponse } from "../../types/domain/gamesApi"

export const mockNewGameRequest: CreateGameRequest = {
  boardgame_id: "bcae2afc-f027-489d-8f70-fd8f79d10533",
  collection_id: "b6acc73a-6b7a-4c67-937a-e1a6169f173f",
  player_group_id: null,
  start_date: "2026-01-16T15:48:47.565840519Z",
  end_date: null,
  notes: "Guardando una nueva partida",
  players: [
    {
      player_id: "3a28cf09-0506-4d1d-aba7-414702eb690c",
      is_winner: true,
    },
    {
      player_id: "2b0164f7-1a93-491e-aced-ba04c4034157",
      is_winner: false,
    }
  ]
}

export const mockCreatedGameResponse: CreatedGameResponse = { 
  id: "6b4ae664-0086-49c6-b938-2fc56cdb55e8",
  boardgame_id: "bcae2afc-f027-489d-8f70-fd8f79d10533",
  collection_id: "b6acc73a-6b7a-4c67-937a-e1a6169f173f",
  start_date: "2026-01-16T15:48:47.565840519Z",
  end_date: null,
  notes: "Guardando una nueva partida",
  duration: "2h15m0s",
  created_at: "2026-01-16T15:48:47.565840519Z",
  updated_at: "2026-01-16T15:48:47.565840519Z"
}