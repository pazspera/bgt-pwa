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
import { createVuetifyForTest } from "@/tests/utils/createVuetifyForTest";
import { VSnackbar } from "vuetify/components";
import { nextTick } from "vue";
import { afterEach } from "node:test";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

const vuetify = createVuetifyForTest({ VSnackbar });

let snackbarMessage = "Test message";
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
            name: "VSnackbarStub", 
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
    vi.useFakeTimers();
  });

  afterEach(()=> {
    vi.useRealTimers();
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
  let wrapper;
  let button;

  beforeEach(()=> {
    wrapper = mountAppSnackbar();
    button = wrapper.find('[data-testid="appsnackbar-button"]');
  })

  it("emits 'close' event when close button is clicked", async ()=> {
    await button.trigger("click");
    await nextTick();

    const emittedEvents = wrapper.emitted("close");

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents).toHaveLength(1);
  })

  it("emits 'close' event on timeout", async ()=> {
    expect(wrapper.emitted("close")).toBeFalsy();
    
    // need to find the vuetify component to trigger an event
    // the stubbed div isn't able to do it
    const snackbarMock = wrapper.findComponent({ name: "VSnackbarStub" });

    expect(snackbarMock.exists()).toBe(true);
    
    await snackbarMock.vm.$emit('update:model-value', false);
    
    expect(wrapper.emitted("close")).toBeTruthy();
  })

  it("AppSnackbar is not visible if message is null, undefined or an empty string", ()=> {
    // check message undefined, null or ""
    const invalidMessages = [null, undefined, ""];
    
    invalidMessages.forEach((invalidMsg) => {
      const wrapperEmpty = mountAppSnackbar({
        message: invalidMsg,
      })

      const snackbarMock = wrapperEmpty.findComponent({ name: "VSnackbarStub" });

      expect(snackbarMock.exists()).toBe(false);
      expect(wrapperEmpty.text().trim()).toBe("");
    })

  })
})

