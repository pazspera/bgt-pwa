<script setup lang="ts">
import { AddGameDialogText } from '../../constants/ui_text/AddGameDialog';

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
      max-width="800px"
      scrollable
      data-testid="add-game-dialog"
    >
      <v-card class="dialog">
        <v-card-title class="dialog-title">
          {{ AddGameDialogText.title }}
        </v-card-title> 
        
        <v-card-text>
          <v-form>
            <v-row>
              <v-col
                cols="12"
                class="mb-3"
              >
                Agregar v-date-input
              </v-col>
              <v-col
                cols="12"  
              >
                <v-select
                  chips
                  :label="AddGameDialogText.labels.selectPlayers"
                  :items="['Zeuchi', 'Mareita', 'Zeuchi again',]"
                  variant="outlined"
                  density="comfortable"
                  class="all-unset"
                  multiple
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="dialog-actions">
          <v-btn
            type="submit" 
            color="primary"
            variant="elevated"
          >
            {{ AddGameDialogText.buttons.save }}
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