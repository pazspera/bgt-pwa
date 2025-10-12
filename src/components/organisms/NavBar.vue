<template>
  <header class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          <img src="/favicon.ico" class="navbar-icon" />
        </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'BoardGames' }">Ludoteca</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Players' }">Jugadores</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'Games' }">Partidas</router-link>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  </header>
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
