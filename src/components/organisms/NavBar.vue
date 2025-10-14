<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavigationLink from '../atoms/NavigationLink.vue';
import ThemeToggler from '../molecules/ThemeToggler.vue';

// drawer state controlled via v-model on v-navigation-drawer
const drawer = ref(false);

defineOptions({ name: 'NavBar' });

</script>

<template>
  <v-app-bar app color="surface" flat>
    <v-container>
      <v-row align="center" justify="space-between" class="px-0">
        <div class="d-flex align-center">
          <router-link class="navbar-brand" :to="{ name: 'Home' }">
            <img src="/favicon.ico" class="navbar-icon" />
          </router-link>
        </div>

        <!-- Desktop links: visible >=1025px -->
        <div class="nav-links show-desktop">
          <NavigationLink :to="{ name: 'BoardGames' }">Ludoteca</NavigationLink>
          <NavigationLink :to="{ name: 'Players' }">Jugadores</NavigationLink>
          <NavigationLink :to="{ name: 'Games' }">Partidas</NavigationLink>
          <ThemeToggler/>
        </div>

        <!-- Mobile / Tablet toggle: visible <1025px -->
        <div class="nav-drawer-icons show-mobile">
          <ThemeToggler class="show-mobile" />
          <v-btn icon class="show-mobile" @click="drawer = true">
            <FontAwesomeIcon :icon="faBars" color="on-surface" />
          </v-btn>
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
/* preserve previous icon sizing */
.navbar-icon {
  width: 42px;
  height: 42px;
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

/* small adjustments to remove extra toolbar content spacing */
/* Note: v-main spacing should be handled by Vuetify when v-app-bar uses `app` prop. */

.nav-links .navigation-link, 
.nav-drawer-list .navigation-link {
  margin-left: 12px;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
}
/* Estilo para el hover de los enlaces (opcional, pero mejora UX) */
.nav-links .navigation-link:hover, 
.nav-drawer-list .navigation-link:hover {
  color: rgb(var(--v-theme-primary));
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

