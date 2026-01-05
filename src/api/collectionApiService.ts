import type { CollectionApiResponse, CollectionListResponse } from "../types/domain/collectionApi";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCollections() {
  try {
    const response = await fetch(`${API_BASE_URL}/collections/primary/games`, { method: "GET" });
    
    if(!response.ok) {
      throw new Error(API_ERROR_MESSAGES.GET_COLLECTIONS_FAILED(response.status));
    }

    const data: CollectionListResponse = await response.json();
    return data;
  } catch (err) {
    throw new Error(API_ERROR_MESSAGES.UNKNOWN_ERROR(err?.message));
  }
}