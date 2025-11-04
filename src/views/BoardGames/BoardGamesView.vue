<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { ref } from "vue";

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;

</script>

<template>
  <v-container class="mt-4">
    <h1>Ludoteca</h1>
    <p>Lista de juegos (placeholder)</p>
    <AppSnackbar
      v-model="isSnackBarVisible" 
    />
  </v-container>
</template>

<style scoped></style>
