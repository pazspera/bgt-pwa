<script setup lang="ts">
import { ref, type Ref, onBeforeMount, computed } from "vue";
import AddPlayerSheet from "@/components/organisms/AddPlayerSheet.vue";
import EditPlayerSheet from "@/components/organisms/EditPlayerSheet.vue";
import { usePlayersApi } from "@/composables/usePlayersApi";
import { usePlayerApi } from "@/composables/usePlayerApi";
import CardGrid from "@/components/organisms/CardGrid.vue";
import type { CreatePlayerRequest, PlayerApiResponse, UpdatePlayerRequest } from "../../types/domain/playerApi";
import { PLAYER_STATUS, CONFIRM_DELETE_PLAYER } from "@/constants/ui_feedback/players";
import { BUTTONS_TEXT } from "@/constants/buttonsText";
import { GENERAL_UI_TEXT } from "@/constants/generalText";
import { capitalize } from "@/utils/formatters";
import LoadingRow from "@/components/molecules/LoadingRow.vue";
import DisplayTitle from "@/components/atoms/typography/DisplayTitle.vue";
import SubsectionTitle from "@/components/atoms/typography/SubsectionTitle.vue";
import BodyText from "@/components/atoms/typography/BodyText.vue";
import AppButton from "@/components/atoms/buttons/AppButton.vue";
import { useAppSnackbar } from "@/composables/useAppSnackbar";
import { useDocumentTitle } from "@/composables/useDocumentTitle";
import { DOCUMENT_TITLES } from "@/constants/documentTitles";

const isSheetVisible: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref("");
const isEditSheetVisible: Ref<boolean> = ref(false);
const editErrorText: Ref<string> = ref("");
const playerToEdit: Ref<PlayerApiResponse | null> = ref(null);

const isDeleteDialogVisible: Ref<boolean> = ref(false);
const deleteDialogText : Ref<string> = ref("");
const selectedPlayer: Ref<PlayerApiResponse | null> = ref(null);

const { isSnackbarVisible, message, color, timeout, hide, success, error } = useAppSnackbar();

const { players, totalPlayers, loading: loadingList, error: errorList, errorCreatePlayer, errorDeletePlayer, fetchPlayers, createPlayer, deletePlayer } = usePlayersApi();
const { updatePlayer: updatePlayerAction, errorUpdate, loading: updating } = usePlayerApi();

defineOptions({ name: "PlayersView" });

useDocumentTitle(DOCUMENT_TITLES.PLAYERS);

onBeforeMount(async ()=> {
  await fetchPlayers();
})

// test functions for emitted events on PlayerCard
const handleEditPlayer = (player: PlayerApiResponse) => {
  console.log("editPlayer: ", player);
  playerToEdit.value = player;
  showEditPlayerSheet();
}

const handleDeletePlayer = (player: PlayerApiResponse) => {
  selectedPlayer.value = player;
  deleteDialogText.value = CONFIRM_DELETE_PLAYER.TEXT(player.name);
  isDeleteDialogVisible.value = true;
}

const confirmDelete = async () => {
  if(!selectedPlayer.value) return;

  try {
    await deletePlayer(selectedPlayer.value.id); 

    //updates ui
    players.value = players.value.filter(player => player.id !== selectedPlayer.value?.id);

    isDeleteDialogVisible.value = false;
    success(PLAYER_STATUS.DELETED(selectedPlayer.value.name))
  } catch (error) {
    isDeleteDialogVisible.value = false;
    error(PLAYER_STATUS.ERROR.DELETE(selectedPlayer.value.name))
  } finally {
    selectedPlayer.value = null;
  }
}

const handlePlayerAdded = async (newPlayer: CreatePlayerRequest)=> {
  const formattedName = capitalize(newPlayer.name);
  const playerNameExists = doesPlayerExist(formattedName);

  if(playerNameExists) {
    errorText.value = PLAYER_STATUS.ERROR.CREATE_ALREADY_EXISTS(formattedName);
    return;
  }

  try {
    const playerToSave = { ...newPlayer, name: formattedName };
    const playerCreated = await createPlayer(playerToSave);

    // updates players locally, if the code gets here, it was ok
    // faster ui update for the user
    players.value.push(playerCreated);
    isSheetVisible.value = false;
    success(PLAYER_STATUS.CREATED(formattedName));
  } catch (error) {
    error(PLAYER_STATUS.ERROR.CREATE);
  }
}

const handlePlayerUpdated = async (updatedPlayer: { id: string, name: UpdatePlayerRequest }) => {
  console.log("in handlePlayerUpdated");
  console.log(updatedPlayer);
  editErrorText.value = "";
  const formattedEditName = capitalize(updatedPlayer.name.name);
  const formattedRequest: UpdatePlayerRequest = {
    name: formattedEditName,
  }

  try {
    await updatePlayerAction(updatedPlayer.id, formattedRequest);

    // update ui locally
    const index = players.value.findIndex(p => p.id === updatedPlayer.id);
    if (index !== -1) {
      players.value[index].name = formattedRequest.name;
    }

    isEditSheetVisible.value = false;
    success(PLAYER_STATUS.UPDATED(formattedRequest.name))
  } catch (error) {
    error(errorUpdate.value || PLAYER_STATUS.ERROR.UPDATE)
  }

}

const doesPlayerExist = (name: string) => {
  return players.value.some(player => player.name === name);
}

const showAddPlayerSheet = () => {
  errorText.value = "";
  isSheetVisible.value = !isSheetVisible.value;
}

const showEditPlayerSheet = () => {
  editErrorText.value = "";
  isEditSheetVisible.value = !isEditSheetVisible.value;

  if(!isEditSheetVisible.value) {
    playerToEdit.value = null;
  }
}

const sortedPlayers = computed(()=> {
  if(!players.value) return [];

  return [...players.value].sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
})

</script>

<template>
  <v-container class="my-4 my-md-6 my-lg-8 container">
    <v-row>
      <v-col>
        <DisplayTitle>Jugadores</DisplayTitle>
        <AppButton
          @click="showAddPlayerSheet"
          color="primary"
          variant="elevated"
          density="default"
          :label="BUTTONS_TEXT.ADD_PLAYER"
        />
        <br/>
        <br/>
      </v-col>
    </v-row>

    <!-- error for the player list -->
    <v-row v-if="errorList" >
      <v-col>
        <v-alert
          color="error"
          :title="GENERAL_UI_TEXT.ALERT_ERROR"
          :text="errorList"
        ></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-else-if="loadingList"/>

    <CardGrid 
      v-else-if="players && players.length > 0"
      :data="sortedPlayers"
      type="player"
      @delete-player="handleDeletePlayer"
      @edit-player="handleEditPlayer"
    ></CardGrid>

    <!-- no players -->
    <v-row v-else>
      <v-col>
        <SubsectionTitle>{{ GENERAL_UI_TEXT.NO_DATA_PLAYERS_TITLE }}</SubsectionTitle>
        <BodyText>{{ GENERAL_UI_TEXT.NO_DATA_PLAYERS_CTA }}</BodyText>
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
        :text="deleteDialogText"
        :title="CONFIRM_DELETE_PLAYER.TITLE"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          
          <AppButton
            density="default"
            color="error" 
            variant="plain"
            :label="CONFIRM_DELETE_PLAYER.CONFIRM_BTN_TEXT"
            @click="confirmDelete"
          />

          <AppButton
            density="default"
            color="primary" 
            variant="plain"
            :label="CONFIRM_DELETE_PLAYER.CANCEL_BTN_TEXT"
            @click="isDeleteDialogVisible = false"
          />
        </template>
      </v-card>
    </v-dialog>

    <AddPlayerSheet 
      v-model="isSheetVisible" 
      :errorMessage="errorText" 
      @playerAdded="handlePlayerAdded" 
    />

    <EditPlayerSheet
      v-model="isEditSheetVisible"
      :errorMessage="editErrorText"
      :player="playerToEdit"
      @playerUpdated="handlePlayerUpdated"
    />
  </v-container>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>
