<script lang="ts" setup>
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import { ref, defineEmits } from "vue";

defineProps<{
  modelValue: boolean
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
          <v-btn type="submit" color="primary" data-testid="btn-add-player">Agregar</v-btn>
          <v-btn variant="text" data-testid="btn-cancel">Cancelar</v-btn>
        </form>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<style scoped>
.title {
  margin-top: 0 !important;
}

.container {
  padding: 48px 0;
}
</style>