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
    import.meta.env.VITE_API_BASE_URL = "http://test-api.test";
  });

  it.only("check success response from fetch", async ()=> {
    // Act
    // mock fetch success response
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
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
  
  it.only("check HTTP error response from fetch", async ()=> {
    // Act
    // mock fetch server returns error response
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue({
      ok: false,
      status: 500,
    }))
    
    // call composable
    const { statusMessage, color, icon, hasRun } = await runCheckHealth();

    // Assert
    expect(statusMessage.value).toContain("Error de conexión");
    expect(color.value).toBe("error");
    expect(icon.value).toBe("faCircleExclamation");
    expect(hasRun.value).toBe(true);
  });

  it.only("check network error response from fetch", async ()=> {
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

