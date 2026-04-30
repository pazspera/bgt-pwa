import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface Player {
  id: string;
  name: string;
  is_registered: boolean;
  created_at: string;
  updated_at: string;
}

export const usePlayerStore = defineStore("player", () => {
  const players: Ref<Player[]> = ref([]);

  function load() {
    const raw = localStorage.getItem("players");
    players.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("players", JSON.stringify(players.value));
  }

  function add(player: Player) {
    players.value.push(player);
    save();
  }

  function update(index: number, player: Player) {
    players.value[index] = player;
    save();
  }

  function remove(index: number) {
    players.value.splice(index, 1);
    save();
  }

  return { players, load, save, add, update, remove };
});
