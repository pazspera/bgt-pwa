<script setup lang="ts">
import type { GameApiResponse } from '../../types/domain/gamesApi';
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrophy, faChevronDown, faChevronUp, } from '@fortawesome/free-solid-svg-icons';
import CardHeading from '@/components/atoms/typography/CardHeading.vue';
import MinorHeading from '@/components/atoms/typography/MinorHeading.vue';
import EditButton from '@/components/atoms/buttons/EditButton.vue';
import DeleteButton from '@/components/atoms/buttons/DeleteButton.vue';
import DetailText from '@/components/atoms/typography/DetailText.vue';
import { formatDate } from '@/utils/formatters';
import { GAME_CARD_TEXT } from '@/constants/ui_text/GameCard';

defineOptions({ name: "GameCard" });

const props = defineProps<{
  game: GameApiResponse
}>();

const emit = defineEmits<{
  'delete-game': [game: GameApiResponse],
}>();

const handleDeleteGame = () => {
  console.log("emit delete-game");
  console.log(props.game);
  emit('delete-game', props.game);
}

const showDetails = ref(false);

const countPlayers = () => {
  return props.game.players.length ?? 0;
}

const getWinner = () => {
  const winner = props.game.players.find((player) => player.is_winner);
  return winner.player_name ?? GAME_CARD_TEXT.NO_WINNER;
}

</script>

<template>
  <v-card
    class="game-card"
    variant="elevated"
    hover
  >
    <div>
      <v-card-title class="ps-2">
        <CardHeading class="mb-n3">
          {{ game.boardgame_name }}
        </CardHeading>
      </v-card-title>
  
      <v-card-subtitle v-if="game.start_date" class="game-card-date ps-2">
        <DetailText>
          {{ formatDate(game.start_date) }}
        </DetailText>
      </v-card-subtitle>
    </div>

    <v-card-item v-if="game.players?.length" class="game-card-players ps-2">
      <DetailText class="detail-text">{{ GAME_CARD_TEXT.PLAYERS_COUNT_TEXT(countPlayers()) }}</DetailText>
      <DetailText class="detail-text">{{ GAME_CARD_TEXT.WINNER_TEXT(getWinner()) }}</DetailText>
    </v-card-item>

    <!-- edge case where the card has no players attached -->
    <v-card-item v-else class="game-card-players ps-2">
      <DetailText class="detail-text">{{ GAME_CARD_TEXT.NO_PLAYERS }}</DetailText>
      <DetailText class="hidden-text">-</DetailText>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-actions class="card-actions">
      <div class="container-action-buttons">
        <EditButton/>
        <DeleteButton
          class="ml-sm-1 ml-md-3"
          @click="handleDeleteGame"
        />
      </div>

      <v-btn icon @click="showDetails = !showDetails">
        <FontAwesomeIcon
          :icon="showDetails ? faChevronUp : faChevronDown"
        />
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-if="showDetails" class="ps-2 w-100">
        <v-divider class="mb-4"></v-divider>

        <MinorHeading>
          Jugadores:
        </MinorHeading>

        <div class="players-list mb-2">
          <ul
            v-if="game.players?.length"
            v-for="player in game.players"
            :key="player.player_id"
          >
            <li class="ms-4">
              <div class="player-item">
                <DetailText
                  class="detail-text"
                  :class="{ 'winner-player': player.is_winner }">
                    {{ player.player_name }}
                </DetailText>
                <FontAwesomeIcon
                  v-if="player.is_winner"
                  :icon="faTrophy"
                  class="ps-1 text-primary"
                />
              </div>
            </li>
          </ul>
          <DetailText v-else class="detailText">{{ GAME_CARD_TEXT.NO_PLAYERS }}</DetailText>
        </div>

        <v-card-item v-if="game.notes" class="game-card-notes">
          <MinorHeading>
            Notas:
          </MinorHeading>
          <DetailText>
            {{ game.notes }}
          </DetailText>
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
  justify-content: space-between;
}

.game-card-date,
.game-card-players,
.game-card-notes {
  padding: 8px 0;
}

.winner-player {
  font-weight: 600;
}

.winner-icon {
  color: #fbbf24;
  font-size: 1rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;

}

.detail-text {
  display: block;
  margin-bottom: 4px;
}

.player-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
}

.player-item .detail-text {
  margin-bottom: 0px;
}

.hidden-text {
  visibility: hidden;
}

@media only screen and (min-width: 600px) and (max-width: 960px) {
  .container-action-buttons {
    display: flex;
    flex-direction: row;
  }
}
</style>
