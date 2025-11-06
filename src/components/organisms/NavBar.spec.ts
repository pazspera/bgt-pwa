import { it, describe, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { router } from "../../tests/utils/createRouterMock";
import { nextTick } from "vue";
import { createVuetifyForTest } from "../../tests/utils/createVuetifyForTest";
import { VAppBar, VNavigationDrawer, VBtn, VRow, VContainer, VList, VTooltip } from "vuetify/components";
import NavBar from "./NavBar.vue";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const vuetify = createVuetifyForTest({ VAppBar, VNavigationDrawer, VBtn, VRow, VContainer, VList, VTooltip });
const faBarsText = faBars.iconName;

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
        }
      }
    }
  })
}

const setupNavbarTest = (viewportWidth = 1200) => {
  window.innerWidth = viewportWidth;
  window.dispatchEvent(new Event("resize"));

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

  it.only("shows desktop layout at >= 1025px", async ()=> {
    // checks desktop layout
    expect(window.innerWidth).toBeGreaterThanOrEqual(1025);
    await nextTick();
    // desktopNavLinks should be visible
    // nav-drawer-icons and vNavigationDrawers should not
    const desktopNavLinks = wrapper.find('[data-testid="desktop-nav-links"]');
    const navDrawerIcons = wrapper.find('[data-testid="nav-drawer-icons"]');
    //console.log(navDrawerIcons.html()); 
    console.log(wrapper.html());
    expect(desktopNavLinks.exists()).toBe(true);
    // expect(navDrawerIcons.exists()).toBe(false);
  });
  it.todo("renders all navigation links in desktop layout", ()=> {
    expect(window.innerWidth).toBeGreaterThanOrEqual(1025);

  });
})

describe("NavBar Mobile", ()=> {
  it.todo("shows mobile layout at >= 1025px", ()=> {});
  it.todo("mobile toggle is visible in mobile/tablet < 1025px", ()=> {
    // checks visibility and the icon
  });
})

describe("NavBar Drawer", ()=> {
  it.todo("opens drawer when mobile toggle is clicked", ()=> {});
  it.todo("closes drawer when mobile toggle is clicked", ()=> {});
  it.todo("renders all navigation links in drawer layout", ()=> {});
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

  it("renders ThemeToggler in desktop and mobile", ()=> {
    const themeTogglerInWrapper = wrapper.findComponent({ name: "ThemeToggler"});
    // in mobile, the ThemeToggler is on div.nav-drawer-icons
    const navDrawerIcons = wrapper.find('[data-testid="nav-drawer-icons"]')
    const themeTogglerInDrawer = navDrawerIcons.findComponent({ name: "ThemeToggler" });

    expect(themeTogglerInWrapper.exists()).toBe(true);
    expect(themeTogglerInDrawer.exists()).toBe(true);
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


