<template>
  <span class="button-label">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({ name: "ButtonLabel" });
</script>

<style scoped>
.button-label {
  font-family: var(--font-text);
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .button-label {
    font-size: var(--font-size-xxs);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .button-label  {
    font-size: var(--font-size-xs);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .button-label  {
    font-size: var(--font-size-sm);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .button-label  {
    font-size: var(--font-size-sm);
  }
}

@media (min-width: 1921px) {
  .button-label  {
    font-size: var(--font-size-sm);
  }
}
</style>
