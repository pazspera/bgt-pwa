import { it, describe, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { router } from "../../tests/utils/createRouterMock";
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

describe("NavBar Desktop", ()=> {
  let wrapper;
  let vAppBar;
  let vNavigationDrawer;

  beforeEach(()=> {
    wrapper = mountNavbar();
    vAppBar = wrapper.find('[data-test="v-app-bar-stub"]');
    vNavigationDrawer = wrapper.find('[data-test="v-navigation-drawer"]');
  })

  it.only("desktop links are visible in desktop >= 1025px", ()=> {
    console.log("wrapper", wrapper.html());
    console.log("vAppBar", vAppBar.html());
    console.log("vNavigationDrawer", vNavigationDrawer.html());
  });
  it.todo("shows desktop layout at >= 1025px", ()=> {});
  it.todo("renders all navigation links in desktop layout", ()=> {});
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
  it.todo("renders logo component", ()=> {});
  it.todo("renders ThemeToggler in desktop and mobile", ()=> {});
  it.todo("navbar has role='navigation' and aria-label", ()=> {});
})

describe("NavBar Navigation", ()=> {
  it.todo("navigates to correct route when desktop link is clicked", ()=> {});
  it.todo("navigates to correct route and closes drawer when drawer link is clicked", ()=> {});
})


it.todo("", ()=> {});

