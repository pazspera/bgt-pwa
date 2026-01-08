<script setup lang="ts">
import AppSnackbar from '../../components/molecules/AppSnackbar.vue';
import { onBeforeMount, ref, type Ref } from "vue";
import { useCollectionsApi } from '../../composables/useCollectionsApi';
import CardGrid from '../../components/organisms/CardGrid.vue';
import LoadingRow from '../../components/molecules/LoadingRow.vue';
import AddGameDialog from '../../components/organisms/AddGameDialog.vue';

defineOptions({ name: "BoardGamesView" });

const isSnackBarVisible: Ref<boolean> = ref(true);
const isAddGameDialogOpen: Ref<boolean> = ref(false);

const { collection, totalBoardgames, loading: loadingList, errorFetchCollections, fetchCollections } = useCollectionsApi();

const handleAddGame = () => {
  isAddGameDialogOpen.value = true;
}

onBeforeMount(async ()=> {
  await fetchCollections();
  console.log(collection.value);
})

</script>

<template>
  <v-container class="mt-4">
    <h1>Ludoteca</h1>

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
    <LoadingRow v-else-if="loadingList && (!collection || totalBoardgames === 0) && !errorFetchCollections"/>

    <CardGrid
      v-else-if="(collection && collection.length > 0) && !errorFetchCollections"
      :data="collection"
      type="boardgame"
      @add-game="handleAddGame"
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
