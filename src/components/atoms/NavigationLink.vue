<template>
  <RouterLink :to="to" class="navigation-link">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ to: any }>();
</script>

<style scoped>
.navigation-link {
  font-family: var(--font-text);
  font-size: var(--size3);
  font-weight: 500;
  color: var(--text-color-default);
  text-decoration: none;
}
</style>
