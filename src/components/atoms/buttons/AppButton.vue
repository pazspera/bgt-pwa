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
.app-btn :deep(.v-btn__overlay),
.app-btn :deep(.v-btn__underlay) {
  display: none !important;
}

.app-btn {
  transition: all 0.25s ease;
}

.btn-content-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; /* Espaciado entre icono y texto */
  color: inherit;
}

.app-btn :deep(svg) {
  fill: currentColor !important;
}

/* 2. FEEDBACK FÍSICO UNIVERSAL */
.app-btn:active {
  transform: scale(0.95);
}

/* 3. LÓGICA DE COLORES POR TEMA Y ESTADO (Hover/Active) */
/* Usamos las variables dinámicas de Vuetify para que cambien solas entre Light y Dark */

/* PRIMARY (Morado -> Verde) */
.app-btn.is-primary:hover {
  background-color: var(--v-theme-primary) !important;
  color: var(--v-theme-secondary) !important; /* Tu accent-600 es secondary */
}

/* ERROR (Rojo -> Blanco/Claro) */
.app-btn.is-error:hover {
  background-color: var(--v-theme-error) !important;
  color: var(--v-theme-on-error) !important;
}

/* WARNING (Amarillo -> Texto Oscuro) */
.app-btn.is-warning:hover {
  background-color: var(--v-theme-warning) !important;
  color: var(--v-theme-on-warning) !important;
}

/* INFO (Azul -> Blanco) */
.app-btn.is-info:hover {
  background-color: var(--v-theme-info) !important;
  color: var(--v-theme-on-info) !important;
}

/* SUCCESS (Verde -> Blanco) */
.app-btn.is-success:hover {
  background-color: var(--v-theme-success) !important;
  color: var(--v-theme-on-success) !important;
}

/* ESTADO ACTIVE (Presionado) */
/* Un pequeño oscurecimiento para dar sensación de profundidad */
.app-btn:hover:active {
  filter: brightness(0.8);
}

</style>