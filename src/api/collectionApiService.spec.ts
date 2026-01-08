import { it, vi, describe, expect, afterEach } from "vitest";
import { mockCollectionsListResponse } from "../mocks/data/collectionsApi";
import { getCollections } from "./collectionApiService";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe("collectionApiService: getCollections()", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  it("success: returns list of all boardgames", async()=> {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async ()=> mockCollectionsListResponse,
    } as unknown as Response);

    const result = await getCollections();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}v1/collections/primary/games`, { method: "GET" });
    expect(result).toEqual(mockCollectionsListResponse);
  });

  it("error: internal server error (500)", async()=> {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError(API_ERROR_MESSAGES.GET_COLLECTIONS_FAILED(500)));

    await expect(getCollections()).rejects.toThrow(API_ERROR_MESSAGES.GET_COLLECTIONS_FAILED(500));
  });

  it("error: network error", async()=> {
    vi.spyOn(global, "fetch").mockRejectedValue(new TypeError(API_ERROR_MESSAGES.NETWORK_ERROR));

    await expect(getCollections()).rejects.toThrow(API_ERROR_MESSAGES.NETWORK_ERROR);
  });
})