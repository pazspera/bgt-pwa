<script setup lang="ts">
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CardHeading from '../atoms/typography/CardHeading.vue';
import AppButton from '../atoms/buttons/AppButton.vue';

const props = defineProps<{
  boardgame: CollectionsApiResponse
}>();

defineOptions({ name: "BoardgamesCard" });

const emit = defineEmits<{
  "add-game": [ boardgame: CollectionsApiResponse ],
}>();

</script>

<template>
  <v-card
    data-testid="boardgame-card"
    class="boardgame-card"
    variant="elevated"
    hover
  >

    <v-card-title class="ps-2">
      <CardHeading>
        {{ boardgame.name }}
      </CardHeading>
    </v-card-title>

    <v-card-actions>
      <AppButton
        color="primary"
        variant="flat"
        label="Agregar Partida"
        density="default"
        :icon="faPlus"
        @click="emit('add-game', boardgame)"
      >
      </AppButton>
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