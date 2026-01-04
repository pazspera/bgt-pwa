<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AppButton from '../atoms/buttons/AppButton.vue';

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
      <AppButton 
        variant="text"
        label="Editar"
        :icon="faPenToSquare"
        @click="handleEditPlayer"
        class="action-btn button-edit"
        data-testid="player-card-edit-btn"   
      />
      <AppButton
        variant="tonal"
        label="Borrar 2"
        :icon="faTrash"
        @click="handleDeletePlayer"
        color="error"
        class="action-btn button-delete"
        data-testid="player-card-delete-btn" 
      />
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

.button-edit,
.button-delete {
  cursor: pointer;
}

</style>
