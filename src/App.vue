<template>
  <v-app>
    <!-- <NavBar /> -->
    <!-- <ToolBar /> -->
    <NavBar2 />
    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation />
  </v-app>
</template>

<script setup>
import BottomNavigation from "./components/BottomNavigation.vue";
/* import ToolBar from "./components/ToolBar.vue"; */
/* import NavBar from "@/components/NavBar.vue"; */
import NavBar2 from "@/components/NavBar2.vue";

defineOptions({ name: "App" });
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  text-align: center;
  background-color: $gray-light;
}
</style>
