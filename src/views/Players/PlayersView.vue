<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayersApi } from "../../composables/usePlayersApi";
import CardGrid from "../../components/organisms/CardGrid.vue";
import type { CreatePlayerRequest, PlayerApiResponse } from "../../types/domain/playerApi";
import { PLAYER_STATUS, CONFIRM_DELETE_PLAYER } from "../../constants/ui_feedback/players";
import { capitalize } from "../../utils/formatters";

const isSheetVisible: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref("");

const isDeleteDialogVisible: Ref<boolean> = ref(false);
const deleteDialogText : Ref<string> = ref(""); 
const isDeleteConfirmed: Ref<boolean> = ref(false);
const selectedPlayer: Ref<PlayerApiResponse | null> = ref(null);

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

defineOptions({ name: "PlayersView" });

const { players, totalPlayers, loading: loadingList, error: errorList, fetchPlayers, createPlayer, deletePlayer } = usePlayersApi();

onBeforeMount(async ()=> {
  await fetchPlayers();
})

// test functions for emitted events on PlayerCard
const handleEditPlayer = (player: PlayerApiResponse) => {
  console.log("editPlayer: ", player);
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

    <!-- error -->
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
    <v-row v-if="loadingList && (!players || players.length === 0) && !errorList">
      <v-col>
        <v-progress-circular></v-progress-circular>
      </v-col>
    </v-row>

    <CardGrid 
      v-else-if="(players && players.length > 0) && !errorList"
      :data="players"
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
        prepend-icon="mdi-map-marker"
        :text="deleteDialogText"
        :title="CONFIRM_DELETE_PLAYER.TITLE"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          
          <v-btn @click="confirmDelete">
            {{ CONFIRM_DELETE_PLAYER.CONFIRM_BTN_TEXT }}
          </v-btn>

          <v-btn @click="isDeleteDialogVisible = false">
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
  </v-container>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>
