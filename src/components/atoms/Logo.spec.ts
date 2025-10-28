import { it, expect, describe, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Logo from "./Logo.vue";
import { router } from "../../tests/utils/createRouterMock";

const mountLogo = ( props = {} ) => {
  return mount(Logo, {
    props: {
      to: { name: "BoardGames" },
      ...props,
    },
    global: {
      plugins: [router],
      stubs: {
        RouterLink: {
          props: ["to"],
          template: `
            <a data-test="router-link-stub"
              :href="to"
              v-bind="$attrs"
            >
              <slot />
            </a>
          `,
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

  it.only("correct src attribute on the image", ()=>{
    // Assert
    expect(imgWrapper.attributes("src")).toBe(logoSrc);
  });
});

it.todo("renders the correct :to route on the link", ()=> {});

