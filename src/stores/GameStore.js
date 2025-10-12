import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("games", () => {
  const games = ref([]);

  function load() {
    const raw = localStorage.getItem("games");
    games.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("games", JSON.stringify(games.value));
  }

  return { games, load, save };
});
