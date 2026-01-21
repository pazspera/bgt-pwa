import { ref } from "vue";
import { useServerTime } from "./useServerTime";

export function useCheckDbHealth() {
  const BASE_URL = import.meta.env.VITE_API_HEALTH_BASE_URL;
  const uri = BASE_URL + "health";
  
  const statusMessage = ref("");
  const color = ref("info");
  const icon = ref(null);
  const hasRun = ref(false);

  const { syncWithServer, timeOffset } = useServerTime();

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

      statusMessage.value = "Conectado a la base de datos"
      color.value = "success";
      icon.value = "faCircleCheck";
    } catch(err) {
      statusMessage.value = `Error de conexión: ${err.message}`;
      color.value = "error";
      icon.value = "faCircleExclamation"
    }

    hasRun.value = true;
  }

  return { statusMessage, color, icon, checkHealth, hasRun }; 
}