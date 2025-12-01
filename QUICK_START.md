# ⚡ Quick Start - Players API

## 🚀 Para Probar en 3 Minutos

### 1️⃣ Agregar la Ruta

Abre `src/router/index.js` y reemplaza el contenido con:

```javascript
import { createRouter, createWebHistory } from "vue-router";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";

export const routes = [
  {
    path: "/",
    name: "BoardGames",
    component: BoardGamesView,
  },
  {
    path: "/jugadores",
    name: "Players",
    component: () => import(/* webpackChunkName: "Players"*/ "@/views/Players/PlayersView.vue"),
  },
  {
    path: "/editar-jugador/:id?",
    name: "EditPlayer",
    component: () => import(/*webpackChunkName: "EditPlayer"*/ "@/views/Players/EditPlayer.vue"),
    props: true,
  },
  {
    path: "/partidas",
    name: "Games",
    component: () => import(/*webpackChunkName: "Games" */ "@/views/Games/GamesView.vue"),
  },
  {
    path: "/agregar-partida",
    name: "AddGame",
    component: () => import(/*webpackChunkName: "AddGame" */ "@/views/Games/AddGame.vue"),
    props: true,
  },
  // 🆕 NUEVA RUTA - Players API Demo
  {
    path: "/players-rovo",
    name: "PlayersRovo",
    component: () => import(/*webpackChunkName: "PlayersRovo" */ "@/views/PlayersRovoView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 2️⃣ Ejecutar la Aplicación

```bash
npm run dev
```

### 3️⃣ Abrir en el Navegador

```
http://localhost:5173/players-rovo
```

---

## ✅ Verificación Rápida

Si todo funciona, deberías ver:
- ✅ Título "🎮 Gestión de Jugadores"
- ✅ Botón "Crear Jugador"
- ✅ Botón "Refrescar"
- ✅ Lista de jugadores (o estado vacío/loading/error)

---

## 🔧 Solución de Problemas Comunes

### ❌ Error: "Cannot find module"
**Solución:** Reinicia el servidor
```bash
# Ctrl+C para detener
npm run dev
```

### ❌ Error: CORS Policy
**Opción 1 - Configurar el Backend:**
Agrega estos headers en tu API:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

**Opción 2 - Usar Proxy de Vite:**

Edita `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 🆕 Agrega esto
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

Luego cambia en `src/api/playerApiService.ts`:
```typescript
// Cambiar esto:
const API_BASE_URL = 'http://dev.bgt.local/api/v1';

// Por esto:
const API_BASE_URL = '/api/v1';
```

### ❌ Error: "Cannot GET /players-rovo"
**Solución:** Verifica que agregaste la ruta correctamente en el paso 1.

### ❌ La lista está vacía
**Causas posibles:**
1. ✅ **Normal:** No hay jugadores en la BD → Crea uno con el botón
2. ⚠️ **Error de conexión:** Verifica que `http://dev.bgt.local` esté accesible
3. ⚠️ **CORS:** Ve la solución arriba

---

## 🧪 Prueba Rápida de Endpoints

Abre la consola del navegador y ejecuta:

```javascript
// Importar el servicio
const service = await import('/src/api/playerApiService.ts');

// Probar GET
const players = await service.getPlayers();
console.log('Players:', players);

// Probar POST
const newPlayer = await service.createPlayer({ name: 'Test' });
console.log('Created:', newPlayer);
```

---

## 📝 Uso en Tus Componentes

### Ejemplo Mínimo

```vue
<script setup>
import { onMounted } from 'vue';
import { usePlayersApi } from '@/composables/usePlayersApi';

const { players, loading, fetchPlayers } = usePlayersApi();

onMounted(() => fetchPlayers());
</script>

<template>
  <div>
    <h1>Jugadores</h1>
    <p v-if="loading">Cargando...</p>
    <ul v-else>
      <li v-for="p in players" :key="p.id">{{ p.name }}</li>
    </ul>
  </div>
</template>
```

---

## 📚 Documentación Completa

- **`RESUMEN_IMPLEMENTACION.md`** - Resumen ejecutivo
- **`ANALISIS_PROYECTO.md`** - Análisis de arquitectura
- **`EJEMPLOS_USO.md`** - Ejemplos detallados
- **`INSTRUCCIONES_IMPLEMENTACION.md`** - Guía completa

---

## 🎯 Endpoints Disponibles

| Método | Endpoint | Función |
|--------|----------|---------|
| GET | `/api/v1/players` | `getPlayers()` |
| GET | `/api/v1/players/:id` | `getPlayerById(id)` |
| POST | `/api/v1/players` | `createPlayer({ name })` |
| PUT | `/api/v1/players/:id` | `updatePlayer(id, { name })` |
| DELETE | `/api/v1/players/:id` | `deletePlayer(id)` |

---

## ✨ Próximos Pasos

1. ✅ **Prueba el componente** en `/players-rovo`
2. 📖 **Lee** `EJEMPLOS_USO.md` para ver casos específicos
3. 🔨 **Usa** los composables en tus componentes
4. 🎨 **Personaliza** según tus necesidades

---

## 💡 Tip Pro

Para agregar un link en el navbar, edita `src/components/organisms/NavBar.vue`:

```vue
<template>
  <!-- ... código existente ... -->
  <router-link to="/players-rovo">API Demo</router-link>
  <!-- ... -->
</template>
```

---

**¡Listo!** 🎉 Ahora tienes un ejemplo completo de cómo interactuar con APIs REST en Vue 3.
