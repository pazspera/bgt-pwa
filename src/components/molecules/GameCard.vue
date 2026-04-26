<script setup lang="ts">
import type { GameApiResponse } from '../../types/domain/gamesApi';
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrophy, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CardHeading from '../atoms/typography/CardHeading.vue';
import MinorHeading from '../atoms/typography/MinorHeading.vue';
import BodyText from '../atoms/typography/BodyText.vue';
import AppButton from '../atoms/buttons/AppButton.vue';

defineOptions({ name: "GameCard" });

const props = defineProps<{
  game: GameApiResponse
}>();

const showDetails = ref(false);

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<template>
  <v-card
    data-testid="game-card"
    class="game-card"
    variant="elevated"
    hover
  >
    <v-card-title class="ps-2">
      <CardHeading>
        {{ game.boardgame_name }}
      </CardHeading>
    </v-card-title>

    <v-card-item v-if="game.start_date" class="game-card-date ps-2">
      <MinorHeading class="date-label">
        Fecha:
      </MinorHeading>
      <BodyText class="date-value">
        {{ formatDate(game.start_date) }}
      </BodyText>
    </v-card-item>

    <v-card-item class="game-card-players ps-2">
      <MinorHeading class="players-label">
        Jugadores:
      </MinorHeading>
      <div class="players-list">
        <div
          v-for="player in game.players"
          :key="player.player_id"
          class="player-item"
          :class="{ 'winner-player': player.is_winner }"
        >
          <span class="player-name">{{ player.player_name }}</span>
          <FontAwesomeIcon
            v-if="player.is_winner"
            :icon="faTrophy"
            class="winner-icon"
          />
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <AppButton
        color="primary"
        variant="flat"
        label="Editar"
      />
      <v-btn
        @click="showDetails = !showDetails"
      >
        <FontAwesomeIcon
          :icon="showDetails ? faChevronUp : faChevronDown"
        />
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-if="showDetails">
        <v-divider></v-divider>

        <v-card-item v-if="game.notes" class="game-card-notes ps-2">
          <MinorHeading class="notes-label">
            Notas:
          </MinorHeading>
          <BodyText>
            {{ game.notes }}
          </BodyText>
        </v-card-item>

      </div>
    </v-expand-transition>

  </v-card>
</template>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  align-items: self-start;
  padding: 12px;
}

.game-card-date,
.game-card-players,
.game-card-notes {
  padding: 8px 0;
}

.date-label,
.players-label,
.notes-label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.player-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.winner-player {
  font-weight: 600;
  color: #fbbf24;
}

.winner-icon {
  color: #fbbf24;
  font-size: 1rem;
}
</style>
