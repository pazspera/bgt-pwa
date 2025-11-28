import { http, HttpResponse } from "msw";
import { mockPlayers } from "./data/players";
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

    await new Promise(resolve => setTimeout(resolve, 600));

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

    const playerId = Number(params.id);
    const player = mockPlayers.find(p => p.id === playerId);

    await new Promise(resolve => setTimeout(resolve, 300));

    if (!player) {
      console.log(`get player id ${playerId} 404 not found`);
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found"
      });
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
     
    const playerId = Number(params.id);

    await new Promise(resolve => setTimeout(resolve, 300));

    const index = mockPlayers.findIndex(p => p.id === playerId);
    
    if(index === -1) {
      console.log(`delete player id ${playerId} 404 not found`);
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not Found"
      })
    }

    mockPlayers.splice(index, 1);

    console.log(`delete for player id ${playerId} success 204`);
    return new HttpResponse(null, {
      status: 204, 
      statusText: "No Content"
    })
  }) 
]
