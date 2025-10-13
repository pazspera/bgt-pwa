<template>
  <p class="detail-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.detail-text {
  font-family: var(--font-text);
  font-size: var(--size2);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-color-default);
}
</style>
