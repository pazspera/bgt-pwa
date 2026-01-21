import { it, describe, beforeEach, afterEach, vi, expect } from "vitest";
import { useCheckDbHealth } from "./useCheckDbHealth";

const runCheckHealth = async ()=> {
  const { checkHealth, statusMessage, color, icon, hasRun } = useCheckDbHealth();
  await checkHealth()
  return { statusMessage, color, icon, hasRun };
}

describe("checkHealth()", () => {
  // Arrange
  // simulate env variable
  beforeEach(()=> {
    import.meta.env.VITE_API_HEALTH_BASE_URL = "http://test-api.test";
  });

  afterEach(()=> {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  })

  it("check success response from fetch", async ()=> {
    // Act
    // mock fetch success response
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: vi.fn().mockReturnValue("Wed, 21 Jan 2026 12:00:00 GMT")
      },
      json: ()=> Promise.resolve({ status: "ok" }),
    }));

    // call composable
    const { statusMessage, color, icon, hasRun } = await runCheckHealth();

    // Assert
    expect(statusMessage.value).toBe("Conectado a la base de datos");
    expect(color.value).toBe("success");
    expect(icon.value).toBe("faCircleCheck");
    expect(hasRun.value).toBe(true);
  });
  
  it("check HTTP error response from fetch", async ()=> {
    // Act
    // mock fetch server returns error response
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: { 
        get: (key) => (key === "date" ? "Wed, 21 Jan 2026 12:00:00 GMT" : null) 
      },
    }))
    
    // call composable
    const { statusMessage, color, icon, hasRun } = await runCheckHealth();

    // Assert
    expect(statusMessage.value).toContain("Error de conexión");
    expect(color.value).toBe("error");
    expect(icon.value).toBe("faCircleExclamation");
    expect(hasRun.value).toBe(true);
  });

  it("check network error response from fetch", async ()=> {
    // Act
    // mock network error response 
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Falló la conexión con el servidor")));

    // call composable
    const { statusMessage, color, icon, hasRun } = await runCheckHealth();

    // Assert
    expect(statusMessage.value).toContain("Error de conexión");
    expect(color.value).toBe("error");
    expect(icon.value).toBe("faCircleExclamation");
    expect(hasRun.value).toBe(true);
  })

  afterEach(()=> {
    vi.restoreAllMocks();
  })
})

