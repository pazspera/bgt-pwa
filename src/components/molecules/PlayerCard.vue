<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  player: PlayerApiResponse,
}>();

const emit = defineEmits<{
  'edit-player': [player: PlayerApiResponse],
  'delete-player': [player: PlayerApiResponse],
}>();

defineOptions({ name: "PlayerCard" });

const handleEditPlayer = () => {
  emit("edit-player", props.player);
}

const handleDeletePlayer = () => {
  emit("delete-player", props.player);
}

</script>

<template>
  <v-card
    data-testid="player-card"
    class="player-card"
    variant="elevated"
    hover
  >
    <v-card-text class="player-card-text">
      <span data-testid="player-card-name">{{ player.name }}</span>
    </v-card-text>

    <v-card-actions class="player-card-actions">
      <v-btn 
        data-testid="player-card-edit-btn"
        @click="handleEditPlayer"  
        class="action-btn button-edit" 
        rounded="circle" 
        icon
        variant="text"
      >
        <FontAwesomeIcon :icon="faPenToSquare" class="icon-edit" />
      </v-btn>
      <v-btn 
        data-testid="player-card-delete-btn"
        @click="handleDeletePlayer"
        class="action-btn button-delete" 
        rounded="circle" 
        icon
        variant="text"
      >
        <FontAwesomeIcon :icon="faTrash" class="icon-delete" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.player-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.player-card-text,
.player-card-actions {
  padding: 16px;
}

.button-edit,
.button-delete {
  cursor: pointer;
}

/* --- Fix global hover para btn --- */
.action-btn {
  color: inherit !important;
}

/* FIX LIGHT MODE */
:root .v-theme--lightTheme :deep(.v-btn.action-btn:hover) {
  /* Redefinimos la variable que Vuetify usa para pintar el contenido (icono) */
  --v-theme-on-surface: var(--accent-600) !important;
  color: var(--accent-600) !important;
}

:root .v-theme--lightTheme :deep(.v-btn.action-btn:hover .v-btn__overlay) {
  background-color: var(--primary-600) !important;
  opacity: 1 !important;
}

/* Forzamos el SVG a usar la variable que acabamos de setear */
:root .v-theme--lightTheme :deep(.v-btn.action-btn:hover svg) {
  fill: var(--accent-600) !important;
  color: var(--accent-600) !important;
}

/* --- FIX DARK MODE (El que ya te funcionaba) --- */
:root .v-theme--darkTheme :deep(.v-btn.action-btn:hover .v-btn__overlay) {
  background-color: var(--primary-300) !important;
  opacity: 0.2 !important;
}

:root .v-theme--darkTheme :deep(.v-btn.action-btn:hover svg) {
  fill: var(--accent-400) !important;
  color: var(--accent-400) !important;
}

@media(max-width: 400px) {
  .player-card {
    flex-direction: column;
    align-items: start;
  }

  .player-card-actions {
    padding-top: 0;
  }

  .player-card-text {
    padding-bottom: 8px;
  }
}
</style>

<style>
/* Global styles for button hover state */
/* .button-edit:hover .icon-edit,
.button-delete:hover .icon-delete {
  color: var(--v-surface) !important;
  fill: var(--v-surface) !important;
} */

 

</style>
