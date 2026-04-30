import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface Game {
  id: string;
  boardgame_id: string;
  boardgame_name: string;
  start_date?: string;
  end_date?: string;
  players: Array<{
    player_id: string;
    is_winner: boolean;
    player_name: string;
  }>;
  notes?: string;
}

export const useGameStore = defineStore("games", () => {
  const games: Ref<Game[]> = ref([]);

  function load() {
    const raw = localStorage.getItem("games");
    games.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("games", JSON.stringify(games.value));
  }

  return { games, load, save };
});
