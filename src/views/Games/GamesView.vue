<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { deleteGame } from "@/api/gameApiService";
import { useGamesApi } from "@/composables/useGamesApi";
import { useDocumentTitle } from "@/composables/useDocumentTitle";
import { useAppSnackbar } from "@/composables/useAppSnackbar";
import { GameApiResponse } from "@/types/domain/gamesApi";
import { GENERAL_UI_TEXT } from "@/constants/generalText";
import { DOCUMENT_TITLES } from "@/constants/documentTitles";
import { CONFIRM_DELETE_GAME, GAME_STATUS } from "@/constants/ui_feedback/games";
import DisplayTitle from "@/components/atoms/typography/DisplayTitle.vue";
import CardGrid from "@/components/organisms/CardGrid.vue";
import LoadingRow from "@/components/molecules/LoadingRow.vue";
import AppButton from "@/components/atoms/buttons/AppButton.vue";
import AppSnackbar from "@/components/molecules/AppSnackbar.vue";

defineOptions({ name: "GamesView" });

useDocumentTitle(DOCUMENT_TITLES.GAMES);

const { loading, gamesList, errorGetGames, currentPage, totalPages, itemsPerPage, getGames } = useGamesApi();

const { isSnackbarVisible, message, color, timeout, hide, error, success } = useAppSnackbar();

const isDeleteDialogVisible: Ref<boolean> = ref(false);
const selectedGame: Ref<GameApiResponse | null> = ref(null);

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
  selectedGame.value = game;
  isDeleteDialogVisible.value = true;
}

const confirmDelete = async () => {
  if(!selectedGame.value) return;

  try {
    await deleteGame(selectedGame.value.id);

    // updates ui
    await getGames();

    success(GAME_STATUS.DELETED)
  } catch (err) {
    error(GAME_STATUS.ERROR.DELETE);
    console.log(GAME_STATUS.ERROR.DELETE);
  } finally {
    isDeleteDialogVisible.value = false;
    selectedGame.value = null;
  }
}

const cancelDelete = () => {
  selectedGame.value = null;
  isDeleteDialogVisible.value = false;
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

    <!-- shows status of actions -->
    <AppSnackbar
      :visible="isSnackbarVisible"
      :message="message"
      :color="color"
      :timeout="timeout"
      @close="hide()"
    />

    <!-- confirm delete dialog -->
    <v-dialog
      v-model="isDeleteDialogVisible"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="fas fa-triangle-exclamation"
        :text="CONFIRM_DELETE_GAME.TEXT"
        :title="CONFIRM_DELETE_GAME.TITLE"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <AppButton
            density="default"
            color="error"
            variant="plain"
            :label="CONFIRM_DELETE_GAME.CONFIRM_BTN_TEXT"
            @click="confirmDelete"
          />

          <AppButton
            density="default"
            color="primary"
            variant="plain"
            :label="CONFIRM_DELETE_GAME.CANCEL_BTN_TEXT"
            @click="cancelDelete"
          />
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped></style>
