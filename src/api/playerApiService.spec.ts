import { describe, it, expect, vi, afterEach } from "vitest";
import { getPlayers, getPlayer, deletePlayer, createPlayer, updatePlayer } from "./playerApiService";
import { API_ERROR_MESSAGES } from "@/constants/apiErrorMessages";
import type { PlayersListResponse, PlayerApiResponse, CreatePlayerRequest, UpdatePlayerRequest } from "@/types/domain/playerApi";

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
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players?sortBy=created_at&order=asc`, { method: "GET" });
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
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players/${mockResponse.id}`, { method: "GET" });
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

  const playerId = "123";

  it.each([200, 204])("success: delete returns %s", async (status) => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status,
    } as unknown as Response);

    const result = await deletePlayer(playerId);

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players/${playerId}`, { method: "DELETE" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
    expect([200, 204]).toContain(status);
  });
  
  it("error: requested player not found (404)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as unknown as Response);

    await expect(deletePlayer(playerId)).rejects.toThrow(API_ERROR_MESSAGES.DELETE_PLAYER_NOT_FOUND(playerId));
  });

  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500
    } as unknown as Response);

    await expect(deletePlayer(playerId)).rejects.toThrow(API_ERROR_MESSAGES.DELETE_PLAYER_ERROR(500, playerId));
  });

  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(deletePlayer(playerId)).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR)
  });
})

describe("playerApiService: createPlayer()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  const newPlayer: CreatePlayerRequest = {
    name: "New Zeuchi 2.0",
  }

  const mockResponse: PlayerApiResponse = {
    id: "123",
    name: "New Zeuchi 2.0",
    is_registered: true,
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
  }

  it("success: returns 201 on created player", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    } as unknown as Response);

    const result = await createPlayer(newPlayer);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    })
  });

  it("error: bad request (400)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
    } as unknown as Response);

    await expect(createPlayer(newPlayer)).rejects.toThrow(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(400));
  });

  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500
    } as unknown as Response);

    await expect(createPlayer(newPlayer)).rejects.toThrow(API_ERROR_MESSAGES.CREATE_PLAYER_ERROR(500));
  });

  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(createPlayer(newPlayer)).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR);
  });
});

describe("playerApiService: updatePlayer()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  const playerId = "333";
  const updateData: UpdatePlayerRequest = { name: "Zeuchi, the one and only" };
  const mockResponse: PlayerApiResponse = {
    ...updateData,
    id: playerId,
    is_registered: true,
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-01-01T10:00:00Z",
  }
  
  it("success: returns updated player (200)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async ()=> mockResponse,
    } as unknown as Response);

    const result = await updatePlayer(playerId, updateData);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players/${playerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
  });

  it("success: no content (204)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 204,
    } as unknown as Response);

    const result = await updatePlayer(playerId, updateData);

    expect(result).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/players/${playerId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
  });

  it("error: bad request (400)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400
    } as unknown as Response);

    await expect(updatePlayer(playerId, updateData)).rejects.toThrow(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(400));
  });

  it("error: player not found (404)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false, 
      status: 404
    } as unknown as Response);

    await expect(updatePlayer(playerId, updateData)).rejects.toThrow(API_ERROR_MESSAGES.UPDATE_PLAYER_NOT_FOUND(404, playerId));
  });

  it("error: internal server error (500)", async ()=> {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false, 
      status: 500
    } as unknown as Response);

    await expect(updatePlayer(playerId, updateData)).rejects.toThrow(API_ERROR_MESSAGES.UPDATE_PLAYER_ERROR(500));
  });

  it("error: network error", async ()=> {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(updatePlayer(playerId, updateData)).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR);
  });
})