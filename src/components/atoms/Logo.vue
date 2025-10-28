<script setup lang="ts">
</script>

<template>
  <div class="d-flex align-center">
    <router-link class="navbar-brand" :to="{ name: 'BoardGames' }">
      <img src="/favicon.ico" class="navbar-icon" />
    </router-link>
  </div>
</template>

<style scoped>
.navbar-icon {
  width: 42px;
  height: 42px;
}
</style>