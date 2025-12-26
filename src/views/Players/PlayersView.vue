<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import type { PlayerApiResponse } from "../../types/domain/playerApi";
import { usePlayersApi } from "../../composables/usePlayersApi";
import CardGrid from "../../components/organisms/CardGrid.vue";
import BodyText from "../../components/atoms/typography/BodyText.vue";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });

const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

const mockPlayer = {
  id: 333,
  name: "Zeuchi, the Great",
  createdAt: "createdAt"
}

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

    <!-- loading -->
    <v-row v-if="loading && (!players || players.length === 0)">
      <v-col>
        <v-progress-circular></v-progress-circular>
      </v-col>
    </v-row>

    <CardGrid 
      v-else-if="players && players.length > 0"
      :data="players"
      type="player"
    ></CardGrid>

    <!-- no players -->
    <v-row v-else>
      <v-col>
        <h2>No hay jugadores</h2>
        <p>Creá tu primer jugador haciendo click en el botón "Agregar jugador".</p>
      </v-col>
    </v-row>

    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
