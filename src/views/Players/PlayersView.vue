<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import PlayerCard from "../../components/molecules/PlayerCard.vue";
import { getPlayers, getPlayer } from "../../api/playerApiService";
import CardGrid from "../../components/organisms/CardGrid.vue";
import { mockPlayersApi } from "../../mocks/data/playersApi";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });

const mockPlayer = {
  id: 333,
  name: "Zeuchi, the Great",
  createdAt: "createdAt"
}

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
    <h1>Jugadores</h1>
    <v-btn 
      @click="isSheetVisible = !isSheetVisible"
      color="primary"
    >
      Agregar jugador
    </v-btn>
    <br/>
    <br/>
    
    <CardGrid 
      :data="mockPlayersApi"
      type="player"
    ></CardGrid>

    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
