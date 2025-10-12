<template>
  <section class="container mt-4">
    <h1>Agregar jugador</h1>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="name" class="form-control" />
      </div>
      <button class="btn btn-primary">Guardar</button>
    </form>
  </section>
</template>

<script>
import { usePlayerStore } from "@/stores/PlayerStore";
import { ref } from "vue";

export default {
  name: "AddPlayerView",
  setup() {
    const store = usePlayerStore();
    const name = ref("");

    function submit() {
      store.add({ name: name.value });
      name.value = "";
    }

    return { name, submit };
  },
};
</script>

<style scoped></style>
