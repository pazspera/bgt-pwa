<script setup lang="ts">
import version from "./../../../VERSION?raw";
defineOptions({ name: "Logo" });
</script>

<template>
  <router-link :to="{ name: 'BoardGames' }" data-testid="app-logo">
    <img src="/favicon.ico" class="navbar-icon" />
  </router-link>
  <span>{{ version }}</span>
</template>

<style scoped>
.navbar-icon {
  width: 36px;
  height: 36px;
  /* needed to align the logo in the navbar */
  margin-top: 6px;
  transition: transform 0.2s ease-in-out;
}

.navbar-icon:hover {
  rotate: 15deg;
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>