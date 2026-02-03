<template>
  <span class="detail-text">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: "DetailText" });
</script>

<style scoped>
.detail-text {
  font-family: var(--font-text);
  font-weight: 400;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .detail-text {
    font-size: var(--font-size-xs);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .detail-text  {
    font-size: var(--font-size-xs);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .detail-text  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .detail-text  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1921px) {
  .detail-text  {
    font-size: var(--font-size-lg);
  }
}
</style>
