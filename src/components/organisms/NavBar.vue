<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavigationLink from '../atoms/typography/NavigationLink.vue';
import ThemeToggler from '../molecules/ThemeToggler.vue';
import Logo from '../atoms/Logo.vue';

const drawer = ref(false);

defineOptions({ name: 'NavBar' });

</script>

<template>
  <v-app-bar app color="surface" role="navigation" aria-label="Navegación principal">
    <v-container>
      <v-row align="center" justify="space-between" class="px-0 navbar-row">
        <Logo />

        <div class="d-flex align-center">
          <!-- Desktop links: visible >=1025px -->
          <div class="nav-links show-desktop">
            <NavigationLink :to="{ name: 'BoardGames' }">Ludoteca</NavigationLink>
            <NavigationLink :to="{ name: 'Players' }">Jugadores</NavigationLink>
            <NavigationLink :to="{ name: 'Games' }">Partidas</NavigationLink>
            <ThemeToggler icon-size="var(--font-size-lg)"/>
          </div>
  
          <!-- Mobile / Tablet toggle: visible <1025px -->
          <div class="nav-drawer-icons show-mobile">
            <ThemeToggler class="show-mobile" icon-size="var(--font-size-lg)" />
            <v-btn icon class="show-mobile" @click="drawer = true">
              <FontAwesomeIcon :icon="faBars" color="on-surface" />
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Drawer for mobile/tablet -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="nav-drawer">
    <v-list nav class="nav-drawer-list">
      <NavigationLink :to="{ name: 'BoardGames' }" link @click="drawer = false">
        Ludoteca
      </NavigationLink>
      <NavigationLink :to="{ name: 'Players' }" link @click="drawer = false">
        Jugadores
      </NavigationLink>
      <NavigationLink :to="{ name: 'Games' }" link @click="drawer = false">
        Partidas 
      </NavigationLink>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

.navbar-row {
  display: flex;
  justify-content: space-between !important;
}

.nav-drawer-icons {
  flex-direction: row;
}
/*
  Visibility helpers to match requested breakpoints exactly.
  - .show-desktop: visible at >=1025px
  - .show-mobile: visible below 1025px
*/
.show-desktop { display: none; }
.show-mobile { display: flex; }

@media (min-width: 1025px) {
  .show-desktop { 
    display: flex; 
    gap: 1rem; 
    align-items: center;
  }

  .show-mobile { 
    display: none; 
  }
}

.nav-links .navigation-link, 
.nav-drawer-list .navigation-link {
  margin-left: 12px;
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

