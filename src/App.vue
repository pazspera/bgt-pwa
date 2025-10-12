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

<script>
import BottomNavigation from "./components/BottomNavigation.vue";
/* import ToolBar from "./components/ToolBar.vue"; */
/* import NavBar from "@/components/NavBar.vue"; */
import NavBar2 from "@/components/NavBar2.vue";

export default {
  name: "App",
  components: {
    /* NavBar, */
    BottomNavigation,
    /* ToolBar, */
    NavBar2,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
#app {
  text-align: center;
  background-color: $gray-light;
}
</style>
