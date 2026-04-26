<script setup lang="ts">
import AppButton from './AppButton.vue';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <AppButton
    color="error"
    variant="text"
    label="Borrar"
    :icon="faTrash"
    class="action-btn button-delete"
  />
</template>
