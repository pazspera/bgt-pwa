<template>
  <h4 class="block-heading">
    <slot />
  </h4>
</template>

<script setup lang="ts">
defineOptions({ name: "BlockHeading" });
</script>

<style scoped>
.block-heading {
  font-family: var(--font-title);
  font-size: var(--font-size-4xl);
  font-weight: 600;
  line-height: 1.25;
  color: var(--text-color-default);
}
</style>
