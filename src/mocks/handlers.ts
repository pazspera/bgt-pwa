import { ok } from "assert/strict";
import { http, HttpResponse } from "msw";

export const handlers = [
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
  })
]
