<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { onBeforeMount } from 'vue';
import PlayerCard from '../molecules/PlayerCard.vue';

type GridItem = PlayerApiResponse;

// definir un or con los distintos tipos de card que puede recibir
const props = defineProps<{
  data: GridItem[],
  type: "player" | "boardgame" | "game",
}>();

onBeforeMount(()=> {
  console.log(props.data);
})

</script>

<template>
  <h2>Card grid</h2>

  <v-container>
    <v-row>
      <v-col
        v-for="item in data"
        :key="item.id"
      >
        <PlayerCard v-if="type === 'player'" :player="item" />
      </v-col>
    </v-row>
  </v-container>
</template>