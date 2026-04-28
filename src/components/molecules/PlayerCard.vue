<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faPenToSquare, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { findInitials, getRandomNumber } from '../../utils/generalUtils';
import { ref, type Ref } from "vue";
import AppButton from '../atoms/buttons/AppButton.vue';
import MinorHeading from '../atoms/typography/MinorHeading.vue';
import EditButton from '../atoms/buttons/EditButton.vue';
import DeleteButton from '../atoms/buttons/DeleteButton.vue';

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

const randomBackground = () => {
  const backgroundColors = ["#D44D5C", "#227C9D", "#0B6E4F", "#F68E5F", "#BBA63A", "#3F88C5", "#6B7557", "#41B491", "#721817", "#38AECC", "#E2856E", "#800E13", "#3E8989"];
  const colorAmount = backgroundColors.length;

  return backgroundColors[getRandomNumber(0, colorAmount)];
}

const backgroundAvatar: Ref<string> = ref(randomBackground());

</script>

<template>
  <v-card
    data-testid="player-card"
    class="player-card"
    variant="elevated"
    hover
  >
    <v-card-item class="player-card-text ps-2">
      <v-avatar :color="backgroundAvatar" size="default" class="me-2">
        <span class="text-white">{{ findInitials(player.name) }}</span>
      </v-avatar>
      <MinorHeading
        data-testid="player-card-name"
        class="player-card-title"
        >
          {{ player.name }}
      </MinorHeading>
      <FontAwesomeIcon
        v-if="player.is_registered"
        :icon="faCircleCheck"
        class="ms-1"
      />
    </v-card-item>

    <v-card-actions class="player-card-actions">
      <EditButton
        data-testid="player-card-edit-btn"
        @click="handleEditPlayer"
      />
      <DeleteButton
        data-testid="player-card-delete-btn"
        @click="handleDeletePlayer"
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

.player-card-title {
  margin-bottom: 0 !important;
}

</style>
