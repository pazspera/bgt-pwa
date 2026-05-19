<script setup lang="ts">
import { useGamesApi } from "@/composables/useGamesApi";
import { onBeforeMount, ref, type Ref } from "vue";
import DisplayTitle from "@/components/atoms/typography/DisplayTitle.vue";
import CardGrid from "@/components/organisms/CardGrid.vue";
import LoadingRow from "@/components/molecules/LoadingRow.vue";
import { GENERAL_UI_TEXT } from "@/constants/generalText";
import { useDocumentTitle } from "@/composables/useDocumentTitle";
import { DOCUMENT_TITLES } from "@/constants/documentTitles";
import { GameApiResponse } from "@/types/domain/gamesApi";

defineOptions({ name: "GamesView" });

useDocumentTitle(DOCUMENT_TITLES.GAMES);

const { loading, gamesList, errorGetGames, currentPage, totalPages, itemsPerPage, getGames } = useGamesApi();

const isDeleteDialogVisible: Ref<boolean> = ref(false);

onBeforeMount(async () => {
  await getGames();
  console.log(gamesList.value);
  console.log(errorGetGames.value);
  console.log(totalPages.value);
})

const onPageChange = async () => {
  await getGames();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const handleDeleteGame = (game: GameApiResponse) => {
  isDeleteDialogVisible.value = true;
}

</script>

<template>
  <v-container class="my-4 my-md-6 my-lg-8">
    <v-row>
      <v-col>
        <DisplayTitle>Partidas</DisplayTitle>
      </v-col>
    </v-row>

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
      @delete-game="handleDeleteGame"
    ></CardGrid>

    <!-- no games to show -->
    <v-row v-else>
      <v-col>
        <SubsectionTitle>{{ GENERAL_UI_TEXT.NO_DATA_GAMES_TITLE }}</SubsectionTitle>
        <BodyText>{{ GENERAL_UI_TEXT.NO_DATA_GAMES_CTA }}</BodyText>
      </v-col>
    </v-row>

    <!-- pagination -->
    <v-row v-if="totalPages > 1 && !loading" class="mt-4">
      <v-col>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @update:modelValue="onPageChange"
          :disabled="loading"
        />
      </v-col>
    </v-row>

    <!-- confirm delete dialog -->
    <v-dialog
      v-model="isDeleteDialogVisible"
    >
      <v-card>
        <p>Hola</p>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped></style>
