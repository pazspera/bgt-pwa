<template>
  <h5 class="card-heading">
    <slot />
  </h5>
</template>

<script setup lang="ts">
defineOptions({ name: "CardHeading" });
</script>

<style scoped>
.card-heading {
  font-family: var(--font-title);
  font-size: var(--font-size-3xl);
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-color-default);
}
</style>
