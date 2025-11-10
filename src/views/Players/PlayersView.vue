<script setup>
import { ref } from "vue";
import AddPlayerSheet from "../../components/organisms/AddPlayerSheet.vue";

const isSheetVisible = ref(false);
defineOptions({ name: "PlayersView" });

</script>

<template>
  <v-container class="mt-4">
    <h1>Jugadores</h1>
    <router-link :to="{ name: 'AddPlayer' }">
      <v-btn color="primary">Agregar jugador</v-btn>
    </router-link>
    <v-btn 
      @click="isSheetVisible = !isSheetVisible"
    >
      Toggle AddPlayerSheet
    </v-btn>

    <AddPlayerSheet v-model="isSheetVisible" />
  </v-container>
</template>

<style scoped></style>
