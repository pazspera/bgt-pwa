<!--
  PlayersRovoView
  
  Vista de ejemplo que usa el componente PlayersRovo
  Para probarla, agrega esta ruta en src/router/index.js:
  
  {
    path: '/players-rovo',
    name: 'PlayersRovo',
    component: () => import('../views/PlayersRovoView.vue')
  }
-->

<script setup lang="ts">
import PlayersRovo from '@/components/PlayersRovo.vue';

defineOptions({ name: 'PlayersRovoView' });
</script>

<template>
  <div class="players-rovo-view">
    <!-- Hero Section -->
    <v-container fluid class="hero-section py-8 mb-4">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="text-h3 font-weight-bold mb-2">
              🎮 Players API Demo
            </h1>
            <p class="text-h6 text-medium-emphasis">
              Ejemplo completo de integración con API REST usando Vue 3 + Composition API
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Main Component -->
    <PlayersRovo />

    <!-- Info Section -->
    <v-container class="mt-8">
      <v-row>
        <v-col cols="12">
          <v-card variant="tonal" color="info">
            <v-card-title>
              <v-icon icon="mdi-information" class="mr-2"></v-icon>
              Arquitectura Utilizada
            </v-card-title>
            <v-card-text>
              <ul class="pl-4">
                <li><strong>API Service Layer:</strong> <code>src/api/playerApiService.ts</code> - Funciones fetch puras</li>
                <li><strong>Composables:</strong> <code>src/composables/usePlayersApi.ts</code> y <code>usePlayerApi.ts</code> - Lógica reactiva reutilizable</li>
                <li><strong>Components:</strong> <code>src/components/PlayersRovo.vue</code> - UI con Vuetify</li>
                <li><strong>Types:</strong> <code>src/types/domain/playerApi.ts</code> - TypeScript interfaces</li>
              </ul>
              
              <v-divider class="my-4"></v-divider>
              
              <p class="text-body-2">
                <strong>Patrón recomendado:</strong> Vista → Composable → API Service → API Real
              </p>
              <p class="text-body-2 mt-2">
                ✅ Separación de responsabilidades<br>
                ✅ Código reutilizable<br>
                ✅ Fácil de testear<br>
                ✅ Manejo de estados (loading, error, data)<br>
                ✅ TypeScript type-safe
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, rgba(156, 103, 189, 0.1) 0%, rgba(181, 232, 83, 0.1) 100%);
}

code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}
</style>
