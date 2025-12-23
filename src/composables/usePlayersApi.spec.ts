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
    const expectInitialState = (loading, players) => {
      expect(loading).toBe(false);
      expect(players).toEqual([]);
    }

    const expectLoadingState = (loading, error) => {
      expect(loading).toBe(true);
      expect(error).toBeNull();
    }
    
    it("success: loads all players, updates loading status", async()=> {
      // mock API service
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockResolvedValueOnce(mockPlayersListResponse);

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectInitialState(loading.value, players.value);

      const promise = fetchPlayers();
      
      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expect(getPlayersSpy).toHaveBeenCalledTimes(1);
      expect(loading.value).toBe(false);
      expect(error.value).toBeNull();
      expect(totalPlayers.value).toBe(mockPlayersListResponse.total);
      expect(players.value).toEqual(mockPlayersApi);
    });

    it("success no players: updates loading status and players with empty list", async()=> {
      // mock API service
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockResolvedValueOnce({
        total: 0,
        limit: 0,
        offset: 0,
        data: []
      });

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectInitialState(loading.value, players.value);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expect(getPlayersSpy).toHaveBeenCalledTimes(1);
      expect(loading.value).toBe(false);
      expect(error.value).toBeNull();
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });

    it("internal server error (500): updates error and loading", async()=> {
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500)));

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectInitialState(loading.value, players.value);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expect(getPlayersSpy).toHaveBeenCalledTimes(1);
      expect(loading.value).toBe(false);
      expect(error.value).toBe(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500));
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });

    it("network error: updates error and loading", async()=> {
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectInitialState(loading.value, players.value);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expect(getPlayersSpy).toHaveBeenCalledTimes(1);
      expect(loading.value).toBe(false);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });
  });

  describe("createPlayer", ()=> {
    it.todo("success: loads requested player, updates loading status", async()=> {});
    it.todo("error not found (404): updates error and loading, returns null for player", async()=> {});
    it.todo("internal server error (500): updates error and loading", async()=> {});
    it.todo("network error: updates error and loading", async()=> {});
  });

  describe("deletePlayer", ()=> {
    it.each([200,204])("success: delete updates loading status", async()=> {});
    it.todo("error not found(404): updates error and loading", async()=> {});
    it.todo("internal server error (500): updates error and loading", async()=> {});
    it.todo("network error: updates error and loading", async()=> {});
  })

})

