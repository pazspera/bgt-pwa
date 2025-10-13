<template>
  <p class="support-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.support-text {
  font-family: var(--font-text);
  font-size: var(--font-size-lg);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-color-default);
}
</style>
