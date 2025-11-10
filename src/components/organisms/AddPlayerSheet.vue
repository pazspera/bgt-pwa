<script lang="ts" setup>
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import { ref, defineEmits } from "vue";
import { VExpandTransition } from 'vuetify/components';

defineProps<{
  modelValue: boolean,
  errorMessage?: string
}>()

const emit = defineEmits(['update:modelValue']);

const submit = () => {
  console.log(`the form was submitted with name ${name}`);
}

const name = ref("");

</script>

<template>
  <v-bottom-sheet
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    data-testid="bottom-sheet"
  >
    <v-sheet color="surface">
      <v-container class="container">
        <SubsectionTitle class="title">Agregar jugador</SubsectionTitle>
        <form @submit.prevent="submit">
          <v-text-field v-model="name" label="Nombre" data-testid="input-player-name"></v-text-field>
          <div class="sheet-buttons">
            <v-btn type="submit" color="primary" data-testid="btn-add-player">Agregar</v-btn>
            <v-btn variant="text" data-testid="btn-cancel">Cancelar</v-btn>
          </div>
        </form>

        <v-expand-transition>
          <div v-if="errorMessage">
            <v-alert
                color="error"
                :text="errorMessage"
                data-testid="error-message"
              >
            </v-alert>
          </div>
        </v-expand-transition>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<style scoped>
.title {
  margin-top: 0 !important;
  margin-bottom: 16px !important;
}

.container {
  padding: 48px 0;
}

.sheet-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px; 
}
</style>