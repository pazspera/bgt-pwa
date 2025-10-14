<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NavButton } from "../../../types/navigation";
import BottomNavLabel from "../typography/BottomNavLabel.vue";

defineProps<NavButton>();

</script>

<template>
  <v-btn :value="value" :to="to" class="bottom-nav__button">
    <FontAwesomeIcon :icon="icon" class="bottom-nav__icon" />
    <BottomNavLabel>{{ label }}</BottomNavLabel>
  </v-btn>
</template>

<style scoped> 
.bottom-nav__button {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.bottom-nav__icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--font-size-xxs);
}
</style>