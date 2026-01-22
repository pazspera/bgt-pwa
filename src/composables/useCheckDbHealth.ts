import { ref, type Ref } from "vue";
import { useServerTime } from "./useServerTime";

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
        throw new Error(`Error en el servidor: ${response.status}`);
      }
      
      // gets the serverDate and syncs it to use on the whole app
      let data = await response.json();
      const serverDate = data.serverTime;
      syncWithServer(serverDate);

      statusMessage.value = "Conectado a la base de datos";
      return true;
    } catch(err) {
      statusMessage.value = err.message;
      return false;
    }
  }

  return { checkHealth, statusMessage }; 
}