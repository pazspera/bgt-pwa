<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
interface Props {
  color?: string,
  variant?: "elevated" | "flat" | "tonal" | "outlined" | "text" | "plain",
  density?: "compact" | "comfortable" | "default",
  size?: "x-small" | "small" | undefined| "large" | "x-large",
  icon?: any,
  label: string,
}

const props = withDefaults(defineProps<Props>(),{
  density: "comfortable",
  size: undefined,
  color: "primary",
})

</script>

<template>
  <v-btn
    v-bind="$attrs"
    :color="color"
    :variant="variant"
    :density="density"
    :size="size"
    :ripple="false"
    :class="['app-btn', `is-${color}`]"
  >
    <template v-if="icon" #prepend>
      <FontAwesomeIcon :icon="icon" />
    </template>
    <span>{{ label }}</span>
    <slot></slot>
  </v-btn>
</template>

<style scoped>
/* Apagar overlays de Vuetify (ok si tomás control del estado) */
.app-btn :deep(.v-btn__overlay),
.app-btn :deep(.v-btn__underlay) {
  display: none !important;
}

/* Transición suave */
.app-btn.v-btn {
  transition: all 0.25s ease;
}

/* Ícono hereda el color del texto */
.app-btn :deep(svg) {
  fill: currentColor !important;
}

/* Feedback físico */
.app-btn.v-btn:active {
  transform: scale(0.95);
}

/* HOVER por color usando tokens on-* para contraste correcto */
.app-btn.v-btn.is-primary:hover {
  background-color: var(--v-theme-primary) !important;
  color: var(--v-theme-on-primary) !important;
}

.app-btn.v-btn.is-error:hover {
  background-color: var(--v-theme-error) !important;
  color: var(--v-theme-on-error) !important;
}

.app-btn.v-btn.is-warning:hover {
  background-color: var(--v-theme-warning) !important;
  color: var(--v-theme-on-warning) !important;
}

.app-btn.v-btn.is-info:hover {
  background-color: var(--v-theme-info) !important;
  color: var(--v-theme-on-info) !important;
}

.app-btn.v-btn.is-success:hover {
  background-color: var(--v-theme-success) !important;
  color: var(--v-theme-on-success) !important;
}

/* PRESSED (active): leve oscurecimiento universal */
.app-btn.v-btn:hover:active {
  filter: brightness(0.9);
}
</style>