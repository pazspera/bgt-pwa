<script setup lang="ts">
import { useGamesApi } from "@/composables/useGamesApi";
import { onBeforeMount } from "vue";
import DisplayTitle from "@/components/atoms/typography/DisplayTitle.vue";
import CardGrid from "@/components/organisms/CardGrid.vue";
import LoadingRow from "@/components/molecules/LoadingRow.vue";
import { GENERAL_UI_TEXT } from "@/constants/generalText";
import { useDocumentTitle } from "@/composables/useDocumentTitle";
import { DOCUMENT_TITLES } from "@/constants/documentTitles";

defineOptions({ name: "GamesView" });

useDocumentTitle(DOCUMENT_TITLES.GAMES);

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
    <LoadingRow v-else-if="loading" />

    <CardGrid
      v-else-if="gamesList && gamesList.data.length > 0"
      :data="gamesList.data"
      type="game"
    ></CardGrid>

    <!-- no games to show -->
    <v-row v-else>
      <v-col>
        <SubsectionTitle>{{ GENERAL_UI_TEXT.NO_DATA_GAMES_TITLE }}</SubsectionTitle>
        <BodyText>{{ GENERAL_UI_TEXT.NO_DATA_GAMES_CTA }}</BodyText>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped></style>
