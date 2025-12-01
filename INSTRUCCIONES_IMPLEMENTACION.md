# 🚀 Instrucciones de Implementación

## 📦 Archivos Creados

Se han creado los siguientes archivos siguiendo las mejores prácticas del proyecto:

### 1. **Documentación**
- ✅ `ANALISIS_PROYECTO.md` - Análisis completo de la estructura del proyecto
- ✅ `EJEMPLOS_USO.md` - Ejemplos de uso detallados con código
- ✅ `INSTRUCCIONES_IMPLEMENTACION.md` - Este archivo

### 2. **Types (TypeScript)**
- ✅ `src/types/domain/playerApi.ts` - Interfaces para la API real

### 3. **API Service Layer**
- ✅ `src/api/playerApiService.ts` - Funciones fetch para todos los endpoints (GET, POST, PUT, DELETE)

### 4. **Composables**
- ✅ `src/composables/usePlayersApi.ts` - Para gestionar lista de jugadores
- ✅ `src/composables/usePlayerApi.ts` - Para operaciones con jugador individual

### 5. **Components & Views**
- ✅ `src/components/PlayersRovo.vue` - Componente de ejemplo completo con CRUD
- ✅ `src/views/PlayersRovoView.vue` - Vista que usa el componente

---

## 🎯 Pasos para Probar

### Paso 1: Agregar la Ruta

Edita `src/router/index.js` y agrega esta ruta al array de routes:

```javascript
{
  path: '/players-rovo',
  name: 'PlayersRovo',
  component: () => import('../views/PlayersRovoView.vue')
}
```

**Ubicación sugerida:** Después de las rutas existentes de `/players`.

### Paso 2: Agregar Enlace de Navegación (Opcional)

Si quieres agregar un enlace en el menú de navegación, edita:
- `src/components/organisms/NavBar.vue` (para desktop)
- `src/components/organisms/BottomNavigation.vue` (para mobile)

Ejemplo:
```vue
<router-link to="/players-rovo">Players API Demo</router-link>
```

### Paso 3: Configurar CORS (Importante)

La API en `http://dev.bgt.local` debe permitir peticiones desde tu aplicación Vue. Asegúrate de que tu backend tenga configurado:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Alternativa:** Si tienes problemas de CORS, usa el proxy de Vite.

### Paso 4: Configurar Proxy de Vite (Opcional)

Si prefieres no lidiar con CORS, edita `vite.config.js`:

```javascript
export default defineConfig({
  // ... config existente
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://dev.bgt.local',
        changeOrigin: true,
      }
    }
  }
})
```

Luego modifica `src/api/playerApiService.ts`:
```typescript
const API_BASE_URL = '/api/v1'; // En lugar de la URL completa
```

### Paso 5: Ejecutar la Aplicación

```bash
npm run dev
```

Navega a: `http://localhost:5173/players-rovo`

---

## 🧪 Verificación

### ✅ Checklist de Pruebas

1. **GET Lista de Jugadores**
   - [ ] La lista se carga correctamente
   - [ ] Muestra el total de jugadores
   - [ ] Muestra estados de loading

2. **POST Crear Jugador**
   - [ ] Crea un nuevo jugador
   - [ ] Muestra confirmación de éxito
   - [ ] La lista se actualiza automáticamente

3. **PUT Actualizar Jugador**
   - [ ] Carga los datos del jugador al editar
   - [ ] Actualiza correctamente
   - [ ] Muestra el cambio en la lista

4. **DELETE Eliminar Jugador**
   - [ ] Pide confirmación
   - [ ] Elimina correctamente
   - [ ] Actualiza la lista

5. **Manejo de Errores**
   - [ ] Muestra errores de red
   - [ ] Muestra errores 404
   - [ ] Muestra errores de validación

---

## 🔧 Personalización

### Cambiar la URL de la API

Edita `src/api/playerApiService.ts`:

```typescript
const API_BASE_URL = 'http://tu-servidor.com/api/v1';
```

O usa variable de entorno `.env`:

```env
VITE_API_BASE_URL=http://tu-servidor.com/api/v1
```

