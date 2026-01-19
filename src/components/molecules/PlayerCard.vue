<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { findInitials } from '../../utils/findInitials';

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
    <v-card-item class="player-card-text ps-2">
      <v-avatar color="info" size="default" class="me-2">
        <span>{{ findInitials(player.name) }}</span>
      </v-avatar>
      <span data-testid="player-card-name">{{ player.name }}</span>
    </v-card-item>

    <v-card-actions class="player-card-actions">
      <v-btn 
        data-testid="player-card-edit-btn"
        @click="handleEditPlayer"  
        class="action-btn button-edit"
        color="primary"
        variant="flat"
      >
        <FontAwesomeIcon :icon="faPenToSquare" class="icon-edit" />
        <span>Editar</span>
      </v-btn>
      <v-btn 
        data-testid="player-card-delete-btn"
        @click="handleDeletePlayer"
        class="action-btn button-delete"
        color="error"
        variant="text" 
      >
        <FontAwesomeIcon :icon="faTrash" class="icon-delete" />
        <span>Borrar</span>
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
  padding: 12px;
}

.player-card-text :deep(.v-card-item__content) {
  display: flex !important;
  flex-direction: row;
  align-items: center !important;
  justify-content: center;
}

.button-edit,
.button-delete {
  cursor: pointer;
}

</style>
