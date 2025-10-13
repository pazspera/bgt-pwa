<template>
  <v-container class="mt-4">
    <h1>Agregar jugador</h1>
    <form @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="Nombre" />
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Guardar</v-btn>
    </form>
  </v-container>
</template>

<script setup>
import { usePlayerStore } from "@/stores/PlayerStore";
import { ref } from "vue";

defineOptions({ name: "AddPlayerView" });

const store = usePlayerStore();
const name = ref("");

function submit() {
  store.add({ name: name.value });
  name.value = "";
}
</script>

<style scoped></style>
