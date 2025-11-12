<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import { computed, defineComponent } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  iconSize?: string;
}>();

defineComponent({
  name: "ThemeToggler"
})

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const icon = computed(() => isDark.value ? "faSun" : "faMoon");
const tooltipText = computed(() => isDark.value ? "Cambiar a modo claro" : "Cambiar a modo oscuro");

const toggleTheme = () => {
  theme.change(isDark.value ? "lightTheme" : "darkTheme");
}

</script>

<template>
  <v-tooltip :text="tooltipText" location="bottom" data-testid="v-tooltip">
    <template v-slot:activator="{ props }">
      <v-btn 
        v-bind="props"
        @click="toggleTheme"
        color="on-surface"
        icon
        variant="flat"
      >
        <FontAwesomeIcon 
          :icon="isDark ? faSun : faMoon"
          :style="{ fontSize: iconSize }"
        ></FontAwesomeIcon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<style scoped>
.v-btn {
  background: transparent !important;
}

.v-btn :deep(.v-btn__overlay) {
  opacity: 0 !important;
}
</style>