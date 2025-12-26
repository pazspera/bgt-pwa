<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { onBeforeMount } from 'vue';
import PlayerCard from '../molecules/PlayerCard.vue';

// definir un or con los distintos tipos de card que puede recibir
type GridItem = PlayerApiResponse;

const props = defineProps<{
  data: GridItem[],
  type: "player" | "boardgame" | "game",
}>();

onBeforeMount(()=> {
  console.log(props.data);
})

</script>

<template>
  <v-container class="card-grid-container">
    <v-row>
      <v-col
        v-for="item in data"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <PlayerCard v-if="type === 'player'" :player="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.card-grid-container {
  padding: 0;
  margin: 24px 0;
}
</style>