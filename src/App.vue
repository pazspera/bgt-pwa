<script setup lang="ts">
import BottomNavigation from "./components/organisms/BottomNavigation.vue";
import NavBar from "./components/organisms/NavBar.vue";
import { useWindowSize } from "@vueuse/core";
import AppSnackbar from "./components/molecules/AppSnackbar.vue";
import { onMounted, ref, type Ref, watch } from "vue";
import { useServerTime } from "./composables/useServerTime";
import { useCheckDbHealth } from "./composables/useCheckDbHealth";

defineOptions({ name: "App" });

const { width } = useWindowSize();
const isSnackBarVisible: Ref<boolean> = ref(true);

const { getSyncedDate, timeOffset } = useServerTime();
const { statusMessage, color, icon, checkHealth, hasRun } = useCheckDbHealth();

onMounted(()=> {
  checkHealth();
  getSyncedDate();
  console.log(timeOffset.value);
})

watch(timeOffset, (newVal)=> {
  console.log(`Cambio en timeOffset: ${newVal}`)
})

</script>

<template>
  <v-app>
    <NavBar v-if="width > 768" />
    <v-main>
      <v-container class="container-padding">
        <router-view />
        <AppSnackbar v-model="isSnackBarVisible" />
      </v-container>
    </v-main>
    <v-footer app v-if="width <= 768" height="72">
      <BottomNavigation  />
    </v-footer>
  </v-app>
</template>

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
