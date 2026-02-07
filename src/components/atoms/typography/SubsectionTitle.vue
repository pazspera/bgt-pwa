<template>
  <h3 class="subsection-title">
    <slot />
  </h3>
</template>

<script setup lang="ts">
defineOptions({ name: "SubsectionTitle" });
</script>

<style scoped>
.subsection-title {
  font-family: var(--font-title);
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .subsection-title {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .subsection-title  {
    font-size: var(--font-size-2xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .subsection-title  {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .subsection-title  {
    font-size: var(--font-size-4xl);
  }
}

@media (min-width: 1921px) {
  .subsection-title  {
    font-size: var(--font-size-5xl);
  }
}
</style>
