import { describe, it, expect, vi, afterEach } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockPlayersApi, mockPlayersListResponse } from "../mocks/data/playersApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayersApi } from "./usePlayersApi";
import { CreatePlayerRequest, PlayerApiResponse } from "../types/domain/playerApi";
import { tryOnBeforeMount } from "@vueuse/core";

const expectSharedInitialState = (loading, error) => {
  expect(loading).toBe(false);
  expect(error).toBeNull();
}

const expectLoadingState = (loading, error) => {
  expect(loading).toBe(true);
  expect(error).toBeNull();
}

const expectSharedEndState = (spyFunction, loading) => {
  expect(spyFunction).toHaveBeenCalledTimes(1);
  expect(loading).toBe(false);
}

describe("usePlayersApi", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  describe("fetchPlayers", ()=> {    
    it("success: loads all players, updates loading status", async()=> {
      // mock API service
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockResolvedValueOnce(mockPlayersListResponse);

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectSharedInitialState(loading.value, error.value);
      expect(players.value).toEqual([]);

      const promise = fetchPlayers();
      
      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expectSharedEndState(getPlayersSpy, loading.value);
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
      expectSharedInitialState(loading.value, error.value);
      expect(players.value).toEqual([]);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expectSharedEndState(getPlayersSpy, loading.value);
      expect(error.value).toBeNull();
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });

    it("internal server error (500): updates error and loading", async()=> {
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500)));

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectSharedInitialState(loading.value, error.value);
      expect(players.value).toEqual([]);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expectSharedEndState(getPlayersSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500));
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });

    it("network error: updates error and loading", async()=> {
      const getPlayersSpy = vi.spyOn(PlayerApiService, "getPlayers").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

      // test initial state
      expectSharedInitialState(loading.value, error.value);
      expect(players.value).toEqual([]);

      const promise = fetchPlayers();

      // starts loading and resets errors
      expectLoadingState(loading.value, error.value);

      await promise;

      // test end state
      expectSharedEndState(getPlayersSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
      expect(totalPlayers.value).toBe(0);
      expect(players.value).toEqual([]);
    });
  });

  describe("createPlayer", ()=> {
    const mockPlayer: PlayerApiResponse = { 
      name: "Super Mega Zeuchi",
      id: "47144f8b-9705-41b2-9556-17ff1ac5193e",
      is_registered: false,
      created_at: "2025-12-23T15:03:06.576636563Z",
      updated_at: "0001-01-01T00:00:00Z"  
    };
    const playerToCreate: CreatePlayerRequest = { name: "Super Mega Zeuchi" };
    
    it("success: creates player, updates loading status", async()=> {
      // create mock data with the player that returns
      // IT RETURNS PlayerApiResponse
      // create spy for createPlayer
      // destructure what i need from the function
      // initial state
      // call function
      // loading state
      // await promise
      // test end state, the player that was sent should equal the mock
      const createPlayerSpy = vi.spyOn(PlayerApiService, "createPlayer").mockResolvedValueOnce(mockPlayer);

      const { loading, error, newPlayer, createPlayer } = usePlayersApi();
      
      expectSharedInitialState(loading.value, error.value);
      expect(newPlayer.value).toBeNull();

      const promise = createPlayer(playerToCreate);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(createPlayerSpy, loading.value);
      expect(error.value).toBeNull();
      expect(newPlayer.value).toEqual(mockPlayer);
    });

    it("error: updates error and loading, returns null for player", async()=> {
      const createPlayerSpy = vi.spyOn(PlayerApiService, "createPlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(500)));

      const { loading, error, createPlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);

      const promise = createPlayer(playerToCreate);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(createPlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(500));
    });

    it("network error: updates error and loading", async()=> {
      const createPlayerSpy = vi.spyOn(PlayerApiService, "createPlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { loading, error, createPlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);

      const promise = createPlayer(playerToCreate);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(createPlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
    });
  });

  describe("deletePlayer", ()=> {
    const id = "333";

    it("success: deleted, loading and error update correctly", async()=> {
      const deletePlayerSpy = vi.spyOn(PlayerApiService, "deletePlayer").mockResolvedValueOnce(true);

      const { loading, error, deleted, deletePlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);
      expect(deleted.value).toBe(false);

      const promise = deletePlayer(id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(deletePlayerSpy, loading.value);
      expect(deleted.value).toBe(true);
      expect(error.value).toBeNull();
    });

    it("error not found(404): updates error and loading", async()=> {
      const deletePlayerSpy = vi.spyOn(PlayerApiService, "deletePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.DELETE_PLAYER_NOT_FOUND(id)));

      const { loading, error, deleted, deletePlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);
      expect(deleted.value).toBe(false);

      const promise = deletePlayer(id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(deletePlayerSpy, loading.value);
      expect(deleted.value).toBe(false);
      expect(error.value).toBe(API_ERROR_MESSAGES.DELETE_PLAYER_NOT_FOUND(id));
    });

    it("internal server error (500): updates error and loading", async()=> {
      const deletePlayerSpy = vi.spyOn(PlayerApiService, "deletePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.DELETE_PLAYER_ERROR(500, id)));

      const { loading, error, deleted, deletePlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);
      expect(deleted.value).toBe(false);

      const promise = deletePlayer(id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(deletePlayerSpy, loading.value);
      expect(deleted.value).toBe(false);
      expect(error.value).toBe(API_ERROR_MESSAGES.DELETE_PLAYER_ERROR(500, id));
    });

    it("network error: updates error and loading", async()=> {
      const deletePlayerSpy = vi.spyOn(PlayerApiService, "deletePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { loading, error, deleted, deletePlayer } = usePlayersApi();

      expectSharedInitialState(loading.value, error.value);
      expect(deleted.value).toBe(false);

      const promise = deletePlayer(id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(deletePlayerSpy, loading.value);
      expect(deleted.value).toBe(false);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
    });
  })

})

