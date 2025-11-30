<script setup lang="ts">
import type { Player } from '../../types/domain/player';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  player: Player,
}>()

defineOptions({ name: "PlayerCard" });

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
      <v-btn class="button-edit" rounded="circle">
        <FontAwesomeIcon :icon="faPenToSquare" />
      </v-btn>
      <v-btn class="button-delete" rounded="circle">
        <FontAwesomeIcon :icon="faTrash" />
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
