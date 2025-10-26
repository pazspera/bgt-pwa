import { it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../../tests/utils/createVuetifyForTest";
import { faVial } from "@fortawesome/free-solid-svg-icons";
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
    },
    stubs: {
      "v-btn": {
        // $attrs is necessary so all attributes from v-btn pass to the stub
        template: '<div v-bind:"$attrs"></slot></div>'
      }
    }
  })
}

it("renders icon", ()=> {
  const wrapper = mountButton();
  expect(wrapper.html()).toContain(faVialText);
});

it("displays label", ()=> {
  const wrapper = mountButton();
  expect(wrapper.text()).toContain("label");
});

it("receives valid :to route as object and passes it to v-btn", ()=> {
  const objectRoute = { name: "EditPlayer", params: { id: 36 }}; 

  const wrapperObject = mountButton({ to: objectRoute });

  // need to access the v-btn inside the wrapper to check that
  // the prop is being passed down correctly to the child
  const vBtnObject = wrapperObject.getComponent({ name: "v-btn" });

  expect(vBtnObject.props("to")).toEqual(objectRoute);
});

it.only("receives valid value", ()=> {
  const testValue = "test-value";
  // can be tested using shallowMount
  const wrapper = mountButton({ value: testValue }, true );
  expect(wrapper.html()).toContain(testValue);
});

it.todo("displays correct classes when active", ()=> {});

// Later on
// - test accesibility
// - navigation with router-link
// - focus and keyboard navigation
