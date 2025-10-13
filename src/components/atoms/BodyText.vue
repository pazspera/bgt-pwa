<template>
  <p class="body-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.body-text {
  font-family: var(--font-text);
  font-size: var(--size3);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-color-default);
}
</style>
