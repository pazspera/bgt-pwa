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

<script>
export default {
  name: "BottomNavigation",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.bottom-nav {
  height: 80px;
  padding-bottom: $size8;
}

.bottom-nav__icon {
  font-size: $size5;
  margin-bottom: $size10;
}

.nav-link {
  margin-bottom: $size9;
}
</style>
