<script setup lang="ts">
import AppButton from './AppButton.vue';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BUTTONS_TEXT } from '@/constants/buttonsText';

const props = withDefaults(defineProps<{
  label?: string,
}>(), {
  label: BUTTONS_TEXT.DELETE,
})

</script>

<template>
  <AppButton
    color="error"
    variant="text"
    :label="label"
    :icon="faTrash"
    class="action-btn button-delete"
  />
</template>
