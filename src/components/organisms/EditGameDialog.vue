<script setup lang="ts">
import { AddGameDialogText } from '@/constants/ui_text/AddGameDialog';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { usePlayersApi } from '@/composables/usePlayersApi';
import { useGamesApi } from '@/composables/useGamesApi';
import { onBeforeMount, ref, type Ref, watch } from 'vue';
import LoadingRow from '@/components/molecules/LoadingRow.vue';
import { PlayerApiResponse } from '../../types/domain/playerApi';
import { GameApiResponse } from '../../types/domain/gamesApi';
import { object, string, date, array, boolean } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useField, useForm, useFieldArray } from "vee-validate";
import type { PlayerInGame, CreateGameRequest, EditGameInfo } from '../../types/domain/gamesApi';
import BlockHeading from '@/components/atoms/typography/BlockHeading.vue';
import DetailText from '@/components/atoms/typography/DetailText.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';

const props = defineProps<{
  modelValue: boolean,
  game: EditGameInfo,
}>();
defineOptions({ name: "EditGameDialog" });

const emit = defineEmits<{
  "update:modelValue": [ dialogVisibility: boolean ],
  "success": [ message: string],
  "error": [ message: string ]
}>();

const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();
const { loading: saveGameLoading, newGame, errorSaveGame, saveGame } = useGamesApi();

const selectedPlayers: Ref<PlayerApiResponse[]> = ref([]);
const gameWinner: Ref<PlayerApiResponse | null> = ref(null);
const errorCount: Ref<number> = ref(0);
const savingGame: Ref<boolean> = ref(false);

const validationSchema = () => {
  const minPlayer = props.game.boardgame?.min_players ?? 1;
  const maxPlayer = props.game.boardgame?.max_players ?? 9;

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);

  return toTypedSchema(
    object({
      date: date()
        .required(AddGameDialogText.validationErrors.dateRequired)
        .max(maxDate, AddGameDialogText.validationErrors.dateMax),
      players: array()
        .of(object({
          player_id: string().required(),
          is_winner: boolean().required(),
          is_registered: boolean().default(false),
        }))
        .min(minPlayer, AddGameDialogText.validationErrors.playersMin(props.game.boardgame?.min_players))
        .max(maxPlayer, AddGameDialogText.validationErrors.playersMax(props.game.boardgame?.max_players))
      ,
      winner: object({
        player_id: string().required(),
        is_winner: boolean().required(),
        is_registered: boolean().default(false)
      })
        .nullable()
        .required(AddGameDialogText.validationErrors.winnerRequired)
      ,
      notes: string()
        .ensure()
        .max(500, AddGameDialogText.validationErrors.notesMax)
    })
  )
}

const { handleSubmit, resetForm, errors: formErrors, submitCount, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    date: (() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    })(),
    players: [],
    winner: null,
    notes: ""
  },
  validateOnMount: false,
})

const loadExistingGame = (newGame: EditGameInfo) => {
  resetForm({
    values: {
      date: newGame.game.start_date
      ? new Date(newGame.game.start_date)
      : new Date(),
      players: newGame.game.players ?? [],
      winner: newGame.game.players?.find(p => p.is_winner) ?? null,
      notes: newGame.game.notes ?? "",
    }
  })

  if (players.value.length > 0) {
    const gamePlayerIds = newGame.game.players.map(p => p.player_id);
    const matchingPlayers = players.value.filter(p => gamePlayerIds.includes(p.id));
    selectedPlayers.value = matchingPlayers;
    gameWinner.value = matchingPlayers.find(p =>
      newGame.game.players.some(gp => gp.player_id === p.id && gp.is_winner)
    ) ?? null;
  }
}

// WATCH to load initial values to component
watch(()=> props.game, (newGame) => {
loadExistingGame(newGame);
}, { immediate: true });

// WATCH to load selectedPlayers and gameWinner after fetchPlayers completes
watch(players, (loadedPlayers) => {
if (loadedPlayers.length > 0 && props.game) {
  const gamePlayerIds = props.game.game.players.map(p => p.player_id);
  const matchingPlayers = loadedPlayers.filter(p => gamePlayerIds.includes(p.id));
  selectedPlayers.value = matchingPlayers;
  gameWinner.value = matchingPlayers.find(p =>
    props.game.game.players.some(gp => gp.player_id === p.id && gp.is_winner)
  ) ?? null;
}
});


