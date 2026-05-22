import { describe, it, vi, afterEach, beforeEach, expect } from "vitest";
import { mockNewGameRequest, mockCreatedGameResponse } from "@/mocks/data/gameApi";
import { createGame } from "./gameApiService";
import { API_ERROR_MESSAGES } from "@/constants/apiErrorMessages";
import { deleteGame } from "./gameApiService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe("gameApiService: createGame()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  it("success: creates new game", async ()=> {
    // use spyOn to mock on global fetch
    // on the spyOn
    //  set the mockResolvedValue to the response
    // call the function in the composable
    // await the result
    // check if tested function was called once and the paylod matches
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async ()=> mockCreatedGameResponse
    } as unknown as Response);

    const result = await createGame(mockNewGameRequest);

    expect(result).toEqual(mockCreatedGameResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/games`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(mockNewGameRequest)
    })
  });

  it("error: bad request (400)", async ()=> {
    // use spyOn to mock global fetch
    // mockResolvedValue con el ok false y status 400
    // call function to test and await result
    // check if it was called once and payload matches
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false, 
      status: 400,
    } as unknown as Response);
    
    await expect(createGame(mockNewGameRequest)).rejects.toThrow(API_ERROR_MESSAGES.CREATE_GAME_ERROR(400));
  });

  it("error: internal server error (500)", async ()=> {
    // spyOn mock global fetch
    // mockResolvedValue ok false y status 500
    // call function and await result
    // check called once and payload matches
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(createGame(mockNewGameRequest)).rejects.toThrow(API_ERROR_MESSAGES.CREATE_GAME_ERROR(500));
  });

  it("error: network error", async ()=> {
    // spyOn mock global fetch
    // mockRejectedValue with throw New Error network
    // call function and await result
    // check called once and paylod matches
    vi.spyOn(global, "fetch").mockRejectedValue(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(createGame(mockNewGameRequest)).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR);
  });
})

describe("gameApiService: deleteGame()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  const gameId = "exampleOfAGameId";

  it.each([200, 204])("success: delete returns %s", async (status)=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status,
    } as unknown as Response);

    const result = await deleteGame(gameId);

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/games/${gameId}`, { method: "DELETE" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it("error: requested game not found (404)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(deleteGame(gameId)).rejects.toThrow(API_ERROR_MESSAGES.DELETE_GAME_NOT_FOUND(gameId));
  });

  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(deleteGame(gameId)).rejects.toThrow(API_ERROR_MESSAGES.DELETE_GAME_ERROR(500, gameId));
  });

  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(deleteGame(gameId)).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR)
  });
})