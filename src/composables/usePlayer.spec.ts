import { it, describe, expect, afterEach, vi } from "vitest";
import { usePlayer } from "./usePlayer";
import * as PlayerService from "../api/playerService";
import { mockPlayers } from "../mocks/data/players";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

const getPlayerSpy = vi.spyOn(PlayerService, "getPlayer");

const runUsePlayer = ()=> {
  const { player, loading, error, fetchPlayer } = usePlayer();
  return { player, loading, error, fetchPlayer }
}

describe("usePlayer", ()=> {
  it("sucess response: loads requested player, updates loading status", async ()=> {
    // mocked response
    const playerId = 1;
    const mockedPlayer = mockPlayers.find(p => p.id === playerId);
    
    getPlayerSpy.mockResolvedValue(mockedPlayer);

    const { player, loading, error, fetchPlayer } = runUsePlayer();

    // test initial state
    expect(loading.value).toBe(false);
    expect(player.value).toBeNull();
    
    const promise = fetchPlayer(playerId);
    expect(loading.value).toBe(true);

    await promise;

    // test end state
    expect(getPlayerSpy).toHaveBeenCalledTimes(1);
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
    expect(player.value).toEqual(mockedPlayer);
  });

  it("error response: updates error message when player not found", async ()=> {
    const playerId = 999;
    const errorMessage = API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(playerId);
    getPlayerSpy.mockRejectedValue(new Error(errorMessage));

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: async ()=> ({}),
      text: async ()=> "Not Found"
    } as Response);

    const { player, loading, error, fetchPlayer } = runUsePlayer();

    // test initial state
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();

    const promise = fetchPlayer(playerId);
    expect(loading.value).toBe(true);

    // the promise must reject, but if the error is not 
    // captured, it overwrites the error that's
    // being tested
    try {
      await promise;
    } catch(e) {}

    // test end state
    expect(loading.value).toBe(false);
    expect(player.value).toBeNull();
    expect(error.value).toBe(errorMessage);
  });

  it("error response: updates error message in case of network error", async ()=> {
    const playerId = 999;
    const errorMessage = API_ERROR_MESSAGES.NETWORK_ERROR;
    getPlayerSpy.mockRejectedValue(new Error(errorMessage));

    vi.spyOn(global, "fetch").mockRejectedValue(new Error(errorMessage));

    const { player, loading, error, fetchPlayer } = runUsePlayer();

    // test initial state
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();

    const promise = fetchPlayer(playerId);
    expect(loading.value).toBe(true);

    // the promise must reject, but if the error is not 
    // captured, it overwrites the error that's
    // being tested
    try {
      await promise;
    } catch(e) {}

    // test end state
    expect(loading.value).toBe(false);
    expect(player.value).toBeNull();
    expect(error.value).toBe(errorMessage);
  });

  afterEach(()=> {
    vi.restoreAllMocks();
  })
})