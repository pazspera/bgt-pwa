import { describe, it, expect, vi, afterEach } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockSinglePlayer } from "../mocks/data/playersApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayerApi } from "./usePlayerApi";
import { expectSharedInitialState, expectLoadingState, expectSharedEndState } from "../tests/utils/apiComposables";
import { updateRelative } from "vuetify/lib/labs/VCalendar/util/timestamp";

describe("usePlayerApi", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  describe("fetchPlayer", ()=> {
    it("success: loads player, updates loading status", async ()=> {
      const getPlayerSpy = vi.spyOn(PlayerApiService, "getPlayer").mockResolvedValueOnce(mockSinglePlayer);

      const { player, loading, error, fetchPlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = fetchPlayer(mockSinglePlayer.id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(getPlayerSpy, loading.value);
      expect(error.value).toBeNull();
      expect(player.value).toEqual(mockSinglePlayer);
    });

    it("error (404): updates loading and error", async ()=> {
      const getPlayerSpy = vi.spyOn(PlayerApiService, "getPlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(mockSinglePlayer.id)));

      const { player, loading, error, fetchPlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = fetchPlayer(mockSinglePlayer.id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(getPlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(mockSinglePlayer.id));
    });

    it("error (500): updates loading and error", async ()=> {
      const getPlayerSpy = vi.spyOn(PlayerApiService, "getPlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.GET_PLAYER_FAILED(500, mockSinglePlayer.id)));

      const { player, loading, error, fetchPlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = fetchPlayer(mockSinglePlayer.id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(getPlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.GET_PLAYER_FAILED(500, mockSinglePlayer.id));
    });

    it("network error: updates loading and error", async ()=> {
      const getPlayerSpy = vi.spyOn(PlayerApiService, "getPlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { player, loading, error, fetchPlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = fetchPlayer(mockSinglePlayer.id);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(getPlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
    });
  });
  
  describe("updatePlayer", ()=> {
    const updatedPlayer = {
      ...mockSinglePlayer,
      name: "Zeuchi updated"
    }

    const udpateRequest = {
      name: "Zeuchi updated",
    }

    it("success: player updated correctly, loading status updated", async ()=> {
      const updatePlayerSpy = vi.spyOn(PlayerApiService, "updatePlayer").mockResolvedValueOnce(updatedPlayer);

      const { loading, error, updated, player, updatePlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(updated.value).toBe(false);
      expect(player.value).toBeNull();

      const promise = updatePlayer(updatedPlayer.id, udpateRequest);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(updatePlayerSpy, loading.value);
      expect(error.value).toBeNull();
      expect(updated.value).toBe(true);
      expect(player.value).toEqual(updatedPlayer)
    });


    it("error (404): updates loading and error", async ()=> {
      const updatePlayerSpy = vi.spyOn(PlayerApiService, "updatePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.UPDATE_PLAYER_NOT_FOUND(404, updatedPlayer.id)));

      const { loading, error, updated, player, updatePlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = updatePlayer(updatedPlayer.id, udpateRequest);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(updatePlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.UPDATE_PLAYER_NOT_FOUND(404, updatedPlayer.id));
      expect(player.value).toBeNull();
      expect(updated.value).toBe(false);
    });

    it("error (500): updates loading and error", async ()=> {
      const updatePlayerSpy = vi.spyOn(PlayerApiService, "updatePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(500)));

      const { loading, error, updated, player, updatePlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = updatePlayer(updatedPlayer.id, udpateRequest);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(updatePlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(500));
      expect(player.value).toBeNull();
      expect(updated.value).toBe(false);
    });

    it("network error: updates loading and error", async ()=> {
      const updatePlayerSpy = vi.spyOn(PlayerApiService, "updatePlayer").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

      const { loading, error, updated, player, updatePlayer } = usePlayerApi();

      expectSharedInitialState(loading.value, error.value);
      expect(player.value).toBeNull();

      const promise = updatePlayer(updatedPlayer.id, udpateRequest);

      expectLoadingState(loading.value, error.value);

      await promise;

      expectSharedEndState(updatePlayerSpy, loading.value);
      expect(error.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
      expect(player.value).toBeNull();
      expect(updated.value).toBe(false);
    });
  });
})