<template>
  <span class="button-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.button-label {
  font-family: var(--font-title);
  font-size: var(--font-size-md);
  font-weight: 700;
  line-height: 1;
  color: var(--text-color-default);
  text-transform: uppercase;
}
</style>
