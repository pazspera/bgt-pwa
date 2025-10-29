<script setup lang="ts">
</script>

<template>
  <router-link :to="{ name: 'BoardGames' }">
    <img src="/favicon.ico" class="navbar-icon" />
  </router-link>
</template>

<style scoped>
.navbar-icon {
  width: 36px;
  height: 36px;
  /* needed to align the logo in the navbar */
  margin-top: 6px;
}
</style>