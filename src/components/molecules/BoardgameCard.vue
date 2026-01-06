<script setup lang="ts">
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  boardgame: CollectionsApiResponse
}>();

defineOptions({ name: "BoardgamesCard" });

</script>

<template>
  <v-card
    data-testid="boardgame-card"
    class="boardgame-card"
    variant="elevated"
    hover
  >
    <v-card-title>
      {{ boardgame.name }}
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="plain"
      >
        <FontAwesomeIcon :icon="faPlus" />
        <span>Agregar partida</span>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<style scoped>
.boardgame-card {
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 12px;
}
</style>