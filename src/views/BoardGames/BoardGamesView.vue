<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount } from "vue";
import { useCollectionsApi } from '../../composables/useCollectionsApi';
import { mockCollectionsApiResponse } from '../../mocks/data/collectionsApi';
import BoardgameCard from '../../components/molecules/BoardgameCard.vue';

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;

const { collection, totalBoardgames, loading, errorFetchCollection, fetchCollections } = useCollectionsApi();

onBeforeMount(async ()=> {
  await fetchCollections();
  console.log(collection.value);
})

</script>

<template>
  <v-container class="mt-4">
    <h1>Ludoteca</h1>
    <p>Lista de juegos (placeholder)</p>
    <BoardgameCard
      :boardgame="mockCollectionsApiResponse"
    />

    <AppSnackbar
      v-model="isSnackBarVisible" 
    />
  </v-container>
</template>

<style scoped></style>
