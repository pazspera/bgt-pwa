import { describe, it, expect, vi, afterEach } from "vitest";
import { getPlayers, getPlayer, deletePlayer } from "./playerApiService";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import type { PlayersListResponse, PlayerApiResponse } from "../types/domain/playerApi";
import { mockPlayers } from "../mocks/data/players";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe("playerApiService: getPlayers()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  it("success: returns list of all players", async ()=> {
    const mockResponse: PlayersListResponse = {
      total: 2,
      limit: 10,
      offset: 0,
      data: [
        {
          id: "1",
          name: "Zeuchi",
          is_registered: true,
          created_at: "2025-01-01T10:00:00Z",
          updated_at: "2025-01-02T10:00:00Z",
        },
        {
          id: "2",
          name: "Mareita",
          is_registered: true,
          created_at: "2025-01-03T10:00:00Z",
          updated_at: "2025-01-04T10:00:00Z",
        },
      ],
    };

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response)

    const result = await getPlayers();

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/players`, { method: "GET" });
  });
  
  it("error: resource not found (404)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(getPlayers()).rejects.toThrow(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(404));
  });
  
  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getPlayers()).rejects.toThrow(API_ERROR_MESSAGES.GET_PLAYERS_FAILED(500));
  });
  
  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(getPlayers()).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR);
  });

})

describe("playerApiService: getPlayer()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  const mockResponse: PlayerApiResponse = {
    id: "1",
    name: "Zeuchi",
    is_registered: false,
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-02T10:00:00Z",
  };

  it("success: return requested player", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response);

    const result = await getPlayer(mockResponse.id);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/players/${mockResponse.id}`, { method: "GET" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("error: player not found (404)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(getPlayer(mockResponse.id)).rejects.toThrow(API_ERROR_MESSAGES.GET_PLAYER_NOT_FOUND(mockResponse.id));
  });

  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(getPlayer(mockResponse.id)).rejects.toThrow(API_ERROR_MESSAGES.GET_PLAYER_FAILED(500, mockResponse.id));
  });

  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));
  });
})

describe("playerApiService: deletePlayer()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it.each([200, 204])("success: delete returns %s", async (status) => {
    const playerId = "123";

    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status,
    } as unknown as Response);

    const result = await deletePlayer(playerId);

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/players/${playerId}`, { method: "DELETE" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
    expect([200, 204]).toContain(status);
  });
  
  it.todo("error: requested player not found (404)", async ()=> {});

  it.todo("error: internal server error (500)", async ()=> {});

  it.todo("error: network error", async ()=> {});
})