const { value: dateValue, errorMessage: dateError } = useField<Date>('date');
const { value: notesValue, errorMessage: notesError } = useField<String>('notes');
const { value: winnerValue, errorMessage: winnerError, meta: winnerMeta } = useField<PlayerInGame>('winner');
const { fields, push, remove } = useFieldArray<PlayerInGame>('players');

// WATCH FOR PLAYERS SELECT
// watch sincronizes the selection in the input with vee-validate
// We're using selectedPlayers, not the v-model of players
// It would always show the min_players error since players doesn't
// show when a player was added, that's on selectedPlayers
// The watch saves the player added in selectedPlayers using the
// format defined in validationSchema
watch(selectedPlayers, (newPlayers) => {
  // cleans current array in vee-validate
  // if a player is added and deleted, the array has to be repopulated from scratch
  while(fields.value.length > 0) {
    remove(0);
  }

  // loads the data coming from the select
  newPlayers.forEach((player) => {
    push({
      player_id: player.id,
      is_winner: gameWinner.value?.id === player.id,
      is_registered: player.is_registered ?? false,
    })
  })

  // if the selected winner is no longer in the players array, remove it
  if(gameWinner.value && !newPlayers.some(p => p.id === gameWinner.value.id)) {
    gameWinner.value = null;
  }

  // syncronizes winner with vee-validate
  // if there is no winner, it's null
  // if there is a winner, we send the object formated to schema
  winnerValue.value = gameWinner.value ? {
    player_id: gameWinner.value.id,
    is_winner: true,
    is_registered: gameWinner.value.is_registered ?? false,
  } : null;
}, { deep: true });
// deep: true is needed to check if anything changed in the objects in the array
// If the user selects the winner, the player object changes and that prop
// has to be updated in selectedPlayers

// WATCH FOR WINNER SELECT
// checks if the player changes the winner without touching the players
watch(gameWinner, (newWinner)=> {
  winnerValue.value = newWinner ? {
    player_id: newWinner.id,
    is_winner: true,
    is_registered: newWinner.is_registered ?? false,
  } : null;
})

onBeforeMount(async ()=> {
  await fetchPlayers();
})

const closeDialog = () => {
  // reset vee-validate
  resetForm();

  // reset variables
  selectedPlayers.value= [];
  gameWinner.value = null;
  errorCount.value = 0;

  emit("update:modelValue", false);
}

/*
  To avoid an infinite loop of retry messages, we tell the user
  to retry fetchPlayers one time. If it fails again, the error
  message instructs the user to reload the page.
*/
watch(error, (newValue) => {
  if(newValue !== null) {
    errorCount.value++;
  }
})

const handleReloadOnError = async () => {
  if(errorCount.value === 1) {
    await fetchPlayers();

    // resets errorCount if it loads correctly
    if(!error.value) {
      errorCount.value = 0;
    }
  } else {
    window.location.reload();
  }
}
/* *** */

const onSubmit = handleSubmit(async (values) => {
  savingGame.value = true;
  console.log("form válido", values);

  try {
    // maps existing players and check which player is the winner
    // it was showing all players as winner false
    const mappedPlayers = values.players.map((player) => ({
      player_id: player.player_id,
      is_winner: player.player_id === gameWinner.value?.id,
    }))

    const formatLocalISODate = (date: Date) => {
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const absOffset = Math.abs(offset);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const minutes = String(absOffset % 60).padStart(2, '0');
    const isoDate = date.toISOString().slice(0, 19);
    return `${isoDate}${sign}${hours}:${minutes}`;
    };

    const payload: CreateGameRequest = {
      boardgame_id: props.game.game.boardgame_id,
      // NO ENTIENDO DONDE ESTÁ LA COLLECTION_ID
      // está hardcodeado en GamesView
      collection_id: 'b6acc73a-6b7a-4c67-937a-e1a6169f173f',
      player_group_id: null,
      start_date: formatLocalISODate(values.date),
      end_date: formatLocalISODate(new Date(values.date.getTime() + 3600000)),
      notes: values.notes,
      players: mappedPlayers,
    };
    console.log(payload)

    await saveGame(payload);

    emit("success", "¡La partida fue guardada exitosamente!");
    closeDialog();
  } catch (error) {
    emit("error", errorSaveGame.value || "Hubo un error al guardar la partida");
  } finally {
    savingGame.value = false;
  }
})
</script>

