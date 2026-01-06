<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount } from "vue";
import { useCollectionsApi } from '../../composables/useCollectionsApi';
import CardGrid from '../../components/organisms/CardGrid.vue';

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;

const { collection, totalBoardgames, loading: loadingList, errorFetchCollection, fetchCollections } = useCollectionsApi();

onBeforeMount(async ()=> {
  await fetchCollections();
  console.log(collection.value);
})

</script>

<template>
  <v-container class="mt-4">
    <h1>Ludoteca</h1>
    <p>Lista de juegos (placeholder)</p>

    <!-- error on the boardgames list initial fetch -->
    <v-row v-if="errorFetchCollection">
      <v-col>
        <v-alert
          color="error"
          title="¡Oh, no! Ocurrió un error"
          :text="errorFetchCollection"
        ></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <v-row v-else-if="loadingList && (!collection || totalBoardgames === 0) && !errorFetchCollection">
      <v-col>
        <v-progress-circular></v-progress-circular>
      </v-col>
    </v-row>

    <CardGrid
      v-else-if="(collection && collection.length > 0) && !errorFetchCollection"
      :data="collection"
      type="boardgame"
    ></CardGrid>

    <AppSnackbar
      v-model="isSnackBarVisible" 
    />
  </v-container>
</template>

<style scoped></style>
