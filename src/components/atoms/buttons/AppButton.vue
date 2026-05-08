<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ButtonLabel from '@/components/atoms/typography/ButtonLabel.vue';

interface Props {
  color?: string,
  variant?: "elevated" | "flat" | "tonal" | "outlined" | "text" | "plain",
  density?: "compact" | "comfortable" | "default",
  size?: "x-small" | "small" | undefined| "large" | "x-large",
  icon?: any,
  label: string,
  to?: any,
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
    :to="to"
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
    <button-label>{{ label }}</button-label>
    <slot></slot>
  </v-btn>
</template>