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
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .block-heading {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .block-heading  {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .block-heading  {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .block-heading  {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 1921px) {
  .block-heading  {
    font-size: var(--font-size-3xl);
  }
}
</style>
