# 📚 Ejemplos de Uso - API de Players

Este documento muestra cómo usar la nueva implementación de la API de players siguiendo las mejores prácticas del proyecto.

## 🎯 Archivos Creados

```
src/
├── api/
│   └── playerApiService.ts          # ⭐ Funciones fetch para la API
├── composables/
│   ├── usePlayersApi.ts             # ⭐ Composable para lista de jugadores
│   └── usePlayerApi.ts              # ⭐ Composable para jugador individual
├── types/domain/
│   └── playerApi.ts                 # ⭐ TypeScript types
├── components/
│   └── PlayersRovo.vue              # ⭐ Componente de ejemplo completo
└── views/
    └── PlayersRovoView.vue          # ⭐ Vista de ejemplo
```

---

## 🚀 Ejemplo 1: Listar Jugadores (GET)

### En un componente Vue:

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlayersApi } from '@/composables/usePlayersApi';

const { players, loading, error, fetchPlayers, totalPlayers } = usePlayersApi();

onMounted(async () => {
  await fetchPlayers();
});
</script>

<template>
  <div>
    <!-- Loading -->
    <p v-if="loading">Cargando...</p>
    
    <!-- Error -->
    <p v-if="error" class="error">{{ error }}</p>
    
    <!-- Lista de jugadores -->
    <div v-if="!loading && !error">
      <p>Total: {{ totalPlayers }}</p>
      <ul>
        <li v-for="player in players" :key="player.id">
          {{ player.name }} 
          <span v-if="player.is_registered">✓ Registrado</span>
        </li>
      </ul>
    </div>
  </div>
</template>
```

---

## ➕ Ejemplo 2: Crear Jugador (POST)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { usePlayersApi } from '@/composables/usePlayersApi';

const { loading, error, createPlayer, players } = usePlayersApi();
const newPlayerName = ref('');

const handleCreate = async () => {
  const created = await createPlayer(newPlayerName.value);
  
  if (created) {
    console.log('Jugador creado:', created);
    newPlayerName.value = ''; // Limpiar input
  } else {
    console.error('Error:', error.value);
  }
};
</script>

<template>
  <div>
    <input v-model="newPlayerName" placeholder="Nombre del jugador" />
    <button @click="handleCreate" :disabled="loading">
      {{ loading ? 'Creando...' : 'Crear Jugador' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
```

---

## 📝 Ejemplo 3: Obtener y Actualizar Jugador (GET + PUT)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { usePlayerApi } from '@/composables/usePlayerApi';

const { player, loading, error, fetchPlayer, updatePlayer } = usePlayerApi();
const playerId = ref('64ad9367-f5a0-49b1-b3a8-2c426aeb71ec');
const newName = ref('');

const handleFetch = async () => {
  await fetchPlayer(playerId.value);
  if (player.value) {
    newName.value = player.value.name;
  }
};

const handleUpdate = async () => {
  const success = await updatePlayer(playerId.value, newName.value);
  
  if (success) {
    console.log('Jugador actualizado:', player.value);
  }
};
</script>

<template>
  <div>
    <button @click="handleFetch">Cargar Jugador</button>
    
    <div v-if="player">
      <h3>{{ player.name }}</h3>
      <input v-model="newName" />
      <button @click="handleUpdate" :disabled="loading">
        Actualizar
      </button>
    </div>
    
    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
```

---

## 🗑️ Ejemplo 4: Eliminar Jugador (DELETE)

```vue
<script setup lang="ts">
import { usePlayersApi } from '@/composables/usePlayersApi';

const { players, loading, error, removePlayer, fetchPlayers } = usePlayersApi();

const handleDelete = async (id: string, name: string) => {
  if (confirm(`¿Eliminar a ${name}?`)) {
    const success = await removePlayer(id);
    
    if (success) {
      console.log('Jugador eliminado');
      // La lista local ya está actualizada automáticamente
    }
  }
};

// Cargar jugadores inicialmente
fetchPlayers();
</script>

<template>
  <div>
    <ul>
      <li v-for="player in players" :key="player.id">
        {{ player.name }}
        <button 
          @click="handleDelete(player.id, player.name)"
          :disabled="loading"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>
