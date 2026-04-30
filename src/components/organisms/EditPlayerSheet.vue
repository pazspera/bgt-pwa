<script lang="ts" setup>
import SubsectionTitle from '@/components/atoms/typography/SubsectionTitle.vue';
import AppButton from '@/components/atoms/buttons/AppButton.vue';
import { object, string } from "yup";
import { toTypedSchema } from '@vee-validate/yup';
import { useForm, useField } from 'vee-validate';
import { ref, computed, watch } from "vue";
import { VExpandTransition } from 'vuetify/components';
import { EditPlayerSheetText } from '@/constants/ui_text/EditPlayerSheet';
import { PlayerApiResponse, UpdatePlayerRequest } from "../../types/domain/playerApi"

const props = defineProps<{
  modelValue: boolean,
  errorMessage?: string,
  player: PlayerApiResponse | null,
}>();
defineOptions({ name: "EditPlayerSheet" });

const validationSchema = toTypedSchema(
  object({
    playerName: string()
      .required(EditPlayerSheetText.errors.required)
      .trim()
      .min(3, EditPlayerSheetText.errors.minLength)
  })
)

const emit = defineEmits(["update:modelValue", "playerUpdated"]);

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema,
  initialValues: { playerName: "" }
})

const { 
  value: playerNameValue, 
  errorMessage: playerNameError,
  validate
} = useField<string>("playerName");

watch(() => props.player, (newPlayer) => {
  if (newPlayer) {
    // Si viene un player, llenamos el campo manualmente
    playerNameValue.value = newPlayer.name;
  } else {
    // Si es null (crear nuevo), limpiamos el formulario
    resetForm();
  }
}, { immediate: true });

const isPersistent = computed(()=> playerNameValue.value?.length > 0);

const submitForm = handleSubmit(values => {
  if (!props.player) return;

  emit("playerUpdated", { 
    id: props.player.id,
    name: { name: values.playerName.trim() }
  });
})

const closeSheet = ()=> {
  emit("update:modelValue", false );
  resetForm();
}

const isNameChanged = computed(()=> {
  if(!props.player) return false;
  return playerNameValue.value.trim() !== props.player.name;
})

const canSubmit = computed(()=> {
  return isNameChanged.value && !playerNameError.value && playerNameValue.value.length >= 3;
})

defineExpose({
  validatePlayerName: validate
})

</script>

<template>
  <v-bottom-sheet
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :persistent="isPersistent"
    data-testid="bottom-sheet"
  >
    <v-sheet color="surface">
      <v-container class="bottom-sheet-container">
        <SubsectionTitle class="title">{{ EditPlayerSheetText.title }}</SubsectionTitle>
        <form @submit.prevent="submitForm">
          <v-text-field 
            v-model="playerNameValue" 
            :label="EditPlayerSheetText.labels.playerName"
            :error-messages="playerNameError" 
            data-testid="input-player-name"
          ></v-text-field>
          <div class="sheet-buttons">
            <AppButton
              type="submit" 
              color="primary"
              @click="submitForm"
              variant="flat"
              density="default"
              :disabled="!isNameChanged"
              :label="EditPlayerSheetText.buttons.save"
              data-testid="btn-add-player"
            />
            <AppButton
              variant="text"
              density="default"
              @click="closeSheet" 
              data-testid="btn-cancel"
              :label="EditPlayerSheetText.buttons.cancel"
            />
          </div>
        </form>

        <v-expand-transition>
          <div v-if="errorMessage">
            <v-alert
                color="error"
                :text="errorMessage"
                data-testid="error-message"
              >
            </v-alert>
          </div>
        </v-expand-transition>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<style scoped>
.title {
  margin-top: 0 !important;
  margin-bottom: 16px !important;
}

.sheet-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px; 
  margin-top: 24px;
}

@media(min-width: 960px){
  .container {
    padding: 48px 0;
  }
}
</style>