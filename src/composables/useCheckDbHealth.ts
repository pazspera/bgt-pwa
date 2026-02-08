import { ref, type Ref } from "vue";
import { useServerTime } from "./useServerTime";
import { API_ERROR_MESSAGES } from "../constants/apiErrorMessages";

export function useCheckDbHealth() {
  const BASE_URL = import.meta.env.VITE_API_HEALTH_BASE_URL;
  const uri = BASE_URL + "health";

  const { syncWithServer } = useServerTime();
  const statusMessage: Ref<string> = ref(""); 

  const checkHealth = async ()=> {
    try {
      const response = await fetch(uri,{
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if(!response.ok) {
        throw new Error(API_ERROR_MESSAGES.HEALTH_ERROR(response.status));
      }
      
      // gets the serverDate and syncs it to use on the whole app
      let data = await response.json();
      const serverDate = data.serverTime;
      syncWithServer(serverDate);

      statusMessage.value = API_ERROR_MESSAGES.HEALTH_SUCCESS;
      return true;
    } catch(err) {
      statusMessage.value = err.message;
      return false;
    }
  }

  return { checkHealth, statusMessage }; 
}