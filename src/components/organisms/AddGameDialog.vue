<script setup lang="ts">

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
        <v-card-title>Nueva partida de JUEGO</v-card-title> 

        <v-divider></v-divider>
        
        <v-card-text>
          <v-form>
            <v-row dense>
              <v-col
                cols="12"
              >
                Agregar v-date-input
              </v-col>
              <v-col
                cols="12"  
              >
                <v-select
                  chips
                  label="Jugadores"
                  :items="['Zeuchi', 'Mareita', 'Zeuchi again',]"
                  variant="outlined"
                  density="comfortable"
                  class="all-unset"
                  append-inner-icon="fas fa-chevron-down"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>
        
        <v-card-actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            variant="plain"
            @click="closeDialog"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped>
  .dialog {
    padding: 16px;
  }

  .all-unset :deep(*) {
    all: revert; /* O 'revert-layer' si usas cascada moderna */
    box-sizing: border-box;
  }


:deep(.v-field) {
  --v-field-padding-bottom: 8px;
  --v-field-padding-top: 8px;
  min-height: 56px !important; /* Altura estándar de un select outlined */
  display: flex !important;
}

:deep(.v-select__selection) {
  display: flex;
  align-items: center;
}
</style>