<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      max-width="1100px"
      scrollable
      data-testid="add-game-dialog"
    >

      <v-card class="dialog">
        <!-- loading -->
        <div v-if="loading || error" class="overlay-container">
          <div class="d-flex flex-column justify-center align-center w-100">
            <LoadingRow v-if="loading" class="ma-0"></LoadingRow>

            <v-row v-if="error" class="w-66 flex-grow-0">
              <v-col cols="12">
                <v-alert
                  color="error"
                  :title="errorCount === 1 ? AddGameDialogText.errors.failedLoadTitleFirst : AddGameDialogText.errors.failedLoadTitleSecond"
                  class="error-container"
                >
                  <div>
                      <span class="mt-4">{{ errorCount === 1 ? AddGameDialogText.errors.loadFirstTry : AddGameDialogText.errors.loadSecondTry }}</span>
                  </div>
                  <template #append>
                    <v-btn
                      color="white"
                      variant="flat"
                      size="small"
                      @click="handleReloadOnError"
                    >
                      {{ errorCount === 1 ? AddGameDialogText.buttons.retryFirstTry : AddGameDialogText.buttons.retrySecondTry }}
                    </v-btn>
                  </template>
                </v-alert>
              </v-col>
            </v-row>
          </div>
        </div>

        <div :class="{ 'hidden-on-loading': loading || error }" class="content-wrapper">
          <v-card-item class="mb-4" >
            <v-card-title class="dialog-title">
              <BlockHeading>
                {{ AddGameDialogText.title }}
              </BlockHeading>
            </v-card-title>
            <v-card-subtitle>
              <DetailText>
                {{ game.game.boardgame_name }}
              </DetailText>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-form>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-date-input
                    :label="AddGameDialogText.labels.selectDate"
                    v-model="dateValue"
                    :error-messages="dateError"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    variant="outlined"
                  ></v-date-input>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    chips
                    :label="AddGameDialogText.labels.selectPlayers"
                    :hint="selectedPlayers.length === 0 ? AddGameDialogText.hints.selectPlayers : ''"
                    v-model="selectedPlayers"
                    :error-messages="selectedPlayers.length > 0 || submitCount > 0 ? formErrors.players : ''"
                    :items="players"
                    item-title="name"
                    item-value="id"
                    variant="outlined"
                    density="comfortable"
                    multiple
                    persistent-hint
                    return-object
                  >
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-select
                    chips
                    variant="outlined"
                    density="comfortable"
                    v-model="gameWinner"
                    :error-messages="selectedPlayers.length > 0 && (winnerMeta.touched || submitCount > 0) ? winnerError : ''"
                    :disabled="selectedPlayers.length === 0"
                    :label="AddGameDialogText.labels.selectWinner"
                    :items="selectedPlayers"
                    item-title="name"
                    item-value="id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    variant="outlined"
                    v-model="notesValue"
                    :error-messages="notesError"
                    :label="AddGameDialogText.labels.notes"
                    no-resize
                    max-rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions class="dialog-actions mt-3">
            <AppButton
              class="dialog-button"
              type="submit"
              @click="onSubmit"
              color="primary"
              variant="flat"
              density="default"
              :loading="savingGame"
              :icon="faFloppyDisk"
              :label="AddGameDialogText.buttons.save"
            />
            <AppButton
              class="dialog-button"
              color="error"
              variant="text"
              density="default"
              @click="closeDialog"
              :label="AddGameDialogText.buttons.cancel"
            />
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
</template>

<style scoped>
.dialog{
  position: relative !important;
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.content-wrapper {
  transition: opacity 0.3s ease;
}

.dialog-title {
  padding: 16px 24px 0 24px;
}

.dialog-actions {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 24px 16px 24px;
}

.hidden-on-loading {
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 370px) {
  .dialog-actions {
    flex-direction: column;
    align-items: center;
  }

  .dialog-button {
    width: 100%;
  }
}
</style>