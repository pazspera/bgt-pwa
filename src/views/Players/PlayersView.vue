<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayer } from "../../composables/usePlayer";
import PlayerCard from "../../components/molecules/PlayerCard.vue";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });
const { fetchPlayer } = usePlayer();

const testPlayer = ref(null);

onBeforeMount(async ()=> {
  testPlayer.value = await fetchPlayer(1);
})

const mockPlayer = {
  id: 333,
  name: "Zeuchi, the Great",
  createdAt: "createdAt"
}

// test functions for emitted events on PlayerCard
const handleEditPlayer = (playerId: number) => {
  console.log("editPlayer: ", playerId);
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
    <PlayerCard 
      :player="mockPlayer"
      @editPlayer="handleEditPlayer"
    ></PlayerCard>
    
    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
