<script setup lang="ts">
import { faDice, faUsers, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { NavButton } from "../../types/navigation";
import BottomNavButton from "../atoms/buttons/BottomNavButton.vue";
import ThemeToggler from "../molecules/ThemeToggler.vue";

defineOptions({ name: "BottomNavigation" });

const BottomNav: NavButton[] = [
  {
    value: "ludoteca",
    label: "Ludoteca",
    to: { name: 'BoardGames' },
    icon: faDice
  },
  {
    value: "jugadores",
    label: "Jugadores",
    to: { name: 'Players' },
    icon: faUsers
  },
  {
    value: "partidas",
    label: "Partidas",
    to: { name: 'Games' },
    icon: faBoxArchive
  },
]

</script>

<template>
  <v-bottom-navigation tag="div" class="bottom-nav" grow>
    <BottomNavButton v-for="button in BottomNav" v-bind="button" :key="button.value" />
    <ThemeToggler icon-size="var(--font-size-xl)" />
  </v-bottom-navigation>
</template>

<style scoped>

.bottom-nav {
  height: 72px !important;
  max-width: 100%;
  padding: 0 !important;
  z-index: 1;
  position: static !important;
}

.nav-link {
  margin-bottom: var(--font-size-5xl);
}

</style>
