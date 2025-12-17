import { describe, it, expect, vi, afterEach } from "vitest";
import { getPlayers } from "./playerApiService";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import type { PlayersListResponse } from "../types/domain/playerApi";

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