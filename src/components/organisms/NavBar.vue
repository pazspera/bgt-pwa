<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoints } from '@vueuse/core';
import NavigationLink from '@/components/atoms/typography/NavigationLink.vue';
import ThemeToggler from '@/components/molecules/ThemeToggler.vue';
import Logo from '@/components/atoms/Logo.vue';
import { NAVIGATION_TEXT } from '@/constants/navigationText';

const drawer = ref(false);
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1024
})
const isDesktop = breakpoints.greaterOrEqual("desktop");

defineOptions({ name: 'NavBar' });
defineExpose({ drawer });

</script>

<template>
  <v-app-bar app color="surface" role="navigation" aria-label="Navegación principal" data-testid="app-bar">
    <v-container class="container-padding">
      <v-row align="center" justify="space-between" class=" navbar-row">
        <div class="d-flex align-center logo-container">
          <Logo />
        </div>

        <div class="d-flex align-center">
          <!-- Desktop links: visible >=1024px -->
          <div v-if="isDesktop" class="nav-links" data-testid="desktop-nav-links">
            <NavigationLink :to="{ name: 'BoardGames' }">
              {{ NAVIGATION_TEXT.BOARDGAMES }}
            </NavigationLink>
            <NavigationLink :to="{ name: 'Players' }">
              {{ NAVIGATION_TEXT.PLAYERS }}
            </NavigationLink>
            <NavigationLink :to="{ name: 'Games' }">
              {{ NAVIGATION_TEXT.GAMES }}
            </NavigationLink>
            <ThemeToggler class="theme-toggler-desktop" icon-size="var(--font-size-lg)"/>
          </div>

          <!-- Mobile / Tablet toggle: visible <1025px -->
          <div v-if="!isDesktop" class="nav-drawer-icons" data-testid="nav-drawer-icons">
            <ThemeToggler class="show-mobile" icon-size="var(--font-size-lg)" />
            <v-btn icon class="show-mobile" @click="drawer = !drawer" data-testid="mobile-toggler">
              <FontAwesomeIcon :icon="faBars" color="on-surface" />
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Drawer for mobile/tablet -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="nav-drawer" data-testid="navigation-drawer">
    <v-list nav class="nav-drawer-list">
      <NavigationLink :to="{ name: 'BoardGames' }" link @click="drawer = false">
        {{ NAVIGATION_TEXT.BOARDGAMES }}
      </NavigationLink>
      <NavigationLink :to="{ name: 'Players' }" link @click="drawer = false">
        {{ NAVIGATION_TEXT.PLAYERS }}
      </NavigationLink>
      <NavigationLink :to="{ name: 'Games' }" link @click="drawer = false">
        {{ NAVIGATION_TEXT.GAMES }}
      </NavigationLink>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

.navbar-row {
  display: flex;
  justify-content: space-between !important;
  margin: 0;
}

.nav-drawer-icons {
  display: flex;
  flex-direction: row;
}

.logo-container {
  width: 42px;
  height: 42px;
}

.nav-links .navigation-link, 
.nav-drawer-list .navigation-link {
  margin-left: 20px;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  transition: all 0.15s ease-in-out;
}


.nav-links .navigation-link:hover, 
.nav-drawer-list .navigation-link:hover {
  color: rgb(var(--v-theme-primary));
}

.nav-links .router-link-active,
.nav-drawer-list .router-link-active {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  position: relative; 
  display: inline-block;
}

.nav-links .router-link-active::after,
.nav-drawer-list .router-link-active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgb(var(--v-theme-primary));
  transition: all 0.1s ease-in-out;
  transform-origin: center;
}

.nav-links .router-link-active:hover::after,
.nav-drawer-list .router-link-active:hover::after {
  bottom: -4px;
  transition: all 0.1s ease-in-out;
}
/* ensure drawer overlays above app-bar content when opened */
.nav-drawer {
  z-index: 2000;
  background-color: rgb(var(--v-theme-surface));
}

.nav-drawer-list {
  display: flex;
  flex-direction: column;
  gap: var(--font-size-md);
  padding: var(--font-size-sm); 
}
</style>

