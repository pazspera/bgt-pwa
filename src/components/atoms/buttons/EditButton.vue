<script setup lang="ts">
import AppButton from './AppButton.vue';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BUTTONS_TEXT } from '@/constants/buttonsText';

const props = withDefaults(defineProps<{
  label?: string,
}>(), {
  label: BUTTONS_TEXT.EDIT,
})
</script>

<template>
  <AppButton
    color="primary"
    variant="flat"
    class="action-btn button-edit"
    :label="label"
    :icon="faPenToSquare"
  />
</template>