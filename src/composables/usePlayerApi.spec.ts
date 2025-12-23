import { describe, it, expect } from "vitest";
import * as PlayerApiService from "../api/playerApiService";
import { mockPlayersApi, mockPlayersListResponse } from "../mocks/data/playersApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { usePlayerApi } from "./usePlayerApi";

describe("usePlayerApi", ()=> {

  describe("fetchPlayer", ()=> {
    it.todo("success: loads player, updates loading status", ()=> {});
    it.todo("error (404): updates loading and error", ()=> {});
    it.todo("error (500): updates loading and error", ()=> {});
    it.todo("network error: updates loading and error", ()=> {});
  });
  
  describe("updatePlayer", ()=> {
    it.todo("success: player updated correctly, loading status updated", ()=> {});
    it.todo("error (404): updates loading and error", ()=> {});
    it.todo("error (500): updates loading and error", ()=> {});
    it.todo("network error: updates loading and error", ()=> {});
  });
})