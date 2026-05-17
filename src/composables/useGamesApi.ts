import * as GamesApiService from "@/api/gameApiService";
import { ref, type Ref } from "vue";
import { CreateGameRequest, GameApiResponse, GamesListResponse } from "@/types/domain/gamesApi";

export function useGamesApi() {
  const loading: Ref<boolean> = ref(false);
  const newGame: Ref<GameApiResponse | null> = ref(null);
  const gamesList: Ref<GamesListResponse | null> = ref(null);
  const errorSaveGame: Ref<string | null> = ref(null);
  const errorGetGames: Ref<string | null> = ref(null);
  const errorDeleteGame: Ref<string | null> = ref(null);
  const deleted: Ref<boolean> = ref(false);

  const currentPage: Ref<number> = ref(1);
  const itemsPerPage: Ref<number> = ref(12);
  const totalPages: Ref<number> = ref(0);

  const saveGame = async (gameData: CreateGameRequest) => {
    loading.value =  true;
    errorSaveGame.value = null;

    try {
      const response = await GamesApiService.createGame(gameData);
      newGame.value = response;
      return response;
    } catch (err) {
      errorSaveGame.value = err.message;
      throw err;
    } finally { 
      loading.value = false;
    }
  }

  const getGames = async (limit?: number, offset?: number) => {
    loading.value = true;
    errorGetGames.value = null;

    try {
      const response = await GamesApiService.getGames(
        limit ?? itemsPerPage.value,
        offset ?? (currentPage.value - 1) * itemsPerPage.value
      );
      gamesList.value = response;
      console.log(gamesList.value);
      totalPages.value = Math.ceil(response.total / response.limit);
      return response;
    } catch (err) {
      errorGetGames.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  const deleteGame = async(id: string) => {
    loading.value = true;
    errorDeleteGame.value = null;

    try {
      await GamesApiService.deleteGame(id);
      deleted.value = true;
    } catch (err) {
      errorDeleteGame.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { loading, newGame, errorSaveGame, errorDeleteGame, deleted, gamesList, errorGetGames, currentPage, totalPages, itemsPerPage, saveGame, getGames, deleteGame }
}