import { describe, it, expect, vi, afterEach } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockSinglePlayer } from "../mocks/data/playersApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayerApi } from "./usePlayerApi";
import { expectSharedInitialState, expectLoadingState, expectSharedEndState } from "../tests/utils/apiComposables";

describe("usePlayerApi", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  describe("fetchPlayer", ()=> {
    it.only("success: loads player, updates loading status", async ()=> {
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

    it.todo("error (404): updates loading and error", async ()=> {});
    it.todo("error (500): updates loading and error", async ()=> {});
    it.todo("network error: updates loading and error", async ()=> {});
  });
  
  describe("updatePlayer", ()=> {
    it.todo("success: player updated correctly, loading status updated", ()=> {});
    it.todo("error (404): updates loading and error", async ()=> {});
    it.todo("error (500): updates loading and error", async ()=> {});
    it.todo("network error: updates loading and error", async ()=> {});
  });
})