```

---

## 🔄 Ejemplo 5: CRUD Completo en un Solo Componente

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlayersApi } from '@/composables/usePlayersApi';
import { usePlayerApi } from '@/composables/usePlayerApi';

// Lista de jugadores
const { 
  players, 
  loading: loadingList,
  fetchPlayers,
  createPlayer,
  removePlayer 
} = usePlayersApi();

// Jugador individual (para editar)
const {
  player: selectedPlayer,
  loading: loadingPlayer,
  fetchPlayer,
  updatePlayer
} = usePlayerApi();

const newName = ref('');
const editName = ref('');
const editId = ref('');

onMounted(() => fetchPlayers());

// CREATE
const create = async () => {
  await createPlayer(newName.value);
  newName.value = '';
};

// READ (individual)
const loadForEdit = async (id: string) => {
  await fetchPlayer(id);
  if (selectedPlayer.value) {
    editId.value = id;
    editName.value = selectedPlayer.value.name;
  }
};

// UPDATE
const update = async () => {
  const success = await updatePlayer(editId.value, editName.value);
  if (success) {
    await fetchPlayers(); // Recargar lista
    editId.value = '';
  }
};

// DELETE
const remove = async (id: string) => {
  await removePlayer(id);
};
</script>

<template>
  <div>
    <!-- CREATE -->
    <input v-model="newName" placeholder="Nuevo jugador" />
    <button @click="create" :disabled="loadingList">Crear</button>

    <!-- LIST -->
    <ul v-if="!loadingList">
      <li v-for="player in players" :key="player.id">
        {{ player.name }}
        <button @click="loadForEdit(player.id)">Editar</button>
        <button @click="remove(player.id)">Eliminar</button>
      </li>
    </ul>

    <!-- EDIT -->
    <div v-if="editId">
      <h3>Editando: {{ selectedPlayer?.name }}</h3>
      <input v-model="editName" />
      <button @click="update" :disabled="loadingPlayer">Guardar</button>
      <button @click="editId = ''">Cancelar</button>
    </div>
  </div>
</template>
```

---

## 🛠️ Uso Directo del API Service (Sin Composable)

Si necesitas hacer llamadas puntuales sin estado reactivo:

```typescript
import * as PlayerApiService from '@/api/playerApiService';

// GET lista
const response = await PlayerApiService.getPlayers();
console.log(response.data); // Array de jugadores
console.log(response.total); // Total

// GET individual
const player = await PlayerApiService.getPlayerById('uuid-here');

// POST
const newPlayer = await PlayerApiService.createPlayer({ 
  name: 'Zeuchi5' 
});

// PUT
const updated = await PlayerApiService.updatePlayer('uuid-here', { 
  name: 'Zeuchi 4ever' 
});

// DELETE
await PlayerApiService.deletePlayer('uuid-here');
```

---

## 📋 Manejo de Errores

Todos los composables y servicios manejan errores automáticamente:

```vue
<script setup lang="ts">
import { usePlayersApi } from '@/composables/usePlayersApi';

const { players, loading, error, fetchPlayers } = usePlayersApi();

const loadWithErrorHandling = async () => {
  await fetchPlayers();
  
  if (error.value) {
    // El error ya está en error.value
    console.error('Error al cargar:', error.value);
    // Puedes mostrar una notificación, etc.
  } else {
    console.log('Jugadores cargados:', players.value);
  }
};
</script>

<template>
  <div>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
  </div>
</template>
```

---

## 🧪 Testing

Los composables son fáciles de testear:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { usePlayersApi } from '@/composables/usePlayersApi';
import * as PlayerApiService from '@/api/playerApiService';

vi.mock('@/api/playerApiService');

describe('usePlayersApi', () => {
  it('should fetch players', async () => {
    const mockData = {
      total: 2,
      limit: 10,
      offset: 0,
      data: [
        { id: '1', name: 'Player 1', is_registered: false, created_at: '2025-01-01', updated_at: '2025-01-01' }
      ]
    };
    
    vi.mocked(PlayerApiService.getPlayers).mockResolvedValue(mockData);
    
    const { players, loading, fetchPlayers } = usePlayersApi();
    
    await fetchPlayers();
    
    expect(players.value).toEqual(mockData.data);
    expect(loading.value).toBe(false);
  });
});
```

---

## 🎨 Componente Completo de Referencia

Ver `src/components/PlayersRovo.vue` para un ejemplo completo con:
- ✅ CRUD completo
- ✅ UI con Vuetify
- ✅ Diálogos de confirmación
- ✅ Snackbars para notificaciones
- ✅ Estados de loading
- ✅ Manejo de errores
- ✅ Formateo de fechas
- ✅ Responsive design

---

## 🔧 Configuración

Para usar con tu API local, asegúrate de que la URL en `playerApiService.ts` apunte correctamente:

```typescript
const API_BASE_URL = 'http://dev.bgt.local/api/v1';
```

O configura una variable de entorno `.env`:

```env
VITE_API_BASE_URL=http://dev.bgt.local/api/v1
```

Y modifica el servicio:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://dev.bgt.local/api/v1';
```

---

## 📍 Agregar la Ruta

En `src/router/index.js`, agrega:

```javascript
{
  path: '/players-rovo',
  name: 'PlayersRovo',
  component: () => import('../views/PlayersRovoView.vue')
}
```

---

## 🎯 Resumen

### ✅ Patrón Recomendado
```
PlayersRovo.vue (Vista)
    ↓
usePlayersApi() (Composable)
    ↓
playerApiService.ts (API Service)
    ↓
fetch() → API Real
```

### ✅ Ventajas
- **Separación clara** de responsabilidades
- **Reutilizable** en múltiples componentes
- **Testeable** fácilmente
- **Type-safe** con TypeScript
- **Estados manejados** automáticamente (loading, error)
- **Actualización local** optimista de la UI
