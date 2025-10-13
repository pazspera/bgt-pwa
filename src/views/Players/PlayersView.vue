<template>
  <v-container class="mt-4">
    <h1>Jugadores</h1>
    <router-link :to="{ name: 'AddPlayer' }">
      <v-btn color="primary">Agregar jugador</v-btn>
    </router-link>
  </v-container>
</template>

<script setup>
defineOptions({ name: "PlayersView" });
</script>

<style scoped></style>
