<template>
  <h6 class="minor-heading">
    <slot />
  </h6>
</template>

<script setup lang="ts">
defineOptions({ name: "MinorHeading" });
</script>

<style scoped>
.minor-heading {
  font-family: var(--font-title);
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-color-default);
}
</style>
