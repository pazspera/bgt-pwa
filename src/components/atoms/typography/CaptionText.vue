<template>
  <span class="caption-text">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: "CaptionText" });
</script>

<style scoped>
.caption-text {
  font-family: var(--font-text);
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .caption-text {
    font-size: var(--font-size-xs);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .caption-text  {
    font-size: var(--font-size-xs);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .caption-text  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .caption-text  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1921px) {
  .caption-text  {
    font-size: var(--font-size-lg);
  }
}
</style>
