<script setup lang="ts">
import { ref } from "vue";

const snackbar = ref(true);
const text = "Hola, vengo a flotar"

</script>

<template>
  <v-snackbar>
    {{ text }}

    <template v-slot:actions>
      <v-btn 
        variant="text"
        location="bottom center"
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.v-overlay.v-snackbar {
  --v-layout-bottom: 96px !important;
}

@media(min-width: 768px) {
  .v-overlay.v-snackbar {
    --v-layout-bottom: 24px !important;
  }
}
</style>