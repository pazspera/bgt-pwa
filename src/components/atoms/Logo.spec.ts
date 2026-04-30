import { it, expect, describe, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Logo from "./Logo.vue";
import { router } from "@/tests/utils/createRouterMock";
import { routerLinkStub } from "@/tests/utils/stubRouterLink";
import { VChip } from "vuetify/components";
import { createVuetifyForTest } from "@/tests/utils/createVuetifyForTest";
import version from "./../../../VERSION?raw";

const vuetify = createVuetifyForTest({ VChip });


const mountLogo = ( props = {} ) => {
  return mount(Logo, {
    props: {
      to: { name: "BoardGames" },
      ...props,
    },
    global: {
      // adding 'plugins: [router]' is not needed as createRouterMock handles it
      plugins: [vuetify],
      stubs: {
        RouterLink: {
          props: ["to"],
          template: `
            <a 
              :href="to"
              v-bind="$attrs"
            >
              <slot />
            </a>
          `,
        },
        "VChip": {
          template: `
            <div v-bind="$attrs">
              <slot/>
            </div>
          `
        }
      }
    }
  })
}

describe("image rendering", ()=> {
  // Arrange
  let wrapper;
  let imgWrapper;
  const logoClass = "navbar-icon";
  const logoSrc = "/favicon.ico";

  beforeEach(()=> {
    wrapper = mountLogo();
    imgWrapper = wrapper.get("img");
  })

  it("displays logo image", ()=> {
    // component has img tag
    // Assert
    expect(imgWrapper.exists()).toBe(true);
  });

  it("applies correct css class to image", ()=>{
    // Assert
    expect(imgWrapper.classes()).toContain(logoClass);
  });

  it("correct src attribute on the image", ()=>{
    // Assert
    expect(imgWrapper.attributes("src")).toBe(logoSrc);
  });
});

it("renders the correct :to route on the link", ()=> {
  // Arrange
  const testRoute = { name: "EditPlayer", params: { id: 45 }};
  const wrapper = mountLogo({ to: testRoute });
  const logoStub = wrapper.find('[data-testid="app-logo"]');

  // Assert
  expect(logoStub.attributes("href")).toBeDefined();
  expect(logoStub.attributes("href")).toContain("[object Object]");
});

it("renders correct version number", ()=> {
  let wrapper = mountLogo();

  expect(wrapper.text()).toContain(version);
})

