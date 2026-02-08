import { it, expect, vi, describe, beforeEach } from "vitest";


// The snackbar is not stubbed and needs this object to work
globalThis.visualViewport = {
  width: 1024,
  height: 768,
  scale: 1,
  offsetLeft: 0,
  offsetTop: 0,
  pageLeft: 0,
  pageTop: 0,
  addEventListener: () => {},
  removeEventListener: () => {},
  onresize: null,
  onscroll: null,
  dispatchEvent: (_event: Event) => true
};

import { mount } from "@vue/test-utils";
import AppSnackbar from "./AppSnackbar.vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import { VSnackbar } from "vuetify/components";

const vuetify = createVuetifyForTest({ VSnackbar });

const snackbarMessage = "Test message";
const snackbarColor = "success";
const snackbarTimeout = 5000;

// Arrange
// function to mount component
const mountAppSnackbar = (props = {})=> {
  return mount(AppSnackbar, {
    attachTo: document.body,
    props: {
      visible: true,
      message: snackbarMessage,
      color: snackbarColor,
      timeout: snackbarTimeout,
      ...props
    },
    global: {
      plugins: [vuetify],
      stubs: {        
        "v-btn": {
          template: `
            <button data-test="v-btn-stub" v-bind="$attrs">
              <slot/>
            </button>
          `
        },
        "v-snackbar": { 
            props: ["modelValue", "color"], 
            template: `
              <div v-if="modelValue" class="mock-snackbar" :data-color="color"> 
                <slot /> <slot name="actions" /> 
              </div>` },
        FontAwesomeIcon: {
          props: ["icon"],
          template: `<i :data-icon="icon"></i>`
        },
      }
    }
  });
}



describe("rendering", ()=> {
  let wrapper;
  let button;

  beforeEach(()=> {
    wrapper = mountAppSnackbar();
    button = wrapper.find('[data-testid="appsnackbar-button"]');
  })


  it("renders correct message", ()=> {
    expect(wrapper.text()).toContain(snackbarMessage);
  })

  it("renders correct color", ()=> {
    expect(wrapper.html()).toContain(`data-color="${snackbarColor}"`);
  })

  it("renders correct timeout value", ()=> {
    expect(wrapper.html()).toContain(`timeout="${snackbarTimeout}"`);
  })

  it("renders the 'close' button", ()=> {
    expect(button.exists()).toBe(true);
  })
})

describe("component logic", ()=> {
  it.todo("emits 'close' event when close button is clicked", ()=> {})
  it.todo("updates model-value when close button is clicked", ()=> {});
  it.todo("emits 'close' event on timeout", ()=> {})
  it.todo("AppSnackbar is not visible if no message is received", ()=> {
    // check message undefined, null or ""
  })
})

