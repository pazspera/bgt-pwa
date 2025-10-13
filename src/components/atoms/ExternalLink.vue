<template>
  <a :href="href" class="external-link" :target="target" :rel="rel">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{ href: string; target?: string }>();

const target = computed(() => props.target ?? '_blank');
const rel = computed(() => (target.value === '_blank' ? 'noopener noreferrer' : 'noopener'));
</script>

<style scoped>
.external-link {
  font-family: var(--font-text);
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-color-default);
  text-decoration: underline;
}
</style>
