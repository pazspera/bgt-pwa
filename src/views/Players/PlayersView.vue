<script setup>
import { ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayers } from "../../composables/usePlayers";
import { usePlayer } from "../../composables/usePlayer";
import PlayerCard from "../../components/molecules/PlayerCard.vue";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });
const { fetch } = usePlayers();

const testPlayer = ref(null);

onBeforeMount(async ()=> {
  testPlayer.value = await fetchPlayer(1);
  console.log("testplayer", testPlayer.value)
})


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
    <PlayerCard :player="testPlayer"></PlayerCard>
    
    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
