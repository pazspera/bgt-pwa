<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { useCollectionsApi } from '@/composables/useCollectionsApi';
import CardGrid from '@/components/organisms/CardGrid.vue';
import LoadingRow from '@/components/molecules/LoadingRow.vue';
import AddGameDialog from '@/components/organisms/AddGameDialog.vue';
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import AppSnackbar from "@/components/molecules/AppSnackbar.vue";
import { useAppSnackbar } from "@/composables/useAppSnackbar";
import DisplayTitle from "@/components/atoms/typography/DisplayTitle.vue";
import { GENERAL_UI_TEXT } from "@/constants/generalText";
import { useDocumentTitle } from "@/composables/useDocumentTitle";
import { DOCUMENT_TITLES } from "@/constants/documentTitles";

defineOptions({ name: "BoardGamesView" });

useDocumentTitle(DOCUMENT_TITLES.BOARDGAMES);

const testCollectionSola = ref(null);

// const isSavedSnackBarVisible: Ref<boolean> = ref(false);
// const savedSnackBarColor: Ref<string> = ref("");
// const savedSnackBarText: Ref<string> = ref("");
const isAddGameDialogOpen: Ref<boolean> = ref(false);
const selectedBoardgame: Ref<CollectionsApiResponse | null> = ref(null);

const { collection, totalBoardgames, loading: loadingList, errorFetchCollections, boardgame, fetchCollections, fetchBoardgame } = useCollectionsApi();
const { isSnackbarVisible, message, color, timeout, hide, success, error } = useAppSnackbar();

const handleAddGame = (boardgame: CollectionsApiResponse) => {
  selectedBoardgame.value = boardgame;
  isAddGameDialogOpen.value = true;
}

const handleSaveSuccess = (message: string) => {
  success(message);
}

const handleSaveError = (message: string) => {
  error(message);
}

onBeforeMount(async () => {
  await fetchCollections();
  console.log(collection.value);
  await fetchBoardgame("492d002e-76e3-4e72-a0ce-b739a4f4f86c");
  console.log(boardgame.value);
})

</script>

<template>
  <v-container class="my-4 my-md-6 my-lg-8">
    <v-row>
      <v-col>
        <DisplayTitle>Ludoteca</DisplayTitle>
      </v-col>
    </v-row>

    <!-- error on the boardgames list initial fetch -->
    <v-row v-if="errorFetchCollections">
      <v-col>
        <v-alert color="error" :title="GENERAL_UI_TEXT.ALERT_ERROR" :text="errorFetchCollections"></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-else-if="loadingList" />

    <CardGrid
      v-else-if="collection && collection.length > 0"
      :data="collection"
      type="boardgame"
      @add-game="handleAddGame"
    ></CardGrid>

    <!-- no boardgames to show -->
    <v-row v-else>
      <SubsectionTitle>{{ GENERAL_UI_TEXT.NO_DATA_BOARDGAMES_TITLE }}</SubsectionTitle>
      <BodyText>{{ GENERAL_UI_TEXT.NO_DATA_BOARDGAMES_CTA }}</BodyText>
    </v-row>

    <!-- snackbar for saved game -->
    <AppSnackbar
      :visible="isSnackbarVisible"
      :message="message"
      :color="color"
      :timeout="timeout"
      @close="hide()"
    />

    <AddGameDialog
      v-if="selectedBoardgame"
      v-model="isAddGameDialogOpen"
      :boardgame="selectedBoardgame"
      @success="handleSaveSuccess"
      @error="handleSaveError"
    />
  </v-container>
</template>

<style scoped></style>
