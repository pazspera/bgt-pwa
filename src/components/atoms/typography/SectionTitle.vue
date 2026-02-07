<template>
  <h2 class="section-title">
    <slot />
  </h2>
</template>

<script setup lang="ts">
defineOptions({ name: "SectionTitle" });
</script>

<style scoped>
.section-title {
  font-family: var(--font-title);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .section-title {
    font-size: var(--font-size-4xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .section-title {
    font-size: var(--font-size-5xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .section-title {
    font-size: var(--font-size-6xl);
  }
}

@media (min-width: 1921px) {
  .section-title {
    font-size: var(--font-size-7xl);
  }
}
</style>
