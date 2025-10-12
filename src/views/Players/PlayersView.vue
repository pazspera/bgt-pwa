<template>
  <section class="container mt-4">
    <h1>Jugadores</h1>
    <router-link :to="{ name: 'AddPlayer' }" class="btn btn-primary">Agregar jugador</router-link>
  </section>
</template>

<script setup>
defineOptions({ name: "PlayersView" });
</script>

<style scoped></style>
