<script setup lang="ts">
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  boardgame: CollectionsApiResponse
}>()

</script>

<template>
  <v-card
    data-testid="boardgame-card"
    variant="elevated"
    hover
  >
    <v-card-item>
      {{ boardgame.name }}
    </v-card-item>

    
  </v-card>
</template>

<style></style>