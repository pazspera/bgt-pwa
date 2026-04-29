<script setup lang="ts">
import { useGamesApi } from "../../composables/useGamesApi";
import { onBeforeMount } from "vue";
import DisplayTitle from "../../components/atoms/typography/DisplayTitle.vue";
import CardGrid from "../../components/organisms/CardGrid.vue";
import LoadingRow from "../../components/molecules/LoadingRow.vue";
import { GENERAL_UI_TEXT } from "../../constants/generalText";

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
        <v-alert color="error" :title="GENERAL_UI_TEXT.ALERT_ERROR" :text="errorGetGames"></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-else-if="loading && !gamesList && !errorGetGames" />

    <CardGrid
      v-else-if="gamesList && !errorGetGames"
      :data="gamesList.data"
      type="game"
    ></CardGrid>


  </v-container>
</template>

<style scoped></style>
