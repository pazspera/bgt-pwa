<script setup lang="ts">

defineProps<{
  modelValue: boolean
}>();
defineOptions({ name: "AddGameDialog" });

const emit = defineEmits(["update:modelValue"]);

const closeDialog = () => {
  emit("update:modelValue", false);
}

</script>

<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete."
        title="Update in progress"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="closeDialog"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<style></style>