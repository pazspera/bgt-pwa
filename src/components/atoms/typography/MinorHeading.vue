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
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .minor-heading {
    font-size: var(--font-size-sm);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .minor-heading  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .minor-heading  {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .minor-heading  {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 1921px) {
  .minor-heading  {
    font-size: var(--font-size-xl);
  }
}
</style>
