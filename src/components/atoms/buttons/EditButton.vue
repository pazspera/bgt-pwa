<script setup lang="ts">
import AppButton from './AppButton.vue';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

</script>

<template>
  <AppButton
    color="primary"
    variant="flat"
    class="action-btn button-edit"
    label="Editar"
    :icon="faPenToSquare"
  />
</template>