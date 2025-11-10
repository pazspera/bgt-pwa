<script lang="ts" setup>
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import { ref } from "vue";

const submit = () => {
  console.log(`the form was submitted with name ${name}`);
}

const name = ref("");

</script>

<template>
  <v-bottom-sheet>
    <v-container>
      <SubsectionTitle>Agregar jugador</SubsectionTitle>
      <form @submit.prevent="submit">
        <v-text-field v-model="name" label="Nombre"></v-text-field>
        <v-btn type="submit" color="primary">Agregar</v-btn>
        <v-btn variant="text">Cancelar</v-btn>
      </form>
    </v-container>
  </v-bottom-sheet>
</template>
