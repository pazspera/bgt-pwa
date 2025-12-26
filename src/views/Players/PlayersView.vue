<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayersApi } from "../../composables/usePlayersApi";
import CardGrid from "../../components/organisms/CardGrid.vue";

const isSheetVisible: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref("");
defineOptions({ name: "PlayersView" });

const { players, totalPlayers, loading: loadingList, error: errorList, fetchPlayers } = usePlayersApi();

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

const handlePlayerAdded = ()=> {}

</script>

<template>
  <v-container class="mt-4">
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
    <v-container v-if="errorList">
      <v-row>
        <v-alert
          color="error"
          title="¡Oh, no! Ocurrió un error"
          :text="errorList"
        ></v-alert>
      </v-row>
    </v-container>

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

    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
