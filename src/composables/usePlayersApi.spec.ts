import { describe, it, expect, vi, afterEach } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockPlayersApi, mockPlayersListResponse } from "../mocks/data/playersApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayersApi } from "./usePlayersApi";


describe("usePlayersApi", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  describe("fetchPlayers", ()=> {
    it.only("success: loads all players, updates loading status", async()=> {
      // mock API service
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockResolvedValueOnce(mockPlayersListResponse);

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expect(loading.value).toBe(false);
      expect(players.value).toEqual([]);

      const promise = fetchPlayers();
      
      // starts loading and resets errors
      expect(loading.value).toBe(true);
      expect(error.value).toBeNull();

      await promise;

      // test end state
      expect(getPlayersSpy).toHaveBeenCalledTimes(1);
      expect(loading.value).toBe(false);
      expect(error.value).toBeNull();
      expect(totalPlayers.value).toBe(mockPlayersListResponse.total);
      expect(players.value).toEqual(mockPlayersApi);
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

