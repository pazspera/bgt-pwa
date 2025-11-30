<script setup lang="ts">
import type { Player } from '../../types/domain/player';

const props = defineProps<{
  player: Player,
}>()

defineOptions({ name: "PlayerCard" });

</script>

<template>
  <v-card
   data-testid="player-card"
  >
    <template #text>
      <span
        data-testid="player-card-name">
        {{ player.name }}
      </span>
    </template>
  </v-card>
</template>
