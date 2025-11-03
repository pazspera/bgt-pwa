<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useCheckDbHealth } from "../../composables/useCheckDbHealth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const { statusMessage, color, icon, checkHealth, hasRun } = useCheckDbHealth();
const snackbarVisible = ref(false);

// exposed to check on test if watch changes
// it doesn't render the component without the watch changing 
defineExpose({ snackbarVisible });

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

const handleClose = () => {
  snackbarVisible.value = false;
}

</script>

<template>
  <!-- 
    The v-if in the component is used to close it once
    the button is clicked. There was an issue where,
    even though snackbarVisible's logic was correct,
    the component wasn't closing 
  -->
  <v-snackbar 
    v-if="snackbarVisible"
    v-model="snackbarVisible"
    :color="color"
    location="bottom center"
    :timeout="-1"
  >
    <FontAwesomeIcon v-if="icon" :icon="iconsMap[icon]" class="mr-3" />
    {{ statusMessage }}

    <template v-slot:actions>
      <v-btn variant="text" @click="handleClose()">
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