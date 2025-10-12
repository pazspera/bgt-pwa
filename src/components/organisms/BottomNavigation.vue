<template>
  <v-bottom-navigation class="bg-neutral-800 bottom-nav" color="primary-300">
    <router-link class="nav-link" :to="{ name: 'BoardGames' }">
      <v-btn value="ludoteca">
        <i class="fa-solid fa-dice bottom-nav__icon"></i>
        <span class="mb-2">Ludoteca</span>
      </v-btn>
    </router-link>

    <router-link class="nav-link" :to="{ name: 'Players' }">
      <v-btn value="jugadores">
        <i class="fa-solid fa-users bottom-nav__icon"></i>
        <span class="mb-2">Jugadores</span>
      </v-btn>
    </router-link>

    <router-link class="nav-link" :to="{ name: 'Games' }">
      <v-btn value="partidas">
        <i class="fa-solid fa-box-archive bottom-nav__icon"></i>
        <span class="mb-2">Partidas</span>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script setup>
defineOptions({ name: "BottomNavigation" });
</script>

<style scoped>

.bottom-nav {
  height: 100%;
  width: 100%;
  height: var(--bottom-nav-height) !important;
  padding: 0 !important;
  z-index: 999;
}

.bottom-nav__icon {
  font-size: var(--size5);
  margin-bottom: var(--size10);
}

.nav-link {
  margin-bottom: var(--size9);
}
</style>
