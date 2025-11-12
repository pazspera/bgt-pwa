<template>
  <p class="detail-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineOptions({ name: "DetailText" });
</script>

<style scoped>
.detail-text {
  font-family: var(--font-text);
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-color-default);
}
</style>
