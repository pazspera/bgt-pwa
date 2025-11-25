import { http, HttpResponse } from "msw";
import { mockPlayers } from "./data/players";
import { mock } from "node:test";

export const handlers = [
  // Check DB Health
  http.get("*/health", async({ request })=> {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");
    
    await new Promise(resolve => setTimeout(resolve, 300));

    if(statusParam === "error") {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json(
      { status: "ok", message: "Conectado a la base de datos" },
      { status: 200 }
    )
  }),
  // GET/players
  http.get("*/players", async({ request }) => {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");

    await new Promise(resolve => setTimeout(resolve, 600));

    if(statusParam === "error") {
      console.log("returning error from get/players");
      return new HttpResponse(null, { 
        status: 500,
        statusText: "Internal Server Error"
      });
    };

    return HttpResponse.json(
      mockPlayers,
      {
        status: 200,
        statusText: "OK"
      }
    )
  }),
  // GET/player/:id
  http.get("*/players/:id", async({ params, request })=> {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");

    const playerId = Number(params.id);
    const player = mockPlayers.find(p => p.id === playerId);

    await new Promise(resolve => setTimeout(resolve, 300));

    if(statusParam === "error") {
      console.log("returning error on get/player/:id");
      return new HttpResponse(null, {
        status: 500,
        statusText: "Internal Server Error"
      })
    }

    if(statusParam === "not-found") {
      console.log("returning player not found on get/player/:id");
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found"
      })
    }

    return HttpResponse.json(
      player,
      {
        status: 200, 
        statusText: "OK"
      }
    )
  }),
  // DELETE/player/:id
  http.delete("*/players/:id", async ({ params, request}) => {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get("status");
     
    const playerId = Number(params.id);

    await new Promise(resolve => setTimeout(resolve, 300));

    if(statusParam === "error") {
      console.log(`error 500 on delete for player ${playerId}`);
      return new HttpResponse(null, {
        status: 500,
        statusText: "Internal Server Error"
      })
    };

    const index = mockPlayers.findIndex(p => p.id === playerId);
    
    if(index === -1) {
      console.log(`delete player id ${playerId} 404 not found`);
      return new HttpResponse(null, {
        status: 400,
        statusText: "Not Found"
      })
    }

    mockPlayers.splice(index, 1);

    console.log(`delete for player id ${playerId} success 200`);
    return new HttpResponse(null, {
      status: 204, 
      statusText: "No Content"
    })
  }) 
]
