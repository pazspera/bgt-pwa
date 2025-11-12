<template>
  <h1 class="display-title">
    <slot />
  </h1>
</template>

<script setup lang="ts">
defineOptions({ name: "DisplayTitle" });
</script>

<style scoped>
.display-title {
  font-family: var(--font-title);
  font-size: var(--font-size-7xl);
  font-weight: 600;
  line-height: 1.05;
  color: var(--text-color-default);
}
</style>
