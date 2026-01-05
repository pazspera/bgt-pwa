import * as CollectionApiService from "../api/collectionApiService";
import { ref, type Ref } from "vue";
import { CollectionApiResponse, CollectionListResponse } from "../types/domain/collectionApi";

export function useCollectionsApi() {
  const collection: Ref<CollectionApiResponse[]> = ref([]);
  const totalBoardgames: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);
  const errorFetchCollection: Ref<boolean> = ref(false);

  const fetchCollection = async () => {
    loading.value = true;
    errorFetchCollection.value = null;

    try {
      const fetchedCollection: CollectionListResponse = await CollectionApiService.getCollections();
      totalBoardgames.value = fetchedCollection.games.length;
      collection.value = fetchedCollection.games;
    } catch (err) {
      errorFetchCollection.value = err.message;
    } finally { 
      loading.value = false;
    }
  };

  return { collection, totalBoardgames, loading, errorFetchCollection, fetchCollection };
}