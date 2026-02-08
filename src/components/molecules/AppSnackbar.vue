<script setup lang="ts">

defineOptions({ name: "AppSnackbar" });

const props = defineProps({
  visible: Boolean,
  message: String,
  color: String,
  timeout: Number,
});

const emit = defineEmits(['close']);
</script>

<template>
  <!-- 
    The v-if in the component is used to close it once
    the button is clicked. There was an issue where,
    even though snackbarVisible's logic was correct,
    the component wasn't closing 
  -->
  <v-snackbar 
    v-if="visible"
    :model-value="visible"
    :color="color"
    location="bottom center"
    :timeout="timeout"
    @update:model-value="emit('close')"
  >

    {{ message }}

    <template v-slot:actions>
      <v-btn 
        variant="text"
        data-testid="appsnackbar-button" 
        @click="emit('close')"
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

.snackbar .v-snackbar__wrapper .v-snackbar__content {
  display: flex !important;
  align-items: center !important;
}

@media(min-width: 768px) {
  .v-overlay.v-snackbar {
    --v-layout-bottom: 24px !important;
  }
}
</style>