<template>
  <a :href="href" class="external-link" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: "ExternalLink" });

const props = defineProps<{ href: string; target?: string }>();

const target = computed(() => props.target ?? '_blank');
const rel = computed(() => (target.value === '_blank' ? 'noopener noreferrer' : 'noopener'));
</script>

<style scoped>
.external-link {
  font-family: var(--font-text);
  font-weight: 500;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .external-link {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .external-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 961px) and (max-width: 1280px) { 
  .external-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  .external-link  {
    font-size: var(--font-size-md);
  }
}

@media (min-width: 1921px) {
  .external-link  {
    font-size: var(--font-size-lg);
  }
}
</style>
