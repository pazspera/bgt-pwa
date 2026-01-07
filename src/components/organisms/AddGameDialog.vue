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
        <v-card-title class="dialog-title">Nueva partida de JUEGO</v-card-title> 

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
                  multiple
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
.dialog{
  padding: 12px;
}

.dialog-title {
  padding: 16px 24px 0 24px;
}

/* Fix para estilos del select */
:deep(.v-field__input input) {
  all: unset !important; /* Ignora CUALQUIER estilo de 'input' de tu style.css */
  width: 100% !important;
  color: inherit !important;
  font-family: inherit !important;
}

:deep(.v-field__field) {
  display: flex !important;
  align-items: center !important;
  min-height: 56px !important;
}

:deep(.v-field__overlay) {
  background-color: transparent !important;
}

:global(.v-list-item--active) {
  background-color: #EDE2F3 !important; /* Primary 100 manual para asegurar */
  color: #2D153D !important;           /* Primary 900 (Texto oscuro) */
}

/* 2. El texto de la opción (a veces el color no baja al span interno) */
:global(.v-list-item--active .v-list-item-title) {
  color: #2D153D !important;
}

/* 3. Los íconos dentro de la lista (el checkmark) */
:global(.v-list-item--active .v-list-item__prepend .v-icon) {
  color: #633183 !important; /* Primary 600 */
}

/* 4. Fix para los chips que quedan dentro del select */
:deep(.v-chip--variant-tonal .v-chip__content) {
  color: #2D153D !important; /* Texto oscuro en el chip */
}
:deep(.v-chip--variant-tonal .v-chip__underlay) {
  background-color: #BD9CD3 !important; /* Fondo lila claro para el chip */
  opacity: 1 !important;
}
</style>