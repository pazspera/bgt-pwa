<script setup lang="ts">
import type { Player } from '../../types/domain/player';

const props = defineProps<{
  player: Player,
}>()

defineOptions({ name: "PlayerCard" });

</script>

<template>
  <v-card
   text="prueba card"
  >
 
  </v-card>
</template>