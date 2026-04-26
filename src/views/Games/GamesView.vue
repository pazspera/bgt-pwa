<script setup lang="ts">
import { useGamesApi } from "../../composables/useGamesApi";
import { onBeforeMount } from "vue";
import { CreateGameRequest } from "../../types/domain/gamesApi";
import TypographyChart from "../../components/molecules/TypographyChart.vue";
import DisplayTitle from "../../components/atoms/typography/DisplayTitle.vue";
import GameCard from "../../components/molecules/GameCard.vue";
import CardGrid from "../../components/organisms/CardGrid.vue";
import LoadingRow from "../../components/molecules/LoadingRow.vue";

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

    <!-- error on games initial fetch -->
    <v-row v-if="errorGetGames">
      <v-col>
        <v-alert color="error" title="¡Oh, no! Ocurrió un error" :text="errorGetGames"></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-else-if="loading && !gamesList && !errorGetGames" />

    <CardGrid
      v-else-if="gamesList && !errorGetGames"
      :data="gamesList.data"
      type="game"
    ></CardGrid>

    <TypographyChart></TypographyChart>
  </v-container>
</template>

<style scoped></style>
