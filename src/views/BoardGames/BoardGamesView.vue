<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount } from "vue";
import * as CollectionsApiService from "../../api/collectionApiService";

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;

onBeforeMount(async ()=> {
  const data = await CollectionsApiService.getCollections();
  console.log(data)

})

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
