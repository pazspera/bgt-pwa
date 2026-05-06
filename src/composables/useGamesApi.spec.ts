import { it, vi, describe, afterEach, expect } from "vitest";
import * as GamesApiService from "../api/gameApiService";
import { useGamesApi } from "./useGamesApi";
import { mockNewGameRequest, mockCreatedGameResponse } from "../mocks/data/gameApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { expectSharedInitialState, expectLoadingState, expectSharedEndState } from "../tests/utils/apiComposables";

describe("useGamesApi", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe("saveGame", ()=> {

    it.only("success: saves new game, updates loading, no errors", async () => {
      // mockear respuesta del saved game
      // desestructurar useGamesApi con lo que necesito
      // check shared initial status
      // check que newGame sea null
      // hacer llamada a saveGame
      // check shared loading status
      // await la llamada
      // check shared end status
      // confirmar que new game sea igual a la rta mockeada
      // confirmar error en null
      const spyCreateGame = vi.spyOn(GamesApiService, "createGame").mockResolvedValueOnce(mockCreatedGameResponse);
      const { loading, errorSaveGame, newGame, saveGame } = useGamesApi();

      expectSharedInitialState(loading.value, errorSaveGame.value);
      expect(newGame.value).toBeNull();

      const result = saveGame(mockNewGameRequest);
      expectLoadingState(loading.value, errorSaveGame.value);

      await result;

      expectSharedEndState(spyCreateGame, loading.value);
      expect(newGame.value).toEqual(mockCreatedGameResponse);
      expect(errorSaveGame.value).toBeNull();
    });

    // para casos de error
    // mockear rta rejected con throw error correspondiente
    // desestructurar useGamesApi
    // expect initial state y que newGame sea null
    // guardar llamada a saveGame en const
    // expect loading state
    // await llamada en un try/catch
    // expect end state
    // confirmar que el error sea el mismo
    // confirmar que newGame sea null
    it.only("error: bad request (400)", async () => {
      const errorMessage = API_ERROR_MESSAGES.CREATE_GAME_ERROR(400);
      const spyCreateGame = vi.spyOn(GamesApiService, "createGame").mockRejectedValue(new Error(errorMessage));
      const { loading, errorSaveGame, newGame, saveGame } = useGamesApi();

      expectSharedInitialState(loading.value, errorSaveGame.value);
      expect(newGame.value).toBeNull();

      const response = saveGame(mockNewGameRequest);
      expectLoadingState(loading.value, errorSaveGame.value);

      try {
        await response;
      } catch (error) {}

      expectSharedEndState(spyCreateGame, loading.value);
      expect(errorSaveGame.value).toBe(errorMessage);
      expect(newGame.value).toBeNull();
    });

    it.only("error: internal server error (500)", async () => {
      const errorMessage = API_ERROR_MESSAGES.CREATE_GAME_ERROR(500);
      const spyCreateGame = vi.spyOn(GamesApiService, "createGame").mockRejectedValueOnce(new Error(errorMessage));
      const { loading, errorSaveGame, newGame, saveGame } = useGamesApi();

      expectSharedInitialState(loading.value, errorSaveGame.value);
      expect(newGame.value).toBeNull();

      const response = saveGame(mockNewGameRequest);
      expectLoadingState(loading.value, errorSaveGame.value);

      try {
        await response;
      } catch (error) {};

      expectSharedEndState(spyCreateGame, loading.value);
      expect(errorSaveGame.value).toBe(errorMessage);
      expect(newGame.value).toBeNull();
    });

    it.only("error: network error ", async () => {
      const errorMessage = API_ERROR_MESSAGES.NETWORK_ERROR;
      const spyCreateGame = vi.spyOn(GamesApiService, "createGame").mockRejectedValueOnce(new Error(errorMessage));
      const { loading, errorSaveGame, newGame, saveGame } = useGamesApi();

      expectSharedInitialState(loading.value, errorSaveGame.value);
      expect(newGame.value).toBeNull();

      const response = saveGame(mockNewGameRequest);
      expectLoadingState(loading.value, errorSaveGame.value);

      try {
       await response; 
      } catch (error) { };

      expectSharedEndState(spyCreateGame, loading.value);
      expect(errorSaveGame.value).toBe(errorMessage);
      expect(newGame.value).toBeNull();
    });
  })
})