<template>
  <v-toolbar class="bg-neutral-800" :elevation="0" color="primary-300">
    <v-container>
      <v-row>
        <router-link :to="{ name: 'Home' }">
          <v-app-bar-nav-icon color="primary-300"><img src="/vite.svg" /></v-app-bar-nav-icon>
        </router-link>
        <v-toolbar-title>Hello</v-toolbar-title>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script setup>
defineOptions({ name: "ToolBar" });
</script>

<style></style>
