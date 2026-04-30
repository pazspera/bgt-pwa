import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface BoardGame {
  id: string;
  name: string;
  // Add other properties as needed
}

export const useBoardGameStore = defineStore("boardgames", () => {
  const items: Ref<BoardGame[]> = ref([]);

  function load() {
    const raw = localStorage.getItem("boardgames");
    items.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("boardgames", JSON.stringify(items.value));
  }

  return { items, load, save };
});
