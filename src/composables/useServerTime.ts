import { ref } from "vue";

export function useServerTime() {
  const timeOffset = ref(0);

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
}