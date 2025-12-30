<script lang="ts" setup>
import SubsectionTitle from '../atoms/typography/SubsectionTitle.vue';
import { object, string } from "yup";
import { toTypedSchema } from '@vee-validate/yup';
import { useForm, useField } from 'vee-validate';
import { ref, computed } from "vue";
import { VExpandTransition } from 'vuetify/components';
import { EditPlayerSheetText } from '../../constants/ui_text/EditPlayerSheet';
import { PlayerApiResponse } from "../../types/domain/playerApi"

defineProps<{
  modelValue: boolean,
  errorMessage?: string,
  player: PlayerApiResponse,
}>()
defineOptions({ name: "EditPlayerSheet" });

const validationSchema = toTypedSchema(
  object({
    playerName: string()
      .required(EditPlayerSheetText.errors.required)
      .trim()
      .min(3, EditPlayerSheetText.errors.minLength)
  })
)

const emit = defineEmits(["update:modelValue", "playerAdded"]);

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: { playerName: "" }
})

const { 
  value: playerNameValue, 
  errorMessage: playerNameError,
  validate
} = useField<string>("playerName");

const isPersistent = computed(()=> playerNameValue.value?.length > 0);

const submitForm = handleSubmit(values => {
  emit("playerAdded", { name: values.playerName });
})

const closeSheet = ()=> {
  emit("update:modelValue", false );
  resetForm();
}

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
      <v-container class="container">
        <SubsectionTitle class="title">{{ EditPlayerSheetText.title }}</SubsectionTitle>
        <form @submit.prevent="submitForm">
          <v-text-field 
            v-model="playerNameValue" 
            :label="EditPlayerSheetText.labels.playerName"
            :error-messages="playerNameError" 
            data-testid="input-player-name"
          ></v-text-field>
          <div class="sheet-buttons">
            <v-btn 
              type="submit" 
              color="primary"
              @click="submitForm"
              data-testid="btn-add-player"
            >{{ EditPlayerSheetText.buttons.add }}</v-btn>
            <v-btn 
              variant="text"
              @click="closeSheet" 
              data-testid="btn-cancel"
            >{{ EditPlayerSheetText.buttons.cancel }}</v-btn>
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

.container {
  padding: 36px 24px;
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