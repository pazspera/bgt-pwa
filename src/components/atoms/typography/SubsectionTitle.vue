<template>
  <h3 class="subsection-title">
    <slot />
  </h3>
</template>

<script setup lang="ts">
// No logic required
</script>

<style scoped>
.subsection-title {
  font-family: var(--font-title);
  font-size: var(--font-size-5xl);
  font-weight: 600;
  line-height: 1.2;
}
</style>
