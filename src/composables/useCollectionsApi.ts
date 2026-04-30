import * as CollectionApiService from "@/api/collectionApiService";
import { ref, type Ref } from "vue";
import { CollectionsApiResponse, CollectionsListResponse } from "@/types/domain/collectionsApi";

export function useCollectionsApi() {
  const collection: Ref<CollectionsApiResponse[]> = ref([]);
  const totalBoardgames: Ref<number> = ref(0);
  const loading: Ref<boolean> = ref(false);
  const errorFetchCollections: Ref<string | null> = ref(null);

  const fetchCollections = async () => {
    loading.value = true;
    errorFetchCollections.value = null;

    try {
      const fetchedCollection: CollectionsListResponse = await CollectionApiService.getCollections();
      totalBoardgames.value = fetchedCollection.games.length;
      collection.value = fetchedCollection.games;
    } catch (err) {
      errorFetchCollections.value = err.message;
    } finally { 
      loading.value = false;
    }
  };

  return { collection, totalBoardgames, loading, errorFetchCollections, fetchCollections };
}