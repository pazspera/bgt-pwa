import { it, describe } from "vitest";

describe("useServerTime", ()=> {

  it.todo("el cliente está adelantado al servidor", ()=> {
    /* 
    defino hora del servidor a las 11hs
    defino la hora del cliente a las 11:10hs
    llamo a la función de syncWithServer
    devuelve 11hs
    */
  });

  it.todo("el servidor está adelantado al cliente", ()=> {
    /* 
    hora servidor: 11:15hs
    hora cliente: 11hs
    llamo a syncWithServer
    devuelve 11:15hs
    */
  });

  it.todo("el servidor y el cliente tienen la misma hora", ()=> {
    /* 
    hora servidor: 11hs
    hora cliente: 11hs
    llamo a syncWithServer
    la variable timeOffset = 0
    */
  });

  it.todo("la diferencia de tiempo entre cliente y servidor se mantiene en el tiempo", ()=> {
    /* 
    hora servidor: 11hs
    hora cliente: 11:10hs
    llamo a syncWithServer
    devuelve 11:hs
    adelanto el tiempo a 13hs
    verificar que timeOffset tiene el mismo valor
    crear nueva fecha con getSyncedDate, que devuelve 13hs
    */
  });

  it.todo("la función recibe fecha inválida, se usa el horario del cliente", ()=> {
    /* 
    la función recibe un string inválido
    no hay hora de servidor
    hora de cliente 11hs
    llamo a syncWithServer
    devuelve 11hs
    */
  });

})