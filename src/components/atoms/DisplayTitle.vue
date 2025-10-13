<template>
  <h1 class="display-title">
    <slot />
  </h1>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.display-title {
  font-family: var(--font-title);
  font-size: var(--size13);
  font-weight: 600;
  line-height: 1.05;
  color: var(--text-color-default);
}
</style>
