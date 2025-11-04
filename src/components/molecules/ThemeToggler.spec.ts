import { it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import ThemeToggler from "./ThemeToggler.vue";
import { VBtn, VTooltip } from "vuetify/components";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const vuetify = createVuetifyForTest({ VBtn });
const faSunText = faSun.iconName;
const faMoonText = faMoon.iconName;

const mountToggler = ( props = {} ) => {
  return mount(ThemeToggler, {
    props: {},
    global: {
      plugins: [vuetify],
      stubs: {
        "v-tooltip": {
          template: `
            <div data-test="v-tooltip" v-bind="$attrs">
              <slot name="activator" :props="{ 'data-test': 'activator-props' }" />
              <slot/>
            </div>
          `
        }
      }
    }
  })
}

describe("rendering based on theme", ()=> {

  it.only("renders correct icon in dark theme", ()=> {
    const wrapper = mountToggler();

    console.log(wrapper.html());
    
  });

  it.todo("renders correct icon in light theme", ()=> {});

});

describe("interaction and dynamic behavior", ()=> {

  it.todo("changes theme when clicked", ()=> {});
  it.todo("changes icon when clicked", ()=> {});
  it.todo("changes tooltip text when clicked", ()=> {});

})