Y modifica el servicio:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://dev.bgt.local/api/v1';
```

### Agregar Autenticación

Si tu API requiere autenticación, modifica las funciones fetch en `playerApiService.ts`:

```typescript
export async function getPlayers(): Promise<PlayersListResponse> {
  const response = await fetch(`${API_BASE_URL}/players`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`, // Tu función para obtener token
      'Content-Type': 'application/json',
    }
  });
  // ...
}
```

### Agregar Paginación

Si quieres implementar paginación:

```typescript
export async function getPlayers(
  limit: number = 10, 
  offset: number = 0
): Promise<PlayersListResponse> {
  const response = await fetch(
    `${API_BASE_URL}/players?limit=${limit}&offset=${offset}`
  );
  // ...
}
```

---

## 📊 Estructura vs Patrón Anterior

### ❌ Patrón Anterior (LocalStorage con Pinia)
```
PlayerStore.js
  ↓
localStorage
```

### ✅ Nuevo Patrón (API Real)
```
PlayersRovo.vue
  ↓
usePlayersApi() (Composable)
  ↓
playerApiService.ts
  ↓
fetch() → API Real
```

---

## 🎨 Integración con el Proyecto Existente

### Opción 1: Reemplazar PlayerStore

Si quieres migrar completamente a la API real, puedes:

1. Actualizar `src/stores/PlayerStore.js` para usar el API service en lugar de localStorage
2. Usar Pinia como caché con sincronización a la API

```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as PlayerApiService from '@/api/playerApiService';

export const usePlayerStore = defineStore('player', () => {
  const players = ref([]);
  const loading = ref(false);

  async function fetchPlayers() {
    loading.value = true;
    try {
      const response = await PlayerApiService.getPlayers();
      players.value = response.data;
    } finally {
      loading.value = false;
    }
  }

  async function addPlayer(name) {
    const newPlayer = await PlayerApiService.createPlayer({ name });
    players.value.push(newPlayer);
    return newPlayer;
  }

  return { players, loading, fetchPlayers, addPlayer };
});
```

### Opción 2: Mantener Ambos (Recomendado)

Mantén el PlayerStore actual para localStorage y usa los nuevos composables para la API real. Esto te permite:
- Trabajar offline con localStorage
- Sincronizar con la API cuando hay conexión
- Migrar gradualmente

---

## 🐛 Troubleshooting

### Error: CORS Policy

**Problema:** "Access to fetch at 'http://dev.bgt.local' from origin 'http://localhost:5173' has been blocked by CORS policy"

**Solución:**
1. Configura CORS en tu backend
2. O usa el proxy de Vite (ver Paso 4)

### Error: Network Failed

**Problema:** No se puede conectar al servidor

**Verificar:**
1. ¿El servidor está corriendo?
2. ¿La URL es correcta?
3. ¿Puedes acceder desde el navegador directamente?

```bash
curl http://dev.bgt.local/api/v1/players
```

### Error: 404 Not Found en componente

**Problema:** La ruta `/players-rovo` da 404

**Solución:**
1. Verifica que agregaste la ruta en `src/router/index.js`
2. Reinicia el servidor de desarrollo

### TypeScript Errors

**Problema:** Errores de tipado

**Solución:**
1. Asegúrate de que todos los archivos `.ts` estén creados
2. Reinicia el servidor de TypeScript en tu IDE
3. Ejecuta: `npm run dev` nuevamente

---

## 📝 Notas Importantes

### 1. **Diferencias con el Mock Actual**

El proyecto usa MSW (Mock Service Worker) con datos mockeados. El nuevo código:
- ✅ Funciona con la API real
- ✅ Usa IDs UUID (strings) en lugar de números
- ✅ Maneja campos adicionales: `is_registered`, `user_id`, `updated_at`
- ✅ Respuesta paginada con `total`, `limit`, `offset`

### 2. **Migración Gradual**

No necesitas reemplazar nada existente. Los nuevos archivos:
- Son independientes del código actual
- Pueden coexistir con los stores de Pinia
- Son un ejemplo de mejores prácticas

### 3. **Testing**

El código está preparado para testing:
- Los servicios API son funciones puras
- Los composables son fáciles de mockear
- Sigue el mismo patrón que `usePlayer.spec.ts` y `usePlayers.spec.ts`

---

## ✅ Siguiente Paso Recomendado

1. **Probar el ejemplo:** Navega a `/players-rovo` y prueba todas las operaciones CRUD
2. **Adaptar a tus necesidades:** Usa los composables en tus componentes existentes
3. **Agregar tests:** Crea tests siguiendo el patrón de `src/composables/*.spec.ts`
4. **Documentar:** Actualiza tu documentación de equipo con estos patrones

---

## 🎓 Recursos Adicionales

- `ANALISIS_PROYECTO.md` - Análisis detallado de la arquitectura
- `EJEMPLOS_USO.md` - Ejemplos de código para cada caso de uso
- `src/components/PlayersRovo.vue` - Componente completo de referencia
- Vue 3 Composition API: https://vuejs.org/api/composition-api-setup.html
- Pinia: https://pinia.vuejs.org/

---

## 💡 Resumen Ejecutivo

**¿Qué se creó?**
- Sistema completo de integración con API REST
- Siguiendo mejores prácticas del proyecto
- Con TypeScript, manejo de errores, y UI completa

**¿Cómo se usa?**
- Importa el composable: `usePlayersApi()` o `usePlayerApi()`
- Llama a los métodos: `fetchPlayers()`, `createPlayer()`, etc.
- Reactivo automáticamente: `loading`, `error`, `players`

**¿Es mejor que Pinia?**
- Para operaciones específicas de API: **Sí**
- Para estado global compartido: **Usa ambos**
- Los composables son más flexibles y testables

**¿Qué sigue?**
1. Agregar la ruta
2. Probar el componente
3. Usar los composables en tus componentes
4. ¡Profit! 🎉
