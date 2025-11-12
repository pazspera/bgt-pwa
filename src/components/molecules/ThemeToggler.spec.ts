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

const clickButton = async (button)=> {
  button.trigger("click");
  await nextTick();
}

const expectsDarkTheme = (expectedDarkThemeValue: boolean)=> {
  const currentTheme = vuetify.theme.global.current.value.dark;
  expect(currentTheme).toBe(expectedDarkThemeValue);
}


const mountToggler = ( props = {} ) => {
  return mount(ThemeToggler, {
    props: {},
    global: {
      plugins: [vuetify],
      stubs: {
        "v-tooltip": {
          template: `
            <div v-bind="$attrs">
              <slot name="activator" :props="{ 'data-testid': 'activator-props' }" />
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

  it("renders correct icon in dark theme", async ()=> {
    // Act
    vuetify.theme.change("darkTheme");
    await nextTick();
    
    // Assert
    // checks correct theme being applied
    expectsDarkTheme(true);
    // checks icon
    expect(wrapper.html()).toContain(faSunText);
  });

  it("renders correct icon in light theme", async ()=> {
    // Act
    vuetify.theme.change("lightTheme");
    await nextTick();

    // Assert
    // checks correct theme being applied
    expectsDarkTheme(false);
    // checks icon
    expect(wrapper.html()).toContain(faMoonText);
  });

});

describe("interaction and dynamic behavior", ()=> {
  // Arrange
  let wrapper;
  let button;

  beforeEach(async ()=> {
    wrapper = mountToggler();
    button = wrapper.find("button");
    // defines initial state of theme on darkTheme
    vuetify.theme.change("darkTheme");
    await nextTick();
  })

  it("changes theme when clicked", async ()=> {
    // Checks initial state on dark theme
    expectsDarkTheme(true);
    
    // Change to light theme
    clickButton(button);
    expectsDarkTheme(false);
    
    // Change to dark theme
    clickButton(button);
    expectsDarkTheme(true);
  });

  it("changes icon when clicked", async ()=> {
    // Checks initial state on dark theme
    expectsDarkTheme(true);
    
    // Changes to light theme
    clickButton(button);
    // IMPORTANT needs a second tick to update computed isDark
    await nextTick();
    expectsDarkTheme(false);
    expect(wrapper.html()).toContain(faMoonText); 

    // Changes back to dark theme
    clickButton(button);
    await nextTick();
    expectsDarkTheme(true);
    expect(wrapper.html()).toContain(faSunText);
  });

  it("changes tooltip text when clicked", async ()=> {
    // checks initial state to dark
    expectsDarkTheme(true);

    // changes to light theme
    clickButton(button);
    await nextTick();
    expect(wrapper.attributes("text")).toBe("Cambiar a modo oscuro")
    
    // changes back to dark theme
    clickButton(button);
    await nextTick();
    expect(wrapper.attributes("text")).toBe("Cambiar a modo claro");
  });
})
