import { it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../../tests/utils/createVuetifyForTest";
import { faDice, faVial } from "@fortawesome/free-solid-svg-icons";
import { NavButton } from "../../../types/navigation";
import BottomNavButton from "./BottomNavButton.vue";
import { VBtn } from "vuetify/components";

const vuetify = createVuetifyForTest({ VBtn });
const faVialText = "fa-vial";

const mountButton = ( props: Partial<NavButton> = {}, shallow = false ) => {
  return mount(BottomNavButton, {
    shallow,
    props: {
      value: props.value ?? "default-value",
      label: props.label ?? "label",
      to: props.to ?? { name: "Boardgames" },
      icon: props.icon ?? faVial
    },
    global: {
      plugins: [vuetify],
    }
  })
}

it.only("renders icon", ()=> {
  const wrapper = mountButton();
  expect(wrapper.html()).toContain(faVialText)
});

it.todo("displays label", ()=> {});
it.todo("receives valid :to route object", ()=> {});
it.todo("receives valid value", ()=> {});
it.todo("displays correct classes when active", ()=> {});

// Later on
// - test accesibility
// - navigation with router-link
// - focus and keyboard navigation
