<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { onBeforeMount } from 'vue';
import PlayerCard from '../molecules/PlayerCard.vue';
import BoardgameCard from '../molecules/BoardgameCard.vue';
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';

// definir un or con los distintos tipos de card que puede recibir
type GridItem = PlayerApiResponse | CollectionsApiResponse;

const props = defineProps<{
  data: GridItem[],
  type: "player" | "boardgame" | "game",
}>();

function isPlayer(item: GridItem): item is PlayerApiResponse {
  return props.type === "player" && "is_registered" in item;
}

function isBoardgame(item: CollectionsApiResponse): item is CollectionsApiResponse {
  return props.type === "boardgame" && "bbg_id" in item;
}

const emit = defineEmits<{
  'edit-player': [player: PlayerApiResponse],
  'delete-player': [player: PlayerApiResponse],
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
        lg="4"
      >
        <PlayerCard v-if="isPlayer(item)" 
          :player="item"
          @edit-player="(player) => $emit('edit-player', player)"
          @delete-player="(player) => $emit('delete-player', player)"
        />

        <BoardgameCard v-else-if="isBoardgame(item)"
          :boardgame="item"
        />
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