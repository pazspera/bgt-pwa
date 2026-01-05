import type { CollectionsListResponse, CollectionsApiResponse } from "../../types/domain/collectionsApi";

export const mockCollectionsApiResponse: CollectionsApiResponse = {
  id: "bcae2afc-f027-489d-8f70-fd8f79d10533",
  name: "7 Wonders",
  bgg_id: 68448,
  description: "Juego de desarrollo de civilización",
  min_players: 2,
  max_players: 7,
  playing_time: 45,
  complexity: 2.3,
  created_at: "2025-12-01T19:41:29.980407Z",
  updated_at: "2025-12-01T19:41:29.980407Z"
}

export const mockCollectionsListResponse: CollectionsListResponse = {
  id: "b6acc73a-6b7a-4c67-937a-e1a6169f173f",
  name: "Ludoteca default",
  description: "Mi ludoteca",
  created_by: "9482eacc-479b-4542-8bc5-5b2af5a4dc72",
  is_primary: true,
  created_at: "2025-12-02T13:20:37.599276Z",
  updated_at: "2025-12-02T13:25:31.244572Z",
  "games": [
    {
      id: "492d002e-76e3-4e72-a0ce-b739a4f4f86c",
      name: "Carcassonne",
      bgg_id: 822,
      description: "Juego de colocación de losetas",
      min_players: 2,
      max_players: 5,
      playing_time: 45,
      complexity: 1.9,
      created_at: "2025-12-01T19:41:29.980407Z",
      updated_at: "2025-12-01T19:41:29.980407Z"
    },
    {
      id: "bcae2afc-f027-489d-8f70-fd8f79d10533",
      name: "7 Wonders",
      bgg_id: 68448,
      description: "Juego de desarrollo de civilización",
      min_players: 2,
      max_players: 7,
      playing_time: 45,
      complexity: 2.3,
      created_at: "2025-12-01T19:41:29.980407Z",
      updated_at: "2025-12-01T19:41:29.980407Z"
    }
  ]
}

export const mockCollectionsEmptyListResponse: CollectionsListResponse = {
  id: "b6acc73a-6b7a-4c67-937a-e1a6169f173f",
  name: "Ludoteca default",
  description: "Mi ludoteca",
  created_by: "9482eacc-479b-4542-8bc5-5b2af5a4dc72",
  is_primary: true,
  created_at: "2025-12-02T13:20:37.599276Z",
  updated_at: "2025-12-02T13:25:31.244572Z",
  "games": []
}