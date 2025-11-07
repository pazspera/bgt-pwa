import { it, describe, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { router } from "../../tests/utils/createRouterMock";
import { nextTick } from "vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import { mockViewportForVueUse } from "../../tests/utils/mockViewportForVueUse";
import { expectNavigationLinks } from "../../tests/utils/expectNavigationLinks";
import { NavigationLinkStub } from "../../tests/utils/stubNavigationLink";
import { VAppBar, VNavigationDrawer, VBtn, VRow, VContainer, VList, VTooltip } from "vuetify/components";
import NavBar from "./NavBar.vue";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const vuetify = createVuetifyForTest({ VAppBar, VNavigationDrawer, VBtn, VRow, VContainer, VList, VTooltip });
const faBarsText = faBars.iconName;

// Data to verify NavigationLinks
const expectedTo = ["BoardGames", "Players", "Games"];
const expectedText = ["Ludoteca", "Jugadores", "Partidas"]; 

const mountNavbar = () => {
  return mount(NavBar, {
    global: {
      plugins: [vuetify],
      stubs: {
        "v-app-bar": {
          template: `
            <div data-test="v-app-bar-stub" v-bind="$attrs">
              <slot/>
            </div>
          `
        },
        "v-navigation-drawer": {
          template: `
            <div data-test="v-navigation-drawer" v-bind="$attrs">
              <slot/>
            </div>
          `
        },
        NavigationLink: NavigationLinkStub
      }
    }
  })
}

const setupNavbarTest = (viewportWidth = 1200) => {
  mockViewportForVueUse(viewportWidth);
  const wrapper = mountNavbar();
  const vAppBar = wrapper.find('[data-test="v-app-bar-stub"]');
  const vNavigationDrawer = wrapper.find('[data-test="v-navigation-drawer"]');
  return { wrapper, vAppBar, vNavigationDrawer };
}

describe("NavBar Desktop", ()=> {
  let wrapper;
  let vAppBar;
  let vNavigationDrawer;

  beforeEach(()=> {
    ({ wrapper, vAppBar, vNavigationDrawer } = setupNavbarTest(1200));
  })

  it("shows desktop layout at (min-width: 1024px)", async ()=> {
    // checks desktop layout
    expect(window.innerWidth).toBeGreaterThanOrEqual(1024);
    await nextTick();
    // desktopNavLinks should be visible
    // nav-drawer-icons and vNavigationDrawers should not
    const desktopNavLinks = wrapper.find('[data-testid="desktop-nav-links"]');
    const navDrawerIcons = wrapper.find('[data-testid="nav-drawer-icons"]');

    expect(desktopNavLinks.exists()).toBe(true);
    expect(navDrawerIcons.exists()).toBe(false);
  });
  
  it("renders all navigation links in desktop layout (min-width: 1024px)", ()=> {
    expect(window.innerWidth).toBeGreaterThanOrEqual(1024);
    expectNavigationLinks(vAppBar, expectedTo, expectedText);
  });

  it("renders ThemeToggler in desktop layout", ()=> {
    expect(window.innerWidth).toBeGreaterThanOrEqual(1024);
    const themeTogglerInWrapper = vAppBar.findComponent({ name: "ThemeToggler"});

    expect(themeTogglerInWrapper.exists()).toBe(true);
  });
})

describe("NavBar Mobile", ()=> {
  let wrapper;
  let vAppBar;
  let vNavigationDrawer;

  beforeEach(()=> {
    ({ wrapper, vAppBar, vNavigationDrawer } = setupNavbarTest(768));
  })

  it.todo("shows mobile layout at (max-width: 768px)", ()=> {});
  it.todo("shows tablet layout between (min-width: 768px) and (max-width: 1024px)", () => {});
  it.todo("mobile toggle is visible at (max-width: 768px)", ()=> {
    // checks visibility and the icon
  });

  it("renders ThemeToggler in both mobile and desktop layouts", ()=> {
    expect(window.innerWidth).toBeLessThanOrEqual(768);
    // in mobile, the ThemeToggler is on div.nav-drawer-icons
    const navDrawerIcons = wrapper.find('[data-testid="nav-drawer-icons"]')
    const themeTogglerInDrawer = navDrawerIcons.findComponent({ name: "ThemeToggler" });

    expect(themeTogglerInDrawer.exists()).toBe(true);
  });
})

describe("NavBar Drawer", ()=> {
  let wrapper;
  let vAppBar;
  let vNavigationDrawer;

  beforeEach(()=> {
    ({ wrapper, vAppBar, vNavigationDrawer } = setupNavbarTest(768));
  })

  it.todo("opens drawer when mobile toggle is clicked", ()=> {});

  it.todo("closes drawer when mobile toggle is clicked", ()=> {
    // Test to be implemented once the mobile toggler is refactored
  });
  
  it("renders all navigation links in drawer layout at (max-width: 768px)", ()=> {
    expect(window.innerWidth).toBeLessThanOrEqual(768);
    expectNavigationLinks(vNavigationDrawer, expectedTo, expectedText);
  });
})
 
describe("NavBar Shared", ()=> {
  let wrapper;
  let vAppBar;
  let vNavigationDrawer;

  beforeEach(()=> {
    ({ wrapper, vAppBar, vNavigationDrawer } = setupNavbarTest());
  })

  it("renders logo component", ()=> {
    const logo = wrapper.findComponent({ name: "Logo"});
    expect(logo.exists()).toBe(true);
  });

  it("navbar has role='navigation' and aria-label", ()=> {
    expect(vAppBar.attributes("role")).toBe("navigation");
    expect(vAppBar.attributes("aria-label")).toBe("Navegación principal");
  });
})

describe("NavBar Navigation", ()=> {
  it.todo("navigates to correct route when desktop link is clicked", ()=> {});
  it.todo("navigates to correct route and closes drawer when drawer link is clicked", ()=> {});
})


