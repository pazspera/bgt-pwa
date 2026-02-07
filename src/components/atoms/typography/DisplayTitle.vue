<template>
  <h1 class="display-title">
    <slot />
  </h1>
</template>

<script setup lang="ts">
defineOptions({ name: "DisplayTitle" });
</script>

<style scoped>
.display-title {
  font-family: var(--font-title);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5em;
}

@media (max-width: 600px) {
  .display-title {
    font-size: var(--font-size-4xl);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .display-title {
    font-size: var(--font-size-5xl);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .display-title {
    font-size: var(--font-size-7xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .display-title {
    font-size: var(--font-size-8xl);
  }
}

@media (min-width: 1921px) {
  .display-title {
    font-size: var(--font-size-9xl);
  }
}
</style>
