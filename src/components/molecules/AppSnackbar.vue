<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useAppSnackbar } from "../../composables/useAppSnackbar";

defineOptions({ name: "AppSnackbar" });

const { isSnackbarVisible, message, color, timeout, hide } = useAppSnackbar();

</script>

<template>
  <!-- 
    The v-if in the component is used to close it once
    the button is clicked. There was an issue where,
    even though snackbarVisible's logic was correct,
    the component wasn't closing 
  -->
  <v-snackbar 
    v-if="isSnackbarVisible"
    v-model="isSnackbarVisible"
    :color="color"
    location="bottom center"
    :timeout="timeout"
  >

    {{ message }}

    <template v-slot:actions>
      <v-btn variant="text" @click="hide()">
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