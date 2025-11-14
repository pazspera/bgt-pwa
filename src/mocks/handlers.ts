import { ok } from "assert/strict";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/health", async()=> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return HttpResponse.json(
      { status: "ok", message: "Conectado a la base de datos" },
      { status: 200 }
    )
  })
]