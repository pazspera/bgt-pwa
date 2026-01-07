<script setup>
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount, ref } from "vue";
import { useCollectionsApi } from '../../composables/useCollectionsApi';
import CardGrid from '../../components/organisms/CardGrid.vue';
import LoadingRow from '../../components/molecules/LoadingRow.vue';
import AddGameDialog from '../../components/organisms/AddGameDialog.vue';

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible = true;
const isAddGameDialogOpen = ref(false);

const { collection, totalBoardgames, loading: loadingList, errorFetchCollections, fetchCollections } = useCollectionsApi();

onBeforeMount(async ()=> {
  await fetchCollections();
  console.log(collection.value);
})

</script>

<template>
  <v-container class="mt-4">
    <h1>Ludoteca</h1>
    <v-btn 
      @click="isAddGameDialogOpen = true"
      color="primary"
    >
      Test agregar partida
    </v-btn>

    <!-- error on the boardgames list initial fetch -->
    <v-row v-if="errorFetchCollections">
      <v-col>
        <v-alert
          color="error"
          title="¡Oh, no! Ocurrió un error"
          :text="errorFetchCollections"
        ></v-alert>
      </v-col>
    </v-row>

    <!-- loading -->
    <LoadingRow v-else-if="loadingList && (!collection || totalBoardgames === 0) && !errorFetchCollection"/>

    <CardGrid
      v-else-if="(collection && collection.length > 0) && !errorFetchCollection"
      :data="collection"
      type="boardgame"
    ></CardGrid>

    <AppSnackbar
      v-model="isSnackBarVisible" 
    />

    <AddGameDialog
      v-model="isAddGameDialogOpen" 
    />
  </v-container>
</template>

<style scoped></style>
