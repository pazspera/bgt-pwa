import { describe, it, expect, vi } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockPlayers } from "../mocks/data/players";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayersApi } from "./usePlayersApi";

describe("usePlayersApi", ()=> {
  const runUsePlayers = () => {
    const { players, totalPlayers, newPlayer, loading, error, fetchPlayers, createPlayer, deletePlayer } = usePlayersApi();
  }

  describe("fetchPlayers", ()=> {
    it.only("success: loads all players, updates loading status", async()=> {
      // mock API service
      vi.spyOn(PlayerApiService, "getPlayers").mockResolvedValueOnce({
        total: 2,
        limit: 10,
        offset: 0,
        data: mockPlayers,
      })
    });

    it("error not found (404): updates error and loading, returns empty array for players", async()=> {});
    it("internal server error (500): updates error and loading", async()=> {});
    it("network error: updates error and loading", async()=> {});
  });

  describe("createPlayer", ()=> {
    it("success: loads requested player, updates loading status", async()=> {});
    it("error not found (404): updates error and loading, returns null for player", async()=> {});
    it("internal server error (500): updates error and loading", async()=> {});
    it("network error: updates error and loading", async()=> {});
  });

  describe("deletePlayer", ()=> {
    it.each([200,204])("success: delete updates loading status", async()=> {});
    it("error not found(404): updates error and loading", async()=> {});
    it("internal server error (500): updates error and loading", async()=> {});
    it("network error: updates error and loading", async()=> {});
  })

})

