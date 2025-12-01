<!--
  PlayersRovo Component
  
  Componente de ejemplo que demuestra cómo interactuar con la API real de players
  usando el patrón recomendado: Composables + Fetch
  
  Características:
  - Lista de jugadores con paginación
  - Crear nuevo jugador
  - Actualizar jugador existente
  - Eliminar jugador
  - Manejo de estados: loading, error, success
  - UI con Vuetify
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlayersApi } from '@/composables/usePlayersApi';
import { usePlayerApi } from '@/composables/usePlayerApi';

defineOptions({ name: 'PlayersRovo' });

// Composables para gestionar la API
const { 
  players, 
  totalPlayers, 
  loading: loadingList, 
  error: errorList,
  fetchPlayers,
  createPlayer,
  removePlayer 
} = usePlayersApi();

const {
  player: selectedPlayer,
  loading: loadingPlayer,
  error: errorPlayer,
  fetchPlayer,
  updatePlayer
} = usePlayerApi();

// Estado local del componente
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const showDetailsDialog = ref(false);
const newPlayerName = ref('');
const editPlayerName = ref('');
const editPlayerId = ref('');
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

// Cargar jugadores al montar el componente
onMounted(async () => {
  await fetchPlayers();
});

// ========== HANDLERS DE ACCIONES ==========

/**
 * Crea un nuevo jugador
 */
const handleCreatePlayer = async () => {
  if (!newPlayerName.value.trim()) {
    showSnackbar('El nombre no puede estar vacío', 'error');
    return;
  }

  const created = await createPlayer(newPlayerName.value.trim());
  
  if (created) {
    showSnackbar(`Jugador "${created.name}" creado exitosamente`, 'success');
    showCreateDialog.value = false;
    newPlayerName.value = '';
  } else {
    showSnackbar(errorList.value || 'Error al crear jugador', 'error');
  }
};

/**
 * Abre el diálogo para editar un jugador
 */
const handleOpenEdit = async (id: string) => {
  await fetchPlayer(id);
  
  if (selectedPlayer.value) {
    editPlayerId.value = id;
    editPlayerName.value = selectedPlayer.value.name;
    showEditDialog.value = true;
  }
};

/**
 * Actualiza un jugador existente
 */
const handleUpdatePlayer = async () => {
  if (!editPlayerName.value.trim()) {
    showSnackbar('El nombre no puede estar vacío', 'error');
    return;
  }

  const success = await updatePlayer(editPlayerId.value, editPlayerName.value.trim());
  
  if (success) {
    showSnackbar('Jugador actualizado exitosamente', 'success');
    showEditDialog.value = false;
    
    // Actualizar la lista local
    const index = players.value.findIndex(p => p.id === editPlayerId.value);
    if (index !== -1 && selectedPlayer.value) {
      players.value[index] = selectedPlayer.value;
    }
  } else {
    showSnackbar(errorPlayer.value || 'Error al actualizar jugador', 'error');
  }
};

/**
 * Elimina un jugador con confirmación
 */
const handleDeletePlayer = async (id: string, name: string) => {
  if (!confirm(`¿Estás seguro de eliminar al jugador "${name}"?`)) {
    return;
  }

  const success = await removePlayer(id);
  
  if (success) {
    showSnackbar(`Jugador "${name}" eliminado exitosamente`, 'success');
  } else {
    showSnackbar(errorList.value || 'Error al eliminar jugador', 'error');
  }
};

/**
 * Muestra los detalles de un jugador
 */
const handleViewDetails = async (id: string) => {
  await fetchPlayer(id);
  showDetailsDialog.value = true;
};

/**
 * Refresca la lista de jugadores
 */
const handleRefresh = async () => {
  await fetchPlayers();
  showSnackbar('Lista actualizada', 'info');
};

/**
 * Muestra un snackbar con mensaje
 */
const showSnackbar = (text: string, color: string = 'success') => {
  snackbarText.value = text;
  snackbarColor.value = color;
  snackbar.value = true;
};

/**
 * Formatea la fecha de creación
 */
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};
</script>

