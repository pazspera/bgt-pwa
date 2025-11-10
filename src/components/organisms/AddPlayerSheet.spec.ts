import { it, describe, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import { VBottomSheet, VContainer, VTextField, VBtn, VSheet } from "vuetify/components";
import AddPlayerSheet from "./AddPlayerSheet.vue";
 
const vuetify = createVuetifyForTest({ VBottomSheet, VContainer, VTextField, VBtn, VSheet });
 
const mountAddPlayerSheet = ()=> {
  return mount(AddPlayerSheet, {
    props: {
      modelValue: true
    },
    global: {
      plugins: [vuetify],
      stubs: {
        "v-bottom-sheet": {
          template: `
            <div v-bind="$attrs">
              <slot/>
            </div>
          `
        },
        "v-text-field": {
          template: `
            <div v-bind="$attrs">
              <slot/>
            </div>
          `
        },
        "v-btn": {
          template: `
            <div v-bind="$attrs">
              <slot/>
            </div>
          `
        }
      },
    }
  })
}

describe("Rendering", ()=> {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mountAddPlayerSheet();
  });

  it.only("renders player name input field with the correct label", ()=> {
    const playerNameInput = wrapper.find('[data-testid="input-player-name"]');
    
    expect(playerNameInput.exists()).toBe(true);
    expect(playerNameInput.attributes("label")).toBe("Nombre");
  });

  it.todo("renders 'add' button", ()=> {});
  it.todo("renders 'cancel' button", ()=> {});
  it.todo("shows a message error with the correct value when errorMessage is received", ()=> {});
});

describe("Logic & Events", ()=> {
  it.todo("emits 'player-added' event on valid submit", ()=> {});
  it.todo("the emitted event matches with the string entered by the user", ()=> {});
  it.todo("emits cancellation event that closes AppPlayerSheet", ()=> {});
  it.todo("remains open after submitting 'player-added' event (awaits confirmation from parent if the player already exists or not)", ()=> {});
});

describe("Validations", ()=> {
  it.todo("doesn't allow submission on empty input", ()=> {});
  it.todo("the input value doesn't have empty spaces at the beginning or the end", ()=> {});
});