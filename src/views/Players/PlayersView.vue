<script setup>
import { ref, onBeforeMount } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";
import { usePlayers } from "../../composables/usePlayers";
import { usePlayer } from "../../composables/usePlayer";
import { useDeletePlayer } from "../../composables/useDeletePlayer";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });
const { fetch } = usePlayers();
const { fetchPlayer } = usePlayer(); 
const { deletePlayer } = useDeletePlayer();

onBeforeMount(()=> {
  fetch();
  fetchPlayer(1);
  deletePlayer(6);
  deletePlayer(4);
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

    <AddPlayerSheet v-model="isSheetVisible" :errorMessage="errorText" @playerAdded="handlePlayerAdded" />
  </v-container>
</template>

<style scoped></style>
