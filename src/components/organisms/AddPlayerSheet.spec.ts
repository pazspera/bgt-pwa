import { it, describe, expect, beforeEach } from "vitest";
import { createWrapperError, mount } from "@vue/test-utils";
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
          emits: ["update:modelValue"],
          template: `
            <div class="v-text-field" :data-testid="$attrs['data-testid']">
              <input 
                type="text" 
                :value="$attrs.modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
              />
              <label v-if="$attrs.label">{{ $attrs.label }}</label>
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

const setupAddPlayerSheetTest = ()=> {
  const wrapper = mountAddPlayerSheet();
  const playerNameInput = wrapper.find('[data-testid="input-player-name"]'); 
  const btnAdd = wrapper.find('[data-testid="btn-add-player"]');
  const btnCancel = wrapper.find('[data-testid="btn-cancel"]');
  const errorMessage = wrapper.find('[data-testid="error-message"]');
  return { wrapper, playerNameInput, btnAdd, btnCancel, errorMessage };
}

describe("Rendering", ()=> {
  let wrapper;
  let playerNameInput;
  let btnAdd;
  let btnCancel;

  beforeEach(() => {
    ({ wrapper, playerNameInput, btnAdd, btnCancel } = setupAddPlayerSheetTest());
  });

  it("renders player name input field with the correct label", ()=> {
    expect(playerNameInput.exists()).toBe(true);
    expect(playerNameInput.attributes("label")).toBe("Nombre");
  });

  it("renders 'add' button with correct label", ()=> {
    expect(btnAdd.exists()).toBe(true);
    expect(btnAdd.text()).toContain("Agregar");
  });

  it("renders 'cancel' button", ()=> {
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
  let wrapper;
  let playerNameInput;
  let btnAdd;
  let btnCancel;

  beforeEach(() => {
    ({ wrapper, playerNameInput, btnAdd, btnCancel } = setupAddPlayerSheetTest());
  });

  it("emits 'playerAdded' event on valid submit", async ()=> {
    await btnAdd.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("playerAdded");

    expect(emittedEvents).toBeTruthy();
    // add that is was called once
  });

  it("the emitted event matches with the string entered by the user", async ()=> {
    const playerName = "Stephen King"
    // can't add the value directly on playerNameInput
    // need to access the native input inside it to change it
    const nativeInput = playerNameInput.find("input");
    await nativeInput.setValue(playerName);
    await btnAdd.trigger("click");
    await nextTick();
    
    expect(wrapper.emitted("playerAdded")).toEqual([
      [{ playerName: playerName }]
    ])
  });

  it("emits cancellation event that closes AppPlayerSheet", async ()=> {
    await btnCancel.trigger("click");
    await nextTick();

    // this is an array
    const emittedEvents = wrapper.emitted("update:modelValue");

    // checks the event was emitted
    expect(emittedEvents).toBeTruthy();
    // emittedEvents is an array of arrays, have to 
    // access the value this way
    expect(emittedEvents).toEqual([[false]]);
  });
  
  it("remains open after submitting 'player-added' event (awaits confirmation from parent if the player already exists or not)", async ()=> {
    const playerName = "Bruce Wayne"
    const nativeInput = playerNameInput.find("input");
    await nativeInput.setValue(playerName);
    await btnAdd.trigger("click");
    await nextTick();
    
    // checks that the event was emitted
    expect(wrapper.emitted("playerAdded")).toBeTruthy;
    // modelValue should remain true for the component to be open
    expect(wrapper.props("modelValue")).toBe(true);
  });
});

describe("Validations", ()=> {
  it.todo("doesn't allow submission on empty input", ()=> {});
  it.todo("the input value doesn't have empty spaces at the beginning or the end", ()=> {});
});