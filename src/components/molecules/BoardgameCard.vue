<script setup lang="ts">
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus, faUserGroup, faClock } from "@fortawesome/free-solid-svg-icons";
import CardHeading from '@/components/atoms/typography/CardHeading.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import { BUTTONS_TEXT } from '@/constants/buttonsText';
import DetailText from '../atoms/typography/DetailText.vue';
import { BOARDGAME_CARD_TEXT } from '@/constants/ui_text/BoardGameCard';
import { getBoardgameComplexity } from '@/utils/boardgame';
import CardInfo from '../atoms/typography/CardInfo.vue';

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

    <div>
      <v-card-title class="ps-2">
        <CardHeading class="mb-n1">
          {{ boardgame.name }}
        </CardHeading>
      </v-card-title>

      <v-card-subtitle class="ps-2">
        <DetailText>{{ boardgame.description }}</DetailText>
      </v-card-subtitle>
    </div>

    <div class="ps-2 pt-3 pb-2 boardgame-card-info">
      <div class="mb-1">
        <FontAwesomeIcon :icon="faUserGroup" class="me-1" />
        <CardInfo>{{ BOARDGAME_CARD_TEXT.MIN_MAX_PLAYERS(boardgame.min_players, boardgame.max_players) }}</CardInfo>
      </div>
      <div class="playtime-item">
        <FontAwesomeIcon :icon="faClock" class="me-1" />
        <CardInfo>{{ BOARDGAME_CARD_TEXT.PLAYING_TIME(boardgame.playing_time) }}</CardInfo>
      </div>
    </div>

    <div class="ps-2 pb-3">
      <v-chip>
        <CardInfo>{{ getBoardgameComplexity(boardgame.complexity) }}</CardInfo>
      </v-chip>
    </div>

    <v-card-actions>
      <AppButton
        color="primary"
        variant="flat"
        :label="BUTTONS_TEXT.ADD_GAME"
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

.boardgame-card-info {
  display: flex;
  flex-direction: column;
}



@media (min-width: 750px) {
  .boardgame-card-info {
    flex-direction: row;
  }

  .playtime-item {
    margin-left: 16px;
  }
}

@media (min-width: 1146px) {
  .playtime-item {
    margin-left: 24px;
  }
}

:deep(.v-card--hover) {
  cursor: default;
}

</style>