import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardGameStore = defineStore("boardgames", () => {
  const items = ref([]);

  function load() {
    const raw = localStorage.getItem("boardgames");
    items.value = raw ? JSON.parse(raw) : [];
  }

  function save() {
    localStorage.setItem("boardgames", JSON.stringify(items.value));
  }

  return { items, load, save };
});
