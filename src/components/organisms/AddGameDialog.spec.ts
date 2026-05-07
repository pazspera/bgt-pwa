import { describe, it, vi, beforeEach, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { createVuetifyForTest } from "@/tests/utils/createVuetifyForTest";
import { setTextInputValue } from "@/tests/utils/form-helpers";
import AddGameDialog from "@/components/organisms/AddGameDialog.vue";
import { VDialog, VCard, VSelect, VTextarea, VBtn, VAlert, VRow, VCol } from "vuetify/components";
import { VDateInput } from "vuetify/labs/VDateInput";
import { AddGameDialogText } from "@/constants/ui_text/AddGameDialog";
import type { CollectionsApiResponse } from "@/types/domain/collectionsApi";
import type { PlayerApiResponse } from "@/types/domain/playerApi";

// Mock composables
vi.mock("@/composables/usePlayersApi");
vi.mock("@/composables/useGamesApi");

const vuetify = createVuetifyForTest({
  VDialog,
  VCard,
  VSelect,
  VDateInput,
  VTextarea,
  VBtn,
  VAlert,
  VRow,
  VCol
});

// Mock data
const mockBoardgame: CollectionsApiResponse = {
  id: "game-123",
  name: "Catan",
  bgg_id: 333,
  min_players: 2,
  max_players: 4,
  playing_time: 90,
  complexity: 1.1,
};

const mockPlayers: PlayerApiResponse[] = [
  { id: "player-1", name: "Jugador 1", is_registered: true },
  { id: "player-2", name: "Jugador 2", is_registered: true },
  { id: "player-3", name: "Jugador 3", is_registered: false },
];

// Mount function
const mountAddGameDialog = (options: Record<string, any> = {}) => {
  return mount(AddGameDialog, {
    props: {
      modelValue: true,
      boardgame: mockBoardgame,
      ...options.props || {},
    },
    global: {
      plugins: [vuetify],
      stubs: {
        "v-dialog": {
          template: `<div v-bind="$attrs" data-testid="add-game-dialog">
            <slot/>
          </div>`,
          emits: ["update:modelValue"]
        },
        "v-date-input": {
          emits: ["update:modelValue"],
          props: ["modelValue", "errorMessages", "label"],
          template: `
            <div class="v-date-input" :data-testid="$attrs['data-testid']">
              <input
                type="date"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
              />
              <label v-if="label">{{ label }}</label>
              <div v-if="errorMessages" class="error-message-stub">{{ errorMessages }}</div>
            </div>
          `
        },
        "v-select": {
          emits: ["update:modelValue"],
          props: ["modelValue", "items", "itemTitle", "itemValue", "multiple", "label", "errorMessages", "disabled"],
          template: `
            <div class="v-select" :data-testid="$attrs['data-testid']">
              <label v-if="label">{{ label }}</label>
              <select
                :multiple="multiple"
                :value="modelValue"
                @change="$emit('update:modelValue', multiple ? Array.from($event.target.selectedOptions, opt => opt.value) : $event.target.value)"
                :disabled="disabled"
              >
                <option v-for="item in items" :key="item[itemValue]" :value="item[itemValue]">
                  {{ item[itemTitle] }}
                </option>
              </select>
              <div v-if="errorMessages" class="error-message-stub">{{ errorMessages }}</div>
            </div>
          `
        },
        "v-textarea": {
          emits: ["update:modelValue"],
          props: ["modelValue", "errorMessages", "label"],
          template: `
            <div class="v-textarea" :data-testid="$attrs['data-testid']">
              <label v-if="label">{{ label }}</label>
              <textarea
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
              />
              <div v-if="errorMessages" class="error-message-stub">{{ errorMessages }}</div>
            </div>
          `
        },
        "v-btn": {
          emits: ["click"],
          template: `
            <button v-bind="$attrs" @click="$emit('click')">
              <slot/>
            </button>
          `
        },
        "LoadingRow": {
          template: `<div data-testid="loading-row">Loading...</div>`
        }
      },
    }
  });
};

// Setup function
const setupAddGameDialogTest = (options: Record<string, any> = {}) => {
  const wrapper = mountAddGameDialog(options);
  const dateInput = wrapper.find('[data-testid="date-input"]');
  const playersSelect = wrapper.find('[data-testid="players-select"]');
  const winnerSelect = wrapper.find('[data-testid="winner-select"]');
  const notesTextarea = wrapper.find('[data-testid="notes-textarea"]');
  const btnSave = wrapper.find('[data-testid="btn-save"]');
  const btnCancel = wrapper.find('[data-testid="btn-cancel"]');
  const loadingRow = wrapper.find('[data-testid="loading-row"]');
  const errorAlert = wrapper.find('[data-testid="error-alert"]');
  const dialogContent = wrapper.find('[data-testid="add-game-dialog"]');

  return {
    wrapper,
    dateInput,
    playersSelect,
    winnerSelect,
    notesTextarea,
    btnSave,
    btnCancel,
    loadingRow,
    errorAlert,
    dialogContent
  };
};

describe("AddGameDialog - Rendering", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TODO: Implement test 1.1
  it("1.1 - Renderiza cuando modelValue es true", () => {
    // Verificar que el dialog es visible
    // Verificar que todos los campos están presentes
  });

  // TODO: Implement test 1.2
  it("1.2 - No renderiza cuando modelValue es false", () => {
    // Verificar que el componente no muestra contenido
    // O que el dialog no está presente
  });

  // TODO: Implement test 1.3
  it("1.3 - Muestra loading state", () => {
    // Verificar que cuando loading=true, muestra LoadingRow
    // Verificar que oculta el formulario
  });

  // TODO: Implement test 1.4
  it("1.4 - Muestra error state (primer intento)", () => {
    // Verificar que cuando error está presente y errorCount=1
    // Muestra alerta con mensaje de reintento
  });

  // TODO: Implement test 1.5
  it("1.5 - Muestra error state (segundo intento)", () => {
    // Verificar que cuando errorCount>1
    // Muestra mensaje de recargar página
  });

  // TODO: Implement test 1.6
  it("1.6 - Renderiza todos los campos del formulario", () => {
    // Verificar que están presentes:
    // Date input, players select, winner select, notes textarea, botones
  });
});
