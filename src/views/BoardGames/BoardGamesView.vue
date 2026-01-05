<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount } from "vue";
import { useCollectionsApi } from '../../composables/useCollectionsApi';

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;

const { collection, totalBoardgames, loading, errorFetchCollection, fetchCollection } = useCollectionsApi();

onBeforeMount(async ()=> {
  await fetchCollection();
  console.log(collection.value);
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
