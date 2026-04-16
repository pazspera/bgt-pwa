<script setup lang="ts">
import { useGamesApi } from "../../composables/useGamesApi";
import { onBeforeMount } from "vue";
import { CreateGameRequest } from "../../types/domain/gamesApi";
import TypographyChart from "../../components/molecules/TypographyChart.vue";
import DisplayTitle from "../../components/atoms/typography/DisplayTitle.vue";

defineOptions({ name: "GamesView" });

const { loading, gamesList, errorGetGames, getGames } = useGamesApi();

onBeforeMount(async () => {
  await getGames();
  console.log(gamesList.value);
  console.log(errorGetGames.value);
})



</script>

<template>
  <v-container class="mt-4">
    <DisplayTitle>Partidas</DisplayTitle>
    <div v-if="gamesList">
      <div v-for="game in gamesList.data" :key="game.boardgame_id">
        <p>{{ game.start_date }}</p>
        <p>{{ game.notes }}</p>
      </div>
    </div>
    <TypographyChart></TypographyChart>
  </v-container>
</template>

<style scoped></style>
