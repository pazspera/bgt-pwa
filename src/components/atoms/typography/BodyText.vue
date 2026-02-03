<template>
  <p class="body-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineOptions({ name: "BodyText" });
</script>

<style scoped>
.body-text {
  font-family: var(--font-text);
  font-weight: 400;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .body-text {
    font-size: var(--font-size-sm);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .body-text  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .body-text  {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .body-text  {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 1921px) {
  .body-text  {
    font-size: var(--font-size-xl);
  }
}
</style>