<template>
  <v-container class="players-rovo">
    <!-- Header -->
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4 mb-2">🎮 Gestión de Jugadores</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Ejemplo de integración con API usando Composables + Fetch
        </p>
      </v-col>
    </v-row>

    <!-- Actions Bar -->
    <v-row class="mb-4">
      <v-col>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="showCreateDialog = true"
          :disabled="loadingList"
        >
          Crear Jugador
        </v-btn>
        
        <v-btn
          color="secondary"
          prepend-icon="mdi-refresh"
          @click="handleRefresh"
          :loading="loadingList"
          class="ml-2"
        >
          Refrescar
        </v-btn>

        <v-chip class="ml-4" color="info">
          Total: {{ totalPlayers }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- Error Alert -->
    <v-row v-if="errorList">
      <v-col>
        <v-alert
          type="error"
          variant="tonal"
          closable
          @click:close="errorList = null"
        >
          {{ errorList }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-if="loadingList && (!players || players.length === 0)">
      <v-col class="text-center py-8">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="mt-4">Cargando jugadores...</p>
      </v-col>
    </v-row>

    <!-- Players List -->
    <v-row v-else-if="players && players.length > 0">
      <v-col
        v-for="player in players"
        :key="player.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card elevation="2" class="player-card">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-account-circle" class="mr-2"></v-icon>
            {{ player.name }}
            
            <v-chip
              v-if="player.is_registered"
              size="small"
              color="success"
              class="ml-2"
            >
              Registrado
            </v-chip>
          </v-card-title>

          <v-card-subtitle class="text-caption">
            ID: {{ player.id.slice(0, 8) }}...
          </v-card-subtitle>

          <v-card-text>
            <div class="text-caption">
              <strong>Creado:</strong> {{ formatDate(player.created_at) }}
            </div>
            <div v-if="player.user_id" class="text-caption mt-1">
              <strong>User ID:</strong> {{ player.user_id.slice(0, 8) }}...
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              size="small"
              variant="text"
              color="primary"
              @click="handleViewDetails(player.id)"
            >
              Ver
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              color="info"
              @click="handleOpenEdit(player.id)"
            >
              Editar
            </v-btn>

            <v-btn
              size="small"
              variant="text"
              color="error"
              @click="handleDeletePlayer(player.id, player.name)"
            >
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else>
      <v-col class="text-center py-8">
        <v-icon icon="mdi-account-off" size="64" color="grey"></v-icon>
        <p class="text-h6 mt-4">No hay jugadores</p>
        <p class="text-body-2 text-medium-emphasis">
          Crea tu primer jugador usando el botón "Crear Jugador"
        </p>
      </v-col>
    </v-row>

    <!-- Create Player Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="500">
      <v-card>
        <v-card-title>Crear Nuevo Jugador</v-card-title>
        
        <v-card-text>
          <v-text-field
            v-model="newPlayerName"
            label="Nombre del jugador"
            placeholder="Ej: Zeuchi5"
            variant="outlined"
            :disabled="loadingList"
            @keyup.enter="handleCreatePlayer"
            autofocus
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="showCreateDialog = false"
            :disabled="loadingList"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="handleCreatePlayer"
            :loading="loadingList"
          >
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Player Dialog -->
    <v-dialog v-model="showEditDialog" max-width="500">
      <v-card>
        <v-card-title>Editar Jugador</v-card-title>
        
        <v-card-text>
          <v-text-field
            v-model="editPlayerName"
            label="Nombre del jugador"
            variant="outlined"
            :disabled="loadingPlayer"
            @keyup.enter="handleUpdatePlayer"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="showEditDialog = false"
            :disabled="loadingPlayer"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="handleUpdatePlayer"
            :loading="loadingPlayer"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Details Dialog -->
    <v-dialog v-model="showDetailsDialog" max-width="600">
      <v-card v-if="selectedPlayer">
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-account-details" class="mr-2"></v-icon>
          Detalles del Jugador
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-4">
          <v-list density="compact">
            <v-list-item>
              <v-list-item-title>ID</v-list-item-title>
              <v-list-item-subtitle>{{ selectedPlayer.id }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Nombre</v-list-item-title>
              <v-list-item-subtitle>{{ selectedPlayer.name }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Registrado</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip 
                  :color="selectedPlayer.is_registered ? 'success' : 'warning'"
                  size="small"
                >
                  {{ selectedPlayer.is_registered ? 'Sí' : 'No' }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selectedPlayer.user_id">
              <v-list-item-title>User ID</v-list-item-title>
              <v-list-item-subtitle>{{ selectedPlayer.user_id }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fecha de Creación</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(selectedPlayer.created_at) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Última Actualización</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(selectedPlayer.updated_at) }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="showDetailsDialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.players-rovo {
  max-width: 1400px;
  margin: 0 auto;
}

.player-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.player-card .v-card-actions {
  margin-top: auto;
}
</style>
