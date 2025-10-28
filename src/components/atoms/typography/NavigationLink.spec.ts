import { it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationLink from "./NavigationLink.vue";
import { router } from "../../../tests/utils/createRouterMock";

const classNavLink = "navigation-link";

const mountNavigationLink = (
  props = {}, 
  slots= { default: "Test" }
) => {
  return mount(NavigationLink, {
    props: {
      to: { name: "BoardGames" },
      ...props,
    },
    slots,
    global: {
      plugins: [router],
      stubs: {
        RouterLink: {
          props: ["to", "aria-current"],
          template: `
            <a data-test="router-link-stub" 
               :href="to" 
               :aria-current="aria-current" 
               v-bind="$attrs"
            >
              <slot />
            </a>
          `
        }
      }
    }
  })
}

it("displays text", ()=> {
  // Arrange
  const text = "Link test";
  const wrapper = mountNavigationLink({}, { default: text });
  
  // Assert
  expect(wrapper.html()).toContain(text);
});

it("has base css class", ()=> {
  // Arrange
  const wrapper = mountNavigationLink();

  // Assert
  expect(wrapper.html()).toContain(classNavLink);
});

it("receives valid :to route as an object", ()=> {
  // Arrange
  const testRoute = { name: "EditPlayer", params: { id: 36 }};
  const wrapper = mountNavigationLink({ to: testRoute });
  // the stub is needed, the wrapper doesn't have the "to"
  const navigationLinkStub = wrapper.find('[data-test="router-link-stub"]')

  // Assert
  // - checks that the attribute "to" exists
  // - checks that it contains [object Object]
  // On the template, the to prop is assigned to href
  // Looking for the to prop will result in undefined
  expect(navigationLinkStub.attributes("href")).toBeDefined();
  expect(navigationLinkStub.attributes("href")).toContain("[object Object]");
});

it.todo("displays 'aria-current=page' when the current route matches the 'to' prop", ()=> {});

it.todo("doesn't display 'aria-current=page' when the current route doesn't match the 'to' prop", ()=> {});

