<template>
  <v-app-bar color="neutral-800"  dark>
    <v-container>
      <v-row align="center" justfy="space-between">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <img src="/favicon.ico" class="navbar-icon" />
        </router-link>
        <router-link class="nav-link" :to="{ name: 'BoardGames' }">Ludoteca</router-link>
        <router-link class="nav-link" :to="{ name: 'Players' }">Jugadores</router-link>
        <router-link class="nav-link" :to="{ name: 'Games' }">Partidas</router-link>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
defineOptions({ name: "NavBar" });
</script>

<style scoped>
.navbar-message {
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  color: white;
}
.navbar-icon {
  width: 42px;
  height: 42px;
}
</style>
