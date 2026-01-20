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
  });

  it("when syncWithServer receives an invalid string, the client time is used", ()=> {
    // arrange
    const clientTime = new Date("2026-01-20T11:00:00Z");
    const { syncWithServer, getSyncedDate } = useServerTime();

    vi.setSystemTime(clientTime);

    // act
    syncWithServer("Error coming from server");

    // assert
    const currentTime = getSyncedDate();
    expect(currentTime).toEqual(clientTime);
  });

  it("getSyncedTime returns the same value when called in different instances", ()=> {
    // first instance
    const serverTimeString = "2026-01-20T11:10:00Z";
    const { syncWithServer } = useServerTime();
    
    vi.setSystemTime(new Date("2026-01-20T11:00:00Z"));
    // server time is 10 min ahead of set time
    syncWithServer(serverTimeString);
    
    // second instance
    const { getSyncedDate } = useServerTime();
    
    const syncronizedTime = getSyncedDate();
    expect(syncronizedTime).toEqual(new Date(serverTimeString));
  })
})