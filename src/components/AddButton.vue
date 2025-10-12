<template>
  <router-link :to="{ name: route }">
    <v-btn class="btn-add" color="primary">
      <v-icon icon="mdi:mdi-plus" /> <span>{{ text }}</span>
    </v-btn>
  </router-link>
</template>

<script setup>
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

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.btn-add {
  position: fixed;
  bottom: 70px;
  right: 3vw;
}
</style>
