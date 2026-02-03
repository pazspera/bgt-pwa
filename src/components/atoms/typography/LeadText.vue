<template>
  <p class="lead-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineOptions({ name: "LeadText" });
</script>

<style scoped>
.lead-text {
  font-family: var(--font-text);
  font-weight: 400;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .lead-text {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .lead-text  {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .lead-text  {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .lead-text  {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 1921px) {
  .lead-text  {
    font-size: var(--font-size-3xl);
  }
}
</style>
