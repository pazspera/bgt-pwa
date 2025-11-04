import { it, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import ThemeToggler from "./ThemeToggler.vue";
import { VBtn, VTooltip } from "vuetify/components";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { consoleError } from "vuetify/lib/util";

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

  it.only("renders correct icon in dark theme", async ()=> {
    // Arrange
    const wrapper = mountToggler();

    // Act
    vuetify.theme.change("darkTheme");
    await nextTick();
    
    // Assert
    console.log("wrapper dark theme");
    console.log(wrapper.html());
    expect(wrapper.html()).toContain(faSunText);
  });

  it.only("renders correct icon in light theme", async ()=> {
    // Arrange
    const wrapper = mountToggler();

    // Act
    vuetify.theme.change("lightTheme");
    await nextTick();

    // Assert
    console.log("wrapper light theme");
    console.log(wrapper.html());
    expect(wrapper.html()).toContain(faMoonText);
  });

});

describe("interaction and dynamic behavior", ()=> {

  it.todo("changes theme when clicked", ()=> {});
  it.todo("changes icon when clicked", ()=> {});
  it.todo("changes tooltip text when clicked", ()=> {});

})
