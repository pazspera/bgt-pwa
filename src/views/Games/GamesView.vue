<script setup lang="ts">
import { useGamesApi } from "../../composables/useGamesApi";
import { onBeforeMount } from "vue";
import { CreateGameRequest } from "../../types/domain/gamesApi";
import TypographyChart from "../../components/molecules/TypographyChart.vue";

defineOptions({ name: "GamesView" });

onBeforeMount(async ()=> {
const today = new Date().toISOString();
console.log(today);

const { loading, newGame, errorSaveGame, saveGame } =  useGamesApi();

const exampleNewGame: CreateGameRequest = {
  boardgame_id: "bcae2afc-f027-489d-8f70-fd8f79d10533",
  collection_id: "b6acc73a-6b7a-4c67-937a-e1a6169f173f",
  player_group_id: null,
  start_date: today,
  end_date: null,
  notes: "Guardando una nueva partida",
  players: [
    {
      player_id: "3a28cf09-0506-4d1d-aba7-414702eb690c",
      is_winner: true,
    },
    {
      player_id: "2b0164f7-1a93-491e-aced-ba04c4034157",
      is_winner: false,
    }
  ]
}

console.log(exampleNewGame);

await saveGame(exampleNewGame);
console.log(`loading: ${loading.value}`)
console.log(`newGame:`)
console.log(newGame.value)
console.log(`errorSaveGame: ${errorSaveGame.value}`);

})

</script>

<template>
  <v-container class="mt-4">
    <h1>Partidas</h1>
    <typography-chart></typography-chart>
  </v-container>
</template>

<style scoped></style>
