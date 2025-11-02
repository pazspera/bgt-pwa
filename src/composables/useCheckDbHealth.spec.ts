import { it, describe, beforeEach, afterEach } from "vitest";
import { useCheckDbHealth } from "./useCheckDbHealth";

describe("checkHealth()", () => {
  // simulate env variable
  beforeEach(()=> {
    import.meta.env.VITE_API_BASE_URL = "http://test-api.test";
  });

  it.todo("check success response from fetch", {});
  
  it.todo("check error response from fetch", {});
})

