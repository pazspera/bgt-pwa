<script setup lang="ts">
import version from "./../../../VERSION?raw";
import BottomNavLabel from "@/components/atoms/typography/BottomNavLabel.vue";
defineOptions({ name: "Logo" });

</script>

<template>
  <div class="logo">
    <router-link :to="{ name: 'BoardGames' }" data-testid="app-logo">
      <img src="/favicon.ico" class="navbar-icon" />
    </router-link>
    <v-chip size="x-small" class="mb-1" color="primary" variant="tonal">
      <BottomNavLabel>v{{ version }}</BottomNavLabel>
    </v-chip>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 6px;
  font-weight: 700;
  font-size: var(--font-size-xs);
}

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