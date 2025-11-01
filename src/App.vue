<template>
  <v-app>
    <NavBar v-if="width > 768" />
    <v-main>
      <router-view />
    </v-main>
    <v-footer app v-if="width < 768" height="72">
      <BottomNavigation  />
    </v-footer>
  </v-app>
</template>

<script setup>
import BottomNavigation from "./components/organisms/BottomNavigation.vue";
import NavBar from "@/components/organisms/NavBar.vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

defineOptions({ name: "App" });

</script>

<style scoped>
#app {
  text-align: center;
  background-color: var(--gray-light);
}

.v-main {
  min-height: calc(100dvh - 72px);
}

.v-footer {
  height: 72px !important;
  padding: 0 !important;
  overflow: hidden;
  display: flex;
  align-items: flex;
  justify-content: flex;
}

</style>
