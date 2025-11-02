import { ref, nextTick } from "vue";
import { it, expect, vi, describe } from "vitest";

/* 
  IMPORTANT
  - the watch in AppSnackbar doesn't activate, so it renders
  the v-if instead of the component
  - sharedHasRun has to be here to make sure the test doesn't break
  - what worked was wrapper.vm.snackbarVisible = true;
  - this changes the value of the watch directly
*/
const sharedHasRun = ref(false);

// initial mock
vi.mock("@/composables/useCheckDbHealth", ()=> ({
  useCheckDbHealth: ()=> ({
    statusMessage: ref("Conectado a la base de datos"),
    color: ref("success"),
    icon: ref("faCircleCheck"),
    hasRun: sharedHasRun,
    checkHealth: vi.fn(),
  })
}));

import { mount } from "@vue/test-utils";
import AppSnackbar from "./AppSnackbar.vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
// the composable still needs to be imported
// when it's used later on, the mock will be used instead
import { useCheckDbHealth } from "../../composables/useCheckDbHealth";

const vuetify = createVuetifyForTest();

// Arrange
// function to mount component
const mountAppSnackbar = ()=> {
  return mount(AppSnackbar, {
    global: {
      plugins: [vuetify],
      stubs: {
        "v-snackbar": {
          template: '<div data-test="v-snackbar-stub" v-bind="$attrs"><slot/><slot name="actions"/></div>'
        },
        "v-btn": {
          template: '<button data-test="v-btn-stub" v-bind="$attrs"><slot/></button>'
        },
        FontAwesomeIcon: true,
      }
    }
  });

}
describe("mock response from useCheckDbHealth()", ()=> {

  it.only("shows correct info on success response", async ()=> {
    // Act
    sharedHasRun.value = false;
    const wrapper = mountAppSnackbar();
    // changes the value of the watch directly 
    wrapper.vm.snackbarVisible = true;
    await nextTick();

    sharedHasRun.value = true;
    console.log("snackbarVisible:", wrapper.vm.snackbarVisible);
    console.log(wrapper.html());
    console.log(wrapper.text());

    // Assert
  });

  it.todo("shows correct info on error response", ()=> {
    // Assert
    // función mock error response
    // llamada a función mount
    
    // Act

    // Assert
  });
})
it.todo("closes when close button is clicked", ()=> {});