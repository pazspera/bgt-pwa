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
        variant="text"
      >
        <FontAwesomeIcon :icon="faPenToSquare" class="icon-edit" /> Editar
      </v-btn>
      <v-btn 
        data-testid="player-card-delete-btn"
        @click="handleDeletePlayer"
        class="action-btn button-delete" 
        variant="text"
      >
        <FontAwesomeIcon :icon="faTrash" class="icon-delete" /> Borrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.player-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: self-start;
}

.player-card-text,
.player-card-actions {
  padding: 16px;
}

.button-edit,
.button-delete {
  cursor: pointer;
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
