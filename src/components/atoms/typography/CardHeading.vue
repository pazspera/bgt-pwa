<template>
  <h5 class="card-heading">
    <slot />
  </h5>
</template>

<script setup lang="ts">
defineOptions({ name: "CardHeading" });
</script>

<style scoped>
h5.card-heading {
  font-family: var(--font-title);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  h5.card-heading {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  h5.card-heading  {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  h5.card-heading  {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  h5.card-heading  {
    font-size: var(--font-size-2xl); 
  }
}

@media (min-width: 1921px) {
  h5.card-heading  {
    font-size: var(--font-size-2xl);
  }
}
</style>
