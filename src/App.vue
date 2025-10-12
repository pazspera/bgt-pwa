<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<script setup>
import BottomNavigation from "./components/organisms/BottomNavigation.vue";
import NavBar from "@/components/organisms/NavBar.vue";

defineOptions({ name: "App" });
</script>

<style lang="scss">
#app {
  text-align: center;
  background-color: var(--gray-light);
}
</style>
