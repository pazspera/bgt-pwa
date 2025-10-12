import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const players = ref([]);

  function load() {
    const raw = localStorage.getItem("players");
    players.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("players", JSON.stringify(players.value));
  }

  function add(player) {
    players.value.push(player);
    save();
  }

  function update(index, player) {
    players.value[index] = player;
    save();
  }

  function remove(index) {
    players.value.splice(index, 1);
    save();
  }

  return { players, load, save, add, update, remove };
});
