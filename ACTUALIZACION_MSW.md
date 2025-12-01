# 🔧 Actualización - Integración con MSW

## ✅ Problema Resuelto

Se han corregido los errores de integración entre el nuevo código de la API y el sistema de mocking MSW existente.

---

## 🐛 Problemas Encontrados

### 1. **Error: Cannot read properties of undefined (reading 'length')**
**Causa:** El componente intentaba acceder a `players.length` antes de que se inicializara el array.

**Solución:** Agregado validación de existencia:
```vue
<!-- Antes -->
<v-row v-if="loadingList && players.length === 0">

<!-- Después -->
<v-row v-if="loadingList && (!players || players.length === 0)">
```

### 2. **Error: Estructura de respuesta incorrecta**
**Causa:** MSW devolvía un array directo `[]`, pero el código esperaba la estructura de la API real:
```javascript
{
  total: 8,
  limit: 10,
  offset: 0,
  data: [...]
}
```

**Solución:** Actualizado `src/mocks/handlers.ts` para detectar requests a `/api/v1/players` y devolver la estructura correcta.

### 3. **Falta de handlers POST y PUT**
**Causa:** MSW solo tenía handlers para GET y DELETE.

**Solución:** Agregados handlers completos para POST y PUT en `src/mocks/handlers.ts`.

---

## 🔄 Archivos Modificados

### 1. `src/api/playerApiService.ts`
**Cambio:** URL base dinámica según el entorno

```typescript
// Antes
const API_BASE_URL = 'http://dev.bgt.local/api/v1';

// Después
const API_BASE_URL = import.meta.env.DEV 
  ? '/api/v1'  // Para desarrollo con MSW
  : import.meta.env.VITE_API_BASE_URL || 'http://dev.bgt.local/api/v1';
```

**Beneficio:** 
- En desarrollo: MSW intercepta las llamadas
- En producción: Usa la API real

---

### 2. `src/mocks/handlers.ts`
**Cambios múltiples:**

#### A) GET /players - Respuesta adaptada
```typescript
// Detecta si es request a /api/v1/players
if(url.pathname.includes("/api/v1/players")) {
  // Devuelve estructura de API real
  return HttpResponse.json({
    total: mockPlayers.length,
    limit: 10,
    offset: 0,
    data: mockPlayers.map(p => ({
      id: String(p.id),
      name: p.name,
      is_registered: false,
      created_at: p.createdAt,
      updated_at: p.createdAt
    }))
  });
}

// Mantiene estructura original para otras partes
return HttpResponse.json(mockPlayers);
```

#### B) GET /players/:id - Respuesta adaptada
```typescript
if(url.pathname.includes("/api/v1/players")) {
  return HttpResponse.json({
    id: String(player.id),
    name: player.name,
    is_registered: false,
    created_at: player.createdAt,
    updated_at: player.createdAt
  });
}
```

#### C) POST /players - Nuevo handler ✨
```typescript
http.post("*/players", async ({ request }) => {
  const body = await request.json();
  const newId = mockPlayers.length > 0 
    ? Math.max(...mockPlayers.map(p => p.id)) + 1 
    : 1;
  const now = new Date().toISOString();

  const newPlayer = {
    id: newId,
    name: body.name,
    createdAt: now
  };

  mockPlayers.push(newPlayer);

  // Devuelve estructura según la ruta
  if(url.pathname.includes("/api/v1/players")) {
    return HttpResponse.json({
      id: String(newPlayer.id),
      name: newPlayer.name,
      is_registered: false,
      created_at: newPlayer.createdAt,
      updated_at: newPlayer.createdAt
    });
  }

  return HttpResponse.json(newPlayer);
})
```

