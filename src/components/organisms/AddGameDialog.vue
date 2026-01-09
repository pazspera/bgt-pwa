<script setup lang="ts">
import { AddGameDialogText } from '../../constants/ui_text/AddGameDialog';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { CollectionsApiResponse } from '../../types/domain/collectionsApi';
import { usePlayersApi } from '../../composables/usePlayersApi';
import { onBeforeMount, ref, type Ref, watch } from 'vue';
import LoadingRow from '../molecules/LoadingRow.vue';
import { PlayerApiResponse } from '../../types/domain/playerApi';

defineProps<{
  modelValue: boolean,
  boardgame: CollectionsApiResponse | null,
}>();
defineOptions({ name: "AddGameDialog" });

const emit = defineEmits<{
  "update:modelValue": [ dialogVisibility: boolean ],
}>();

const { players, totalPlayers, loading, error, fetchPlayers } = usePlayersApi();

const selectedPlayers= ref([]);
const gameWinner = ref(null);

onBeforeMount(async ()=> {
  await fetchPlayers();
  console.log(players.value);
})

const closeDialog = () => {
  emit("update:modelValue", false);
}

watch(selectedPlayers, (newValue, oldValue)=> {
  console.log("selectedPlayers")
  console.log(`oldValue:`)
  console.log(oldValue)
  console.log(`newValue`)
  console.log(newValue)
})

watch(gameWinner, (newValue, oldValue)=> {
  console.log("gameWinner")
  console.log(`oldValue:`)
  console.log(oldValue)
  console.log(`newValue`)
  console.log(newValue)
})

</script>

<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      max-width="1100px"
      scrollable
      persistent
      data-testid="add-game-dialog"
    >

      <v-card class="dialog">
        <!-- loading -->
        <div v-if="loading || error" class="overlay-container">
          <div class="d-flex flex-column justify-center align-center">
            <LoadingRow v-if="loading" class="ma-0"></LoadingRow>
            <p v-if="error" class="mt-4">Mensaje error</p>
          </div>
        </div>

        <div :class="{ 'hidden-on-loading': loading }" class="content-wrapper">
          <v-card-item class="mb-4" >
            <v-card-title class="dialog-title">
              {{ AddGameDialogText.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ boardgame.name }}
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
                    :hint="AddGameDialogText.hints.selectPlayers"
                    v-model="selectedPlayers"
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
                    :label="AddGameDialogText.labels.notes"
                    no-resize
                    max-rows="3"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
  
          <v-card-actions class="dialog-actions mt-3">
            <v-btn
              type="submit" 
              color="primary"
              variant="elevated"
            >
              <FontAwesomeIcon :icon="faFloppyDisk" />
              <span>{{ AddGameDialogText.buttons.save }}</span>
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              @click="closeDialog"
            >
              {{ AddGameDialogText.buttons.cancel }}
            </v-btn>
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

</style>