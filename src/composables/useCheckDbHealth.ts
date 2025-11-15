import { ref } from "vue";

export function useCheckDbHealth() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const uri = BASE_URL + "/health";
  // const uri = BASE_URL + "/health?status=error";
  
  const statusMessage = ref("");
  const color = ref("info");
  const icon = ref(null);
  const hasRun = ref(false);

  const checkHealth = async ()=> {
    try {
      const response = await fetch(uri,{
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if(!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      let data = await response.json();
  
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