<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDice, faUsers, faBoxArchive } from "@fortawesome/free-solid-svg-icons";

defineOptions({ name: "BottomNavigation" });

const BottomNav = [
  {
    value: "ludoteca",
    label: "Ludoteca",

  }
]

</script>

<template>
  <v-bottom-navigation tag="div" class="bottom-nav" color="surface" grow>
    <router-link class="nav-link" :to="{ name: 'BoardGames' }">
      <v-btn value="ludoteca" class="bottom-nav__button">
        <FontAwesomeIcon :icon="faDice" class="bottom-nav__icon" />
        <span class="mb-2">Ludoteca</span>
      </v-btn>
    </router-link>

    <router-link class="nav-link" :to="{ name: 'Players' }">
      <v-btn value="jugadores" class="bottom-nav__button">
        <FontAwesomeIcon :icon="faUsers" class="bottom-nav__icon" />
        <span class="mb-2">Jugadores</span>
      </v-btn>
    </router-link>

    <router-link class="nav-link" :to="{ name: 'Games' }">
      <v-btn value="partidas" class="bottom-nav__button">
        <FontAwesomeIcon :icon="faBoxArchive" class="bottom-nav__icon" />
        <span class="mb-2">Partidas</span>
      </v-btn>
    </router-link>
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

.bottom-nav__icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--font-size-xxs);
}

.nav-link {
  margin-bottom: var(--font-size-5xl);
}

.bottom-nav__button {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
</style>
