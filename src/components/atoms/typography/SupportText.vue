<template>
  <p class="support-text">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineOptions({ name: "SupportText" });
</script>

<style scoped>
.support-text {
  font-family: var(--font-text);
  font-weight: 300;
  line-height: 1.4;
}

@media (max-width: 600px) {
  .support-text {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .support-text  {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .support-text  {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .support-text  {
    font-size: var(--font-size-xl);
  }
}

@media (min-width: 1921px) {
  .support-text  {
    font-size: var(--font-size-2xl);
  }
}
</style>
