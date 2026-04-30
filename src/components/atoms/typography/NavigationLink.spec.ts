import { it, expect, describe, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationLink from "./NavigationLink.vue";
import { router } from "@/tests/utils/createRouterMock";
import { routerLinkStub } from "@/tests/utils/stubRouterLink";

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
      // adding 'plugins: [router]' is not needed as createRouterMock handles it
      stubs: {
        RouterLink: routerLinkStub
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
  const navigationLinkStub = wrapper.find('[data-testid="router-link-stub"]')

  // Assert
  // - checks that the attribute "to" exists
  // - checks that it contains [object Object]
  // On the template, the to prop is assigned to href
  // Looking for the to prop will result in undefined
  expect(navigationLinkStub.attributes("href")).toBeDefined();
  expect(navigationLinkStub.attributes("href")).toContain("[object Object]");
});

describe("active link logic", ()=> {
  // Arrange
  let linkRoute;
  let wrapper;

  beforeEach(()=> {
    linkRoute = { name: "BoardGames" };
    wrapper = mountNavigationLink({ to: linkRoute });
  })

  it("displays 'aria-current=page' when the current route matches the 'to' prop", async ()=> {
    // Act
    await router.push(linkRoute);
    await wrapper.vm.$nextTick();
  
    // Assert
    const navigationLinkStub = wrapper.find('[data-testid="router-link-stub"]');
    expect(navigationLinkStub.attributes("aria-current")).toBe("page"); 
  });
  
  it("doesn't display 'aria-current=page' when the current route doesn't match the 'to' prop", async ()=> {
    // Arrange
    const testRoute = { name: "Players" };

    // Act
    await router.push(testRoute);
    await wrapper.vm.$nextTick();

    // Assert
    const navigationLinkStub = wrapper.find('[data-testid="router-link-stub"]');
    expect(navigationLinkStub.attributes("aria-current")).toBe(undefined);
  });
})

