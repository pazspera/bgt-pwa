<script setup lang="ts">
import type { PlayerApiResponse } from '../../types/domain/playerApi';
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { GameApiResponse } from '../../types/domain/gamesApi';
import { onBeforeMount } from 'vue';
import PlayerCard from '@/components/molecules/PlayerCard.vue';
import BoardgameCard from '@/components/molecules/BoardgameCard.vue';
import GameCard from '@/components/molecules/GameCard.vue';

type GridItem = PlayerApiResponse | CollectionsApiResponse | GameApiResponse;

const props = defineProps<{
  data: GridItem[],
  type: "player" | "boardgame" | "game",
}>();

function getItemId(item: GridItem): string {
  if ("bgg_id" in item) return item.id;
  if ("boardgame_id" in item) return item.boardgame_id;
  if ("notes" in item) return item.id;
  return "";
}

function isPlayer(item: GridItem): item is PlayerApiResponse {
  return props.type === "player" && "is_registered" in item;
}

function isBoardgame(item: GridItem): item is CollectionsApiResponse {
  return props.type === "boardgame" && "bgg_id" in item;
}

function isGame(item: GridItem): item is GameApiResponse {
  return props.type === "game" && "start_date" in item;
}

const emit = defineEmits<{
  'edit-player': [player: PlayerApiResponse],
  'delete-player': [player: PlayerApiResponse],
  'add-game': [boardgame: CollectionsApiResponse],
  'delete-game': [game: GameApiResponse],
  'edit-game': [game: GameApiResponse],
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
        :key="getItemId(item)"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <PlayerCard v-if="isPlayer(item)"
          :player="item"
          @edit-player="(player) => $emit('edit-player', player)"
          @delete-player="(player) => $emit('delete-player', player)"
        />

        <BoardgameCard v-else-if="isBoardgame(item)"
          :boardgame="item"
          @add-game="(boardgame) => $emit('add-game', boardgame)"
        />

        <GameCard v-else-if="isGame(item)"
          :game="item"
          @delete-game="(game) => $emit('delete-game', game)"
          @edit-game="(game) => $emit('edit-game', game)"
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