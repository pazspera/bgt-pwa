<script setup lang="ts">
import { ref, type Ref, onBeforeMount, computed } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import EditPlayerSheet from "../../components/organisms/EditPlayerSheet.vue";
import { usePlayersApi } from "../../composables/usePlayersApi";
import { usePlayerApi } from "../../composables/usePlayerApi";
import CardGrid from "../../components/organisms/CardGrid.vue";
import type { CreatePlayerRequest, PlayerApiResponse, UpdatePlayerRequest } from "../../types/domain/playerApi";
import { PLAYER_STATUS, CONFIRM_DELETE_PLAYER } from "../../constants/ui_feedback/players";
import { capitalize } from "../../utils/formatters";
import LoadingRow from "../../components/molecules/LoadingRow.vue";

const isSheetVisible: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref("");
const isEditSheetVisible: Ref<boolean> = ref(false);
const editErrorText: Ref<string> = ref("");
const playerToEdit: Ref<PlayerApiResponse | null> = ref(null);

const isDeleteDialogVisible: Ref<boolean> = ref(false);
const deleteDialogText : Ref<string> = ref(""); 
const selectedPlayer: Ref<PlayerApiResponse | null> = ref(null);

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

defineOptions({ name: "PlayersView" });

const { players, totalPlayers, loading: loadingList, error: errorList, errorCreatePlayer, errorDeletePlayer, fetchPlayers, createPlayer, deletePlayer } = usePlayersApi();
const { updatePlayer: updatePlayerAction, errorUpdate, loading: updating } = usePlayerApi();

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
    showSnackbar(PLAYER_STATUS.DELETED(selectedPlayer.value.name), "success");
  } catch (error) {
    isDeleteDialogVisible.value = false;
    showSnackbar(PLAYER_STATUS.ERROR.DELETE(selectedPlayer.value.name), "error");
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
    showSnackbar(PLAYER_STATUS.CREATED(formattedName), "success");
  } catch (error) {
    errorText.value = PLAYER_STATUS.ERROR.CREATE;
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
    showSnackbar(PLAYER_STATUS.UPDATED(formattedRequest.name), "success");
  } catch (error) {
    errorText.value = errorUpdate.value || PLAYER_STATUS.ERROR.UPDATE;
  }

}

const doesPlayerExist = (name: string) => {
  return players.value.some(player => player.name === name);
}

const showSnackbar = (text: string, color: string) => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
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
  <v-container class="mt-4 container">
    <v-row>
      <v-col>
        <h1>Jugadores</h1>
        <v-btn 
          @click="showAddPlayerSheet"
          color="primary"
        >
          Agregar jugador
        </v-btn>
        <br/>
        <br/>
      </v-col>
    </v-row>

    <!-- error for the player list -->
    <v-row v-if="errorList" >
      <v-col>
        <v-alert
          color="error"
          title="¡Oh, no! Ocurrió un error"
          :text="errorList"
        ></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-if="loadingList && (!players || players.length === 0) && !errorList"/>

    <CardGrid 
      v-else-if="(players && players.length > 0) && !errorList"
      :data="sortedPlayers"
      type="player"
      @delete-player="handleDeletePlayer"
      @edit-player="handleEditPlayer"
    ></CardGrid>

    <!-- no players -->
    <v-row v-else-if="!errorList">
      <v-col>
        <h2>No hay jugadores</h2>
        <p>Creá tu primer jugador haciendo click en el botón "Agregar jugador".</p>
      </v-col>
    </v-row>

    <!-- shows status of actions -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="bottom center"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

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
          
          <v-btn
            color="error" 
            variant="plain"
            @click="confirmDelete"
          >
            {{ CONFIRM_DELETE_PLAYER.CONFIRM_BTN_TEXT }}
          </v-btn>

          <v-btn
            color="primary" 
            variant="plain"
            @click="isDeleteDialogVisible = false"
          >
            {{ CONFIRM_DELETE_PLAYER.CANCEL_BTN_TEXT }}
          </v-btn>
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
