<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavigationLink from '../atoms/NavigationLink.vue';

// drawer state controlled via v-model on v-navigation-drawer
const drawer = ref(false);

defineOptions({ name: 'NavBar' });
</script>

<template>
  <v-app-bar app color="neutral-800" dark flat>
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
        </div>

        <!-- Mobile / Tablet toggle: visible <1025px -->
        <v-btn icon class="show-mobile" @click="drawer = true">
          <FontAwesomeIcon :icon="faBars" style="color: white;" />
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Drawer for mobile/tablet -->
  <v-navigation-drawer v-model="drawer" temporary location="right" class="nav-drawer">
    <v-list nav>
      <v-list-item :to="{ name: 'BoardGames' }" link @click="drawer = false">
        <v-list-item-title>Ludoteca</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'Players' }" link @click="drawer = false">
        <v-list-item-title>Jugadores</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{ name: 'Games' }" link @click="drawer = false">
        <v-list-item-title>Partidas</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
/* preserve previous icon sizing */
.navbar-icon {
  width: 42px;
  height: 42px;
}

/*
  Visibility helpers to match requested breakpoints exactly.
  - .show-desktop: visible at >=1025px
  - .show-mobile: visible below 1025px
*/
.show-desktop { display: none; }
.show-mobile { display: flex; }

@media (min-width: 1025px) {
  .show-desktop { display: flex; gap: 1rem; align-items: center; }
  .show-mobile { display: none; }
}

/* small adjustments to remove extra toolbar content spacing */
/* Note: v-main spacing should be handled by Vuetify when v-app-bar uses `app` prop. */

.nav-link {
  color: white;
  margin-left: 12px;
  text-decoration: none;
}
/* ensure drawer overlays above app-bar content when opened */
.nav-drawer {
  z-index: 2000;
}

</style>