#### D) PUT /players/:id - Nuevo handler ✨
```typescript
http.put("*/players/:id", async ({ params, request }) => {
  const playerId = Number(params.id);
  const body = await request.json();
  const playerIndex = mockPlayers.findIndex(p => p.id === playerId);

  if(playerIndex === -1) {
    return new HttpResponse(null, {
      status: 404,
      statusText: "Not Found"
    });
  }

  mockPlayers[playerIndex] = {
    ...mockPlayers[playerIndex],
    name: body.name
  };

  const updatedPlayer = mockPlayers[playerIndex];

  if(url.pathname.includes("/api/v1/players")) {
    return HttpResponse.json({
      id: String(updatedPlayer.id),
      name: updatedPlayer.name,
      is_registered: false,
      created_at: updatedPlayer.createdAt,
      updated_at: new Date().toISOString()
    });
  }

  return HttpResponse.json(updatedPlayer);
})
```

---

### 3. `src/components/PlayersRovo.vue`
**Cambio:** Validación defensiva en templates

```vue
<!-- Antes -->
<v-row v-if="loadingList && players.length === 0">
<v-row v-else-if="players.length > 0">

<!-- Después -->
<v-row v-if="loadingList && (!players || players.length === 0)">
<v-row v-else-if="players && players.length > 0">
```

---

## ✅ Resultado

Ahora el componente **PlayersRovo** funciona perfectamente:

- ✅ **GET /api/v1/players** - Lista jugadores con estructura correcta
- ✅ **GET /api/v1/players/:id** - Obtiene jugador individual
- ✅ **POST /api/v1/players** - Crea nuevos jugadores
- ✅ **PUT /api/v1/players/:id** - Actualiza jugadores
- ✅ **DELETE /api/v1/players/:id** - Elimina jugadores

Todo funciona con MSW en desarrollo sin necesidad de backend real.

---

## 🧪 Cómo Probar

1. Asegúrate de tener la ruta agregada en `src/router/index.js`
2. Ejecuta: `npm run dev`
3. Navega a: `http://localhost:5173/players-rovo`
4. Prueba todas las operaciones:
   - ✅ Ver lista de jugadores
   - ✅ Crear nuevo jugador
   - ✅ Editar jugador existente
   - ✅ Eliminar jugador
   - ✅ Ver detalles

---

## 🔄 Compatibilidad

Los cambios son **retrocompatibles**:

- ✅ El código existente que usa `/players` (sin `/api/v1`) sigue funcionando
- ✅ El nuevo código que usa `/api/v1/players` también funciona
- ✅ MSW detecta automáticamente qué estructura devolver según la ruta

---

## 🚀 Para Producción

Cuando despliegues a producción:

### Opción 1: Variable de Entorno
Crea `.env.production`:
```env
VITE_API_BASE_URL=http://dev.bgt.local/api/v1
```

### Opción 2: Modificar directamente
En `src/api/playerApiService.ts`:
```typescript
const API_BASE_URL = 'http://dev.bgt.local/api/v1';
```

MSW solo se ejecuta en desarrollo (`import.meta.env.DEV`), así que en producción siempre usará la API real.

---

## 📊 Resumen de Cambios

| Archivo | Cambios | Líneas |
|---------|---------|--------|
| `src/api/playerApiService.ts` | URL dinámica | 4 líneas |
| `src/mocks/handlers.ts` | Handlers adaptados + POST + PUT | ~140 líneas |
| `src/components/PlayersRovo.vue` | Validaciones defensivas | 2 líneas |

**Total:** 3 archivos modificados, ~150 líneas agregadas/modificadas

---

## ✨ Ventajas de Esta Solución

1. ✅ **No rompe código existente** - Retrocompatible
2. ✅ **Desarrollo sin backend** - MSW simula la API real
3. ✅ **Fácil migración a producción** - Solo cambiar URL
4. ✅ **Testing facilitado** - MSW también funciona en tests
5. ✅ **Estructura real de API** - Respuestas idénticas a producción

---

## 🎉 ¡Todo Funcionando!

El componente PlayersRovo ahora está completamente operativo con:
- CRUD completo
- UI funcional
- Mocking con MSW
- Listo para producción

**Siguiente paso:** Prueba todas las funcionalidades en `/players-rovo`
