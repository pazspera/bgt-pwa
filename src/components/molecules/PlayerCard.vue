<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  player: PlayerApiResponse,
}>();

const emit = defineEmits<{
  editPlayer: [id: number],
  deletePlayer: [id: number],
}>();

defineOptions({ name: "PlayerCard" });

const handleEditPlayer = () => {
  emit("editPlayer", props.player.id);
}

const handleDeletePlayer = () => {
  emit("deletePlayer", props.player.id);
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
        class="button-edit" 
        rounded="circle" 
        icon
      >
        <FontAwesomeIcon :icon="faPenToSquare" class="icon-edit" />
      </v-btn>
      <v-btn 
        data-testid="player-card-delete-btn"
        @click="handleDeletePlayer"
        class="button-delete" 
        rounded="circle" 
        icon
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
.button-edit:hover .icon-edit,
.button-delete:hover .icon-delete {
  color: var(--v-surface) !important;
  fill: var(--v-surface) !important;
}
</style>
