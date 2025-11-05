import { it, describe } from "vitest";
import { mount } from "@vue/test-utils";
import { router } from "../../tests/utils/createRouterMock";
import NavBar from "./NavBar.vue";

describe("NavBar Desktop", ()=> {
  it.todo("desktop links are visible in desktop >= 1025px", ()=> {});
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

