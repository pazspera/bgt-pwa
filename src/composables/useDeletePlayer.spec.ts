/* 
- add handler for DELETE player
- create deletePlayer() in playerService.ts (api)
- write useDeletePlayer composable

what does delete do?
- receives and id
- searchs for that id in the data
- deletes the object

situations that can happen:
- the id is found and deleted successfully
- the id is not found
- network error
*/
import { it, describe, expect, afterAll, vi, beforeEach } from "vitest";
import * as PlayerService from "../api/playerService";
import { useDeletePlayer, players } from "./useDeletePlayer";
import { mockPlayers } from "../mocks/data/players"; 
import { afterEach } from "node:test";

const deletePlayerSpy = vi.spyOn(PlayerService, "deletePlayer");

// reset players ref so it always starts with all players
beforeEach(()=> {
  players.value = JSON.parse(JSON.stringify(mockPlayers));
  deletePlayerSpy.mockClear();
})

describe("deletePlayer", ()=> {
  it.only("sucess response: deletes requested player, updates loading status", async ()=> {
    const playerId = 4;
    // mocks api success call
    deletePlayerSpy.mockResolvedValue(undefined);

    const { loading, error, deletePlayer } = useDeletePlayer(); 

    // checks playerId exists 
    expect(players.value.length).toBe(mockPlayers.length);

    // test initial state
    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();

    const promise = deletePlayer(playerId);
    expect(loading.value).toBe(true);

    await promise;

    // test end state
    expect(deletePlayerSpy).toHaveBeenCalledTimes(1);
    expect(deletePlayerSpy).toHaveBeenCalledWith(playerId);

    expect(loading.value).toBe(false);
    expect(error.value).toBeNull();
    
    const isDeletedPlayerPresent = players.value.find(p => p.id === playerId);
    expect(isDeletedPlayerPresent).toBeUndefined();
    expect(players.value.length).toBe(mockPlayers.length - 1);

    // initial state:
    // - loading: false
    // - error: null
    // promise calling deletePlayer(playerId)
    // loading changes to true
    // await promise
    // test end state:
    // - the spy should be called once
    // - loading should be false
    // - error should be null
    // - mockedPlayers shouldn't contain a player with the deleted id. use find(), if it doesn't find anything, it should be undefined
  }); 

  it.todo("error response: updates error message when player not found", ()=> {});

  it.todo("error response: network error", ()=> {});

  afterEach(()=> {
    vi.restoreAllMocks();
  })
})