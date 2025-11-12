<template>
  <h2 class="section-title">
    <slot />
  </h2>
</template>

<script setup lang="ts">
defineOptions({ name: "SectionTitle" });
</script>

<style scoped>
.section-title {
  font-family: var(--font-title);
  font-size: var(--font-size-6xl);
  font-weight: 600;
  line-height: 1.15;
  color: var(--text-color-default);
}
</style>
