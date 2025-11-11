import { it, describe, expect, beforeEach } from "vitest";
import { createWrapperError, mount } from "@vue/test-utils";
import { setTextInputValue } from "../../tests/utils/form-helpers";
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
          props: ["errorMessages"],
          template: `
            <div class="v-text-field" :data-testid="$attrs['data-testid']">
              <input 
                type="text" 
                :value="$attrs.modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
              />
              <label v-if="$attrs.label">{{ $attrs.label }}</label>
              <div v-if="errorMessages" class="v-messages error-message-stub">
                {{ errorMessages }}
            </div>
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
  const nativeInput = playerNameInput.find("input"); 
  const btnAdd = wrapper.find('[data-testid="btn-add-player"]');
  const btnCancel = wrapper.find('[data-testid="btn-cancel"]');
  const errorMessage = wrapper.find('[data-testid="error-message"]');
  const bottomSheetWrapper = wrapper.find('[data-testid="bottom-sheet"]')
  return { wrapper, playerNameInput, nativeInput, btnAdd, btnCancel, errorMessage, bottomSheetWrapper };
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
  let bottomSheetWrapper;
  let nativeInput;

  beforeEach(() => {
    ({ wrapper, playerNameInput, btnAdd, btnCancel, bottomSheetWrapper, nativeInput } = setupAddPlayerSheetTest());
  });

  it("emits 'playerAdded' event on valid submit", async ()=> {
    const playerName = "Stephen King";
    await setTextInputValue(wrapper, "input-player-name", playerName);
    await btnAdd.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("playerAdded");

    expect(emittedEvents).toBeTruthy();
    // add that is was called once
  });

  it("the emitted event matches with the string entered by the user", async ()=> {
    const playerName = "Stephen King"
    await setTextInputValue(wrapper, "input-player-name", playerName);
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
    await setTextInputValue(wrapper, "input-player-name", playerName);
    await btnAdd.trigger("click");
    await nextTick();
    
    // checks that the event was emitted
    expect(wrapper.emitted("playerAdded")).toBeTruthy;
    // modelValue should remain true for the component to be open
    expect(wrapper.props("modelValue")).toBe(true);
  });

  it("toggles persistence based on input value to prevent data loss", async ()=> {
    const name = "Clark Kent";

    // initial state, empty input
    // the component shouldn't ve persistent
    expect(bottomSheetWrapper.attributes("persistent")).toBe("false");

    await setTextInputValue(wrapper, "input-player-name", name);
    await nextTick();

    // the component should be persistent after user interaction
    expect(bottomSheetWrapper.attributes("persistent")).toBe("true");

    await nativeInput.setValue("");
    await nextTick();
    
    // the component shouldn't be persistent it the input data is deleted
    expect(bottomSheetWrapper.attributes("persistent")).toBe("false");
  })
})

describe("Validations", ()=> {
  let wrapper;
  let playerNameInput;
  let btnAdd;
  let nativeInput

  beforeEach(() => {
    ({ wrapper, playerNameInput, btnAdd, nativeInput } = setupAddPlayerSheetTest());
  });

  it("doesn't allow submission on empty input", async ()=> {
    const errorMessageText = "El nombre del jugador es obligatorio";
    await setTextInputValue(wrapper, "input-player-name", "");

    await btnAdd.trigger("click");
    await nextTick();

    // checks event is not submitted
    expect(wrapper.emitted("playerAdded")).toBeUndefined();
    
    // need to force validation, otherwise the error message is not displayed
    const validationResult = await wrapper.vm.validatePlayerName();
    await nextTick();
    
    expect(wrapper.html()).toContain(errorMessageText);
  });

  it.todo("the input value doesn't have empty spaces at the beginning or the end", ()=> {});

  it.todo("the new player name should have a min of 3 letters", ()=> {})
});