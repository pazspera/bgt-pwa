<template>
  <span class="caption-text">
    <slot />
  </span>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.caption-text {
  font-family: var(--font-text);
  font-size: var(--size1);
  font-weight: 400;
  line-height: 1.2;
  color: var(--text-color-default);
}
</style>
