import { it, describe, afterEach, vi, expect } from "vitest";
import { useCheckDbHealth } from "./useCheckDbHealth";
import { useServerTime } from "./useServerTime";
import { API_ERROR_MESSAGES } from "@/constants/apiErrorMessages";

describe("checkHealth()", () => {
  // Arrange
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  it("check success response from fetch and syncs server time", async ()=> {
    // Act
    const { timeOffset } = useServerTime();
    timeOffset.value = 0;
    const { checkHealth, statusMessage } = useCheckDbHealth();
    // mock fetch success response
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: ()=> Promise.resolve({ 
        status: "ok",
        message: "API is running",
        serverTime: "2026-01-21T17:35:43Z",
        version: "unknown"
      }),
    }));

    // call composable 
    const result = await checkHealth();

    // Assert
    expect(statusMessage.value).toBe(API_ERROR_MESSAGES.HEALTH_SUCCESS);
    expect(result).toBe(true);
    // checks useServerTime was called successfully
    expect(timeOffset.value).not.toBe(0);
    expect(typeof timeOffset.value).toBe("number");
  });
  
  it("check HTTP error response from fetch", async ()=> {
    // Act
    // mock fetch server returns error response
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }))
    
    // call composable
    const { checkHealth, statusMessage } = useCheckDbHealth();

    const result = await checkHealth();

    // Assert
    expect(result).toBe(false);
    expect(statusMessage.value).toBe(API_ERROR_MESSAGES.HEALTH_ERROR(500));
  });

  it("check network error response from fetch", async ()=> {
    // Act
    // mock network error response 
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Falló la conexión con el servidor")));

    // call composable
    const { checkHealth, statusMessage } = useCheckDbHealth();

    const result = await checkHealth();

    // Assert
    expect(result).toBe(false);
    expect(statusMessage.value).toBe(API_ERROR_MESSAGES.HEALTH_NETWORK_ERROR);
  })
})

