<script setup lang="ts">
const props = defineProps<{ to: any }>();

defineOptions({ name: "NavigationLink" });

</script>

<template>
  <RouterLink :to="to" class="navigation-link">
    <slot />
  </RouterLink>
</template>

<style scoped>
.navigation-link {
  font-family: var(--font-text);
  font-weight: 500;
  text-decoration: none;
}

@media (max-width: 600px) {
  .navigation-link {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .navigation-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .navigation-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .navigation-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1921px) {
  .navigation-link  {
    font-size: var(--font-size-lg);
  }
}
</style>
