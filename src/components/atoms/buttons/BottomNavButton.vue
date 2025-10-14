<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NavButton } from "../../../types/navigation";
import BottomNavLabel from "../typography/BottomNavLabel.vue";

defineProps<NavButton>();

</script>

<template>
  <v-btn :value="value" :to="to" class="bottom-nav__button" color="primary">
    <FontAwesomeIcon :icon="icon" class="bottom-nav__icon" />
    <BottomNavLabel class="bottom-nav__label">{{ label }}</BottomNavLabel>
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

.bottom-nav__icon, 
.bottom-nav__label {
  color: var(--v-theme-on-surface); 
}

.bottom-nav__button.v-btn--active .bottom-nav__icon, 
.bottom-nav__button.v-btn--active .bottom-nav__label {
  color: var(--v-theme-primary) !important;
}

.bottom-nav__button.v-btn--active .bottom-nav__label {
  font-weight: 900;
  font-size: var(--font-size-xs) !important;
}

.bottom-nav__button.v-btn--active .bottom-nav__icon {
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
}
</style>