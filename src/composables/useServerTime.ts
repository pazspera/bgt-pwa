import { ref } from "vue";

const timeOffset = ref(0);

export function useServerTime() {

  const syncWithServer = (serverTime: string) => {
    const serverTimeInMilliseconds = new Date(serverTime).getTime();
    const clientTimeInMilliseconds = new Date().getTime();
    
    if(isNaN(serverTimeInMilliseconds)) {
      timeOffset.value = 0;
      return;
    }

    timeOffset.value = serverTimeInMilliseconds - clientTimeInMilliseconds;
  };

  const getSyncedDate = () => {
    return new Date(Date.now() + timeOffset.value);
  }; 
  /* 
    recibe la fecha del servidor 

    función syncWithServer:
    - transforma a milisegundos el tiempo del servidor con .getTime()
    - variable con la hora del dispositivo del usuario con new Date()
    - transformar la hora del dispositivo del usuario en milisegundos con .getTime()
    - diferencia = milisegundos del servidor - milisegundos del cliente

    función getSyncedDate()
    - devuelve new Date() + diferencia 
    ¿Cómo se le sumará el tiempo a la fecha?
  
  */

  return { syncWithServer, getSyncedDate }
}