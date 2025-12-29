<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayersApi } from "../../composables/usePlayersApi";
import CardGrid from "../../components/organisms/CardGrid.vue";
import type { CreatePlayerRequest } from "../../types/domain/playerApi";
import { PLAYER_STATUS } from "../../constants/ui_feedback/players";

const isSheetVisible: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref("");

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("");

defineOptions({ name: "PlayersView" });

const { players, totalPlayers, loading: loadingList, error: errorList, fetchPlayers, createPlayer } = usePlayersApi();

onBeforeMount(async ()=> {
  await fetchPlayers();
})

// test functions for emitted events on PlayerCard
const handleEditPlayer = (playerId: number) => {
  console.log("editPlayer: ", playerId);
}

const handleDeletePlayer = (playerId: number) => {
  console.log("deletePlayer: ", playerId);
}
// 

const handlePlayerAdded = async (newPlayer: CreatePlayerRequest)=> {
  console.log("handlePlayerAdded recibe: ", newPlayer);
  console.log("nombre nuevo jugador: ", newPlayer.name);

  const playerNameExists = doesPlayerExist(newPlayer.name);

  if(!playerNameExists) {
    const playerCreated = await createPlayer(newPlayer);
    console.log(playerCreated);
    isSheetVisible.value = false;
    showSnackbar(PLAYER_STATUS.CREATED(newPlayer.name), "success");
  } else {
    errorText.value = PLAYER_STATUS.ERROR.CREATE_ALREADY_EXISTS(newPlayer.name);
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

</script>

<template>
  <v-container class="mt-4 container">
    <v-row>
      <v-col>
        <h1>Jugadores</h1>
        <v-btn 
          @click="isSheetVisible = !isSheetVisible"
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

    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped>
.container {
  padding: 0;
}
</style>
