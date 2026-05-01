<script setup lang="ts">
import { faDice, faUsers, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { NavButton } from "../../types/navigation";
import BottomNavButton from '@/components/atoms/buttons/BottomNavButton.vue';
import ThemeToggler from '@/components/molecules/ThemeToggler.vue';
import { NAVIGATION_TEXT } from "@/constants/navigationText";

defineOptions({ name: "BottomNavigation" });

const BottomNav: NavButton[] = [
  {
    value: "ludoteca",
    label: NAVIGATION_TEXT.BOARDGAMES,
    to: { name: 'BoardGames' },
    icon: faDice
  },
  {
    value: "jugadores",
    label: NAVIGATION_TEXT.PLAYERS,
    to: { name: 'Players' },
    icon: faUsers
  },
  {
    value: "partidas",
    label: NAVIGATION_TEXT.GAMES,
    to: { name: 'Games' },
    icon: faBoxArchive
  },
]

</script>

<template>
  <v-bottom-navigation tag="div" class="bottom-nav" grow role="navigation" aria-label="Navegación móvil">
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
