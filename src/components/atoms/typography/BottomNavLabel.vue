<!-- src/components/atoms/BottomNavLabel.vue -->
<template>
  <span class="bottom-nav-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.bottom-nav-label {
  font-family: var(--font-title);
  font-size: var(--font-size-xxs); /* clamp(0.7rem, 0.8vw, 12px) */
  font-weight: 500;
  line-height: 1;
  color: var(--text-color-default);
  text-align: center;
  display: block;
}
</style>
