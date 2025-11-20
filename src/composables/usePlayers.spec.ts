import { it, describe, expect, vi, afterEach } from "vitest";
import { usePlayers } from "./usePlayers";
import * as PlayerService from "../api/playerService";
import { mockPlayers } from "../mocks/data/players";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

const getPlayersSpy = vi.spyOn(PlayerService, "getPlayers");

const runUsePlayers = ()=> {
  const { players, loading, error, fetch } = usePlayers();
  return { players, loading, error, fetch };
}
 
describe("usePlayers", ()=> {
  it("success response: loads all players, updates loading status", async ()=> {
    // configures spy to return mocked response
    getPlayersSpy.mockResolvedValue(mockPlayers);

    const { players, loading, error, fetch } = runUsePlayers();

    // test initial state
    expect(loading.value).toBe(false);
    expect(players.value).toEqual([]);

    const promise = fetch();
    expect(loading.value).toBe(true);

    await promise;

    // test end state
    expect(getPlayersSpy).toHaveBeenCalledTimes(1);
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
    expect(players.value.length).toBe(mockPlayers.length);
    expect(players.value).toEqual(mockPlayers);
  });


  it("service error: updates error and loading, returns empty array for players", async ()=> {
    const errorMessage = API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500);
    getPlayersSpy.mockRejectedValue(new Error(errorMessage));

    // need to mock the rejected value with the same message
    // as the real fetch in Node.js executes first and
    // overrides the error, causing the test to fail
    vi.spyOn(global, "fetch").mockRejectedValue(new Error(errorMessage));

    const { players, loading, error, fetch } = runUsePlayers();

    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();

    const promise = fetch();
    expect(loading.value).toBe(true);

    await promise;

    // test end state
    expect(loading.value).toBe(false);
    expect(players.value).toEqual([]);
    expect(error.value).toBe(errorMessage);
  });

  afterEach(()=> {
    vi.restoreAllMocks();
  })
})