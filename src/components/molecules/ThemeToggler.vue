<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import { computed } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const icon = computed(() => isDark.value ? "faSun" : "faMoon");
const tooltipText = computed(() => isDark.value ? "Cambiar a modo claro" : "Cambiar a modo oscuro");

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "lightTheme" : "darkTheme";
}

</script>

<template>
  <v-tooltip :text="tooltipText" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn 
        v-bind="props"
        @click="toggleTheme"
        :color="isDark ? 'white' : 'on-primary'"
        icon
        variant="text"
      >
        <FontAwesomeIcon :icon="isDark ? faSun : faMoon"></FontAwesomeIcon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
