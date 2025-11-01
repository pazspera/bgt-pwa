<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCheckDbHealth } from "../../composables/useCheckDbHealth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const { statusMessage, color, icon, checkHealth, isVisible, closeSnackbar } = useCheckDbHealth();

onMounted(()=> {
  checkHealth();
})

const iconsMap = {
  faCircleCheck: faCircleCheck,
  faCircleExclamation: faCircleExclamation,
}

</script>

<template>
  <v-snackbar 
    v-model="isVisible"
    :color="color"
    location="bottom center"
  >
    <FontAwesomeIcon v-if="icon" :icon="iconsMap[icon]" class="mr-3" />
    {{ statusMessage }}

    <template v-slot:actions>
      <v-btn 
        variant="text"
        @click="closeSnackbar()"
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