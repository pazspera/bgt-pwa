<script setup lang="ts">
import BottomNavigation from "@/components/organisms/BottomNavigation.vue";
import NavBar from "@/components/organisms/NavBar.vue";
import { useWindowSize } from "@vueuse/core";
import AppSnackbar from "@/components/molecules/AppSnackbar.vue";
import { onMounted, watch } from "vue";
import { useServerTime } from "@/composables/useServerTime";
import { useCheckDbHealth } from "@/composables/useCheckDbHealth";
import { useAppSnackbar } from "@/composables/useAppSnackbar";
import { useCurrentUser } from "@/composables/useCurrentUser";

defineOptions({ name: "App" });

const { width } = useWindowSize();
const { waitForUser, loading: userLoading } = useCurrentUser();

const { getSyncedDate, timeOffset } = useServerTime();
const { checkHealth, statusMessage } = useCheckDbHealth();
const { isSnackbarVisible, message, color, timeout, hide, success, error } = useAppSnackbar();

onMounted(async ()=> {
  await waitForUser();

  const healthOk = await checkHealth();
  if(healthOk) {
    success(statusMessage.value);
    getSyncedDate();
    console.log(timeOffset.value);
  } else {
    error(statusMessage.value);
  }
})

watch(timeOffset, (newVal)=> {
  console.log(`Cambio en timeOffset: ${newVal}`)
})

</script>

<template>
  <v-app>
    <NavBar v-if="width > 768 && !userLoading" />
    <v-main>
      <v-container class="container-padding">
        <router-view />
        <AppSnackbar 
          :visible="isSnackbarVisible"
          :message="message"
          :color="color"
          :timeout="timeout"
          @close="hide()"
        />
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
