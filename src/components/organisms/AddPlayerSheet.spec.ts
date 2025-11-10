import { it, describe, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import { VBottomSheet, VContainer, VTextField, VBtn, VSheet, VAlert } from "vuetify/components";
import AddPlayerSheet from "./AddPlayerSheet.vue";
 
const vuetify = createVuetifyForTest({ VBottomSheet, VContainer, VTextField, VBtn, VSheet, VAlert });
 
const mountAddPlayerSheet = ( options: Record<string, any> = {})=> {
  return mount(AddPlayerSheet, {
    props: {
      modelValue: true,
      ...options.props || {},
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

  it("renders player name input field with the correct label", ()=> {
    const playerNameInput = wrapper.find('[data-testid="input-player-name"]');
    
    expect(playerNameInput.exists()).toBe(true);
    expect(playerNameInput.attributes("label")).toBe("Nombre");
  });

  it("renders 'add' button with correct label", ()=> {
    const btnAdd = wrapper.find('[data-testid="btn-add-player"]');

    expect(btnAdd.exists()).toBe(true);
    expect(btnAdd.text()).toContain("Agregar");
  });

  it("renders 'cancel' button", ()=> {
    const btnCancel = wrapper.find('[data-testid="btn-cancel"]');

    expect(btnCancel.exists()).toBe(true);
    expect(btnCancel.text()).toContain("Cancelar");
  });

  it("shows a message error with the correct value when errorMessage is received", async ()=> {
    const errorText = "An error has occurred";

    const wrapperError = mountAddPlayerSheet({
      props: { errorMessage: errorText }
    });

    const errorMessage = wrapperError.find('[data-testid="error-message"]');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain(errorText);
  });
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