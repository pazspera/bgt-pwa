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
    class="d-flex"
  >
    <template #text>
      <span data-testid="player-card-name">{{ player.name }}</span>
    </template>

    <template #actions>
      <FontAwesomeIcon :icon="faPenToSquare" />
      <FontAwesomeIcon :icon="faTrash" />
    </template>
  </v-card>
</template>
