import { it, describe, expect, beforeEach } from "vitest";
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
  // Arrange
  let wrapper;

  beforeEach(()=> {
    wrapper = mountToggler();
  })

  it.only("renders correct icon in dark theme", async ()=> {
    // Act
    vuetify.theme.change("darkTheme");
    await nextTick();
    
    // Assert
    // checks correct theme being applied
    expect(vuetify.theme.global.current.value.dark).toBe(true);
    // checks icon
    expect(wrapper.html()).toContain(faSunText);
  });

  it.only("renders correct icon in light theme", async ()=> {
    // Act
    vuetify.theme.change("lightTheme");
    await nextTick();

    // Assert
    // checks correct theme being applied
    expect(vuetify.theme.global.current.value.dark).toBe(false);
    // checks icon
    expect(wrapper.html()).toContain(faMoonText);
  });

});

describe("interaction and dynamic behavior", ()=> {

  it.todo("changes theme when clicked", ()=> {});
  it.todo("changes icon when clicked", ()=> {});
  it.todo("changes tooltip text when clicked", ()=> {});

})
