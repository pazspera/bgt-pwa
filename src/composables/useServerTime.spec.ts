import { it, describe, beforeEach, afterEach, vi, expect } from "vitest";
import { useServerTime } from "./useServerTime";

describe("useServerTime", ()=> {
  beforeEach(()=> {
    vi.useFakeTimers();
  })

  afterEach(()=> {
    vi.useRealTimers();
  })

  it("client time is ahead of server time", ()=> {
    // arrange
    const serverTimeString = "2026-01-20T11:00:00Z";
    const clientTime = new Date("2026-01-20T11:10:00Z");
    const { getSyncedDate, syncWithServer } = useServerTime();
    
    vi.setSystemTime(clientTime);
    
    // act
    // set client time
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

  it("server time is ahead of client time", ()=> {
    // arrange
    const serverTimeString = "2026-01-20T11:15:00Z";
    const clientTime = new Date("2026-01-20T11:00:00Z");
    const { getSyncedDate, syncWithServer } = useServerTime();
    
    vi.setSystemTime(clientTime);
    
    // act
    syncWithServer(serverTimeString);

    // assert
    const currentTime = getSyncedDate();
    expect(currentTime).toEqual(new Date(serverTimeString));
    /* 
    hora servidor: 11:15hs
    hora cliente: 11hs
    llamo a syncWithServer
    devuelve 11:15hs
    */
  });

  it("server and client time are the same", ()=> {
    // arrange
    const serverTimeString = "2026-01-20T11:00:00Z";
    const clientTime = new Date("2026-01-20T11:00:00Z");
    const { syncWithServer, getSyncedDate } = useServerTime();
    
    vi.setSystemTime(clientTime);

    // act
    syncWithServer(serverTimeString);

    // arrange
    const currentTime = getSyncedDate();
    expect(currentTime).toEqual(new Date(serverTimeString));
    /* 
    hora servidor: 11hs
    hora cliente: 11hs
    llamo a syncWithServer
    la variable timeOffset = 0
    */
  });

  it("the time difference between server and client is persistent in time", ()=> {
    // arrange
    const serverTimeString = "2026-01-20T11:10:00Z";
    const clientTime = new Date("2026-01-20T11:00:00Z");
    const { syncWithServer, getSyncedDate } = useServerTime();

    vi.setSystemTime(clientTime);
    syncWithServer(serverTimeString);
    
    // act
    // move currentTime two hours ahead
    vi.setSystemTime("2026-01-20T13:00:00Z");

    // assert
    const currentDate = getSyncedDate();
    // server time is ahead 10 min from client time
    expect(currentDate).toEqual(new Date("2026-01-20T13:10:00Z"));

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