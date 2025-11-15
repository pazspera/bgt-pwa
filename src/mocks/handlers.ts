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

  })
]
