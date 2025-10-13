<template>
  <v-container class="mt-4">
    <h1>Editar jugador</h1>
    <p>ID: {{ $route.params.id }}</p>
  </v-container>
</template>

<script setup>
defineOptions({ name: "EditPlayerView" });
</script>

<style scoped></style>
