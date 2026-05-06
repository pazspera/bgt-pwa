<!-- src/components/atoms/CardInfo.vue -->
<template>
  <span class="card-info">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: "CardInfo" });
</script>

<style scoped>
.card-info {
  font-family: var(--font-text);
  font-size: var(--font-size-xxs);
  font-weight: 500;
  line-height: 1;
}

@media(min-width: 961px) {
  .card-info {
    font-size: var(--font-size-xs);
  }
}

</style>
