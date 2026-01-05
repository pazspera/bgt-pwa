import { describe, it, afterEach, vi, expect } from "vitest";
import * as CollectionApiService from "../api/collectionApiService";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";
import { mockCollectionsListResponse, mockCollectionsEmptyListResponse } from "../mocks/data/collectionsApi";
import { useCollectionsApi } from "./useCollectionsApi";
import { expectSharedInitialState, expectLoadingState, expectSharedEndState } from "../tests/utils/apiComposables";

describe("fetchCollections", ()=> {
  afterEach(()=> {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  })

  it("success: loads all boardgames, updates loading and error", async()=> {
    // desestructurar lo que viene de fetchCollections
    // ESPIAR LA FUNCION DE LA API
    // check valor inicial: collection, totalBoardgames, loading y errorFetchCollections
    // llamada a fetchCollections
    // expectLoadingState
    // await la promesa de fetchCollections
    // expectSharedEndState
    // expect collection sea igual a mockCollectionsListResponse, totallBoardgames matchee el length de .games, que error sea null

    const spyGetCollections = vi.spyOn(CollectionApiService, "getCollections").mockResolvedValueOnce(mockCollectionsListResponse); 

    const { collection, totalBoardgames, loading, errorFetchCollections, fetchCollections } = useCollectionsApi();

    expectSharedInitialState(loading.value, errorFetchCollections.value);
    expect(collection.value).toEqual([]);
    expect(totalBoardgames.value).toEqual(0);

    const response = fetchCollections();
    expectLoadingState(loading.value, errorFetchCollections.value);
    
    try {
      await response;
    } catch (error) { }

    expectSharedEndState(spyGetCollections, loading.value);
    expect(errorFetchCollections.value).toBeNull();
    expect(collection.value).toEqual(mockCollectionsListResponse.games);
  });
  
  it("success no collections: updates loading and error, collections is an empty list", async()=> {
    // mockear la función de CollectionApiService, no global
    // desestructurar el composable
    // checkinitial state
    // llamar a la función
    // check loading state
    // await la promise
    // check end state
    // check que no haya error y que collections sea []
    const spyGetCollections = vi.spyOn(CollectionApiService, "getCollections").mockResolvedValueOnce(mockCollectionsEmptyListResponse);

    const { collection, totalBoardgames, loading, errorFetchCollections, fetchCollections } = useCollectionsApi();

    expectSharedInitialState(loading.value, errorFetchCollections.value);
    expect(collection.value).toEqual([]);
    expect(totalBoardgames.value).toEqual(0);

    const response = fetchCollections();
    expectLoadingState(loading.value, errorFetchCollections.value);

    try {
      await response;
    } catch (error) {}

    expectSharedEndState(spyGetCollections, loading.value);
    expect(errorFetchCollections.value).toBeNull();
    expect(collection.value).toEqual([]);
    expect(totalBoardgames.value).toBe(0);
  });
  
  it("error(500): updates loading and error, boardames is empty", async()=> {
    // mockear la función throws error GET_COLLECTIONS_FAILED
    // desestructurar el composable
    // check initial state
    // llamar a la función
    // check loading state
    // await función con reject.toThrow
    // check end state
    // check error que matchee el error del throw
    const spyGetCollections = vi.spyOn(CollectionApiService, "getCollections").mockRejectedValueOnce(new TypeError(API_ERROR_MESSAGES.GET_COLLECTIONS_FAILED(500)));

    const { collection, totalBoardgames, loading, errorFetchCollections, fetchCollections } = useCollectionsApi();
    
    expectSharedInitialState(loading.value, errorFetchCollections.value);

    const response = fetchCollections();
    expectLoadingState(loading.value, errorFetchCollections.value);

    await response;

    expectSharedEndState(spyGetCollections, loading.value);
    expect(errorFetchCollections.value).toBe(API_ERROR_MESSAGES.GET_COLLECTIONS_FAILED(500));
    expect(totalBoardgames.value).toBe(0);
    expect(collection.value).toEqual([]);
  });

  it("network error: updates loading and error, boardames is empty", async()=> {
    const getCollectionsSpy = vi.spyOn(CollectionApiService, "getCollections").mockRejectedValueOnce(new Error(API_ERROR_MESSAGES.NETWORK_ERROR));

    const { collection, totalBoardgames, loading, errorFetchCollections, fetchCollections } = useCollectionsApi();

    expectSharedInitialState(loading.value, errorFetchCollections.value);

    const response = fetchCollections();
    expectLoadingState(loading.value, errorFetchCollections.value);

    await response;

    expectSharedEndState(getCollectionsSpy, loading.value);
    expect(errorFetchCollections.value).toBe(API_ERROR_MESSAGES.NETWORK_ERROR);
    expect(collection.value).toEqual([]);
    expect(totalBoardgames.value).toBe(0);
  });
})