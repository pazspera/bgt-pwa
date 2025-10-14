<template>
  <p class="lead-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.lead-text {
  font-family: var(--font-text);
  font-size: var(--font-size-xl);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-color-default);
}
</style>
