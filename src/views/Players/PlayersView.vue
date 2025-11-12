<script setup>
import { ref } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";

const isSheetVisible = ref(false);
const errorText = ref("");
defineOptions({ name: "PlayersView" });

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
