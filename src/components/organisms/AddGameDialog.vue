<script setup lang="ts">
import { AddGameDialogText } from '../../constants/ui_text/AddGameDialog';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";


defineProps<{
  modelValue: boolean
}>();
defineOptions({ name: "AddGameDialog" });

const emit = defineEmits(["update:modelValue"]);

const closeDialog = () => {
  emit("update:modelValue", false);
}

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
        <v-card-title class="dialog-title mb-4">
          {{ AddGameDialogText.title }}
        </v-card-title> 
        
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
                  :items="['Zeuchi', 'Mareita', 'Zeuchi again',]"
                  variant="outlined"
                  density="comfortable"
                  multiple
                  persistent-hint
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
                  :label="AddGameDialogText.labels.selectWinner"
                  :items="['Zeuchi', 'Mareita']"
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
      </v-card>
    </v-dialog>
</template>

<style scoped>
.dialog{
  padding: 12px;
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


</style>