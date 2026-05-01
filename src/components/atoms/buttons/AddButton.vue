<script setup>
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
});

defineOptions({ name: "AddGameButton" });
</script>

<template>
  <router-link :to="{ name: route }">
    <v-btn class="btn-add" color="primary">
      <v-icon :icon="faPlus" /> <span>{{ text }}</span>
    </v-btn>
  </router-link>
</template>

<style scoped>
.btn-add {
  position: fixed;
  bottom: 70px;
  right: 3vw;
}
</style>
