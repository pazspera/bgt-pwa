<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{ to: any }>();
</script>

<template>
  <RouterLink :to="to" class="navigation-link">
    <slot />
  </RouterLink>
</template>

<style scoped>
.navigation-link {
  font-family: var(--font-text);
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--white);
  text-decoration: none;
}
</style>
