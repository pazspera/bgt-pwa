<!-- src/components/atoms/BottomNavLabel.vue -->
<template>
  <span class="bottom-nav-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: "BottomNavLabel" });
</script>

<style scoped>
.bottom-nav-label {
  font-family: var(--font-text);
  font-size: var(--font-size-xxs); 
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  display: block;
}

@media(max-width: 350px) {
  .bottom-nav-label {
    font-size: var(--font-size-2xs);
  }
}
</style>
