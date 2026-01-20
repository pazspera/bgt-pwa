import { it, describe, beforeEach, afterEach, vi, expect } from "vitest";
import { useServerTime } from "./useServerTime";

describe("useServerTime", ()=> {
  beforeEach(()=> {
    vi.useFakeTimers();
  })

  afterEach(()=> {
    vi.useRealTimers();
  })

  it.only("el cliente está adelantado al servidor", ()=> {
    // arrange
    const serverTimeString = "2026-01-20T11:00:00Z";
    const clientTime = new Date("2026-01-20T11:10:00Z");
    const { getSyncedDate, syncWithServer } = useServerTime();
    
    // act
    // set client time
    vi.setSystemTime(clientTime);
    syncWithServer(serverTimeString);
  
    // assert
    const currentTime = getSyncedDate();
    expect(currentTime).toEqual(new Date(serverTimeString));
    
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