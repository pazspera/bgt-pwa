<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useCheckDbHealth } from "../../composables/useCheckDbHealth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const { statusMessage, color, icon, checkHealth, closeSnackbar, hasRun } = useCheckDbHealth();
const snackbarVisible = ref(false);

onMounted(()=> {
  checkHealth();
})

const iconsMap = {
  faCircleCheck: faCircleCheck,
  faCircleExclamation: faCircleExclamation,
}

// Controls the opening and close of snackbar
watch(hasRun, (newVal) => {
  if(newVal) {
    snackbarVisible.value = true;
  }
})

const handleUpdate = (newValue: boolean) => {
    // Si el nuevo valor es false (el snackbar quiere cerrarse)
    if (newValue === false) {
        snackbarVisible.value = false; // Cierra nuestra variable local
        closeSnackbar();              // Notifica al composable
    }
}

</script>

<template>
  <v-snackbar 
    v-model="snackbarVisible"
    @update:model-value="handleUpdate"
    :color="color"
    location="bottom center"
  >
    <FontAwesomeIcon v-if="icon" :icon="iconsMap[icon]" class="mr-3" />
    {{ statusMessage }}

    <template v-slot:actions>
      <v-btn variant="text">
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