import { it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetifyForTest } from "../../../tests/utils/createVuetifyForTest";
import { faVial } from "@fortawesome/free-solid-svg-icons";
import { NavButton } from "../../../types/navigation";
import BottomNavButton from "./BottomNavButton.vue";
import { VBtn } from "vuetify/components";

const vuetify = createVuetifyForTest({ VBtn });
const faVialText = faVial.iconName;

const mountButton = ( props: Partial<NavButton> = {}) => {
  return mount(BottomNavButton, {
    props: {
      value: props.value ?? "default-value",
      label: props.label ?? "label",
      to: props.to ?? { name: "BoardGames" },
      icon: props.icon ?? faVial
    },
    global: {
      plugins: [vuetify],
      stubs: {
        "v-btn": {
          // $attrs is necessary so all attributes from v-btn pass to the stub
          template: '<div data-test="v-btn-stub" v-bind="$attrs"><slot/></div>'
        }
      }
    },
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
  const expectedToString = JSON.stringify(objectRoute);

  const wrapper = mountButton({ to: objectRoute });

  // need to access the v-btn inside the wrapper to check that
  // the prop is being passed down correctly to the child
  // however, now the v-btn is a stub, so we need to look for it instead
  // of the v-btn component
  const vBtnStub = wrapper.find('[data-test="v-btn-stub"]');

  // checks that the attribute "to" exists and it contains "[object Object]"
  // now the route is the object, it was easier when it was a string but
  // the router had to be changed to only receive an object
  expect(vBtnStub.attributes("to")).toBeDefined();
  expect(vBtnStub.attributes("to")).toContain("[object Object]");

  // checks that the parent (BottomNavButton) receives and has the route object
  // the test is fine because the parent doesn't modify the object, just passes it
  expect(wrapper.props("to")).toEqual(objectRoute);
});

it("receives valid value", ()=> {
  const testValue = "test-value";
  // can be tested using shallowMount
  const wrapper = mountButton({ value: testValue } );
  expect(wrapper.html()).toContain(testValue);
});

it.todo("displays correct classes when active", ()=> {});

// Later on
// - test accesibility
// - navigation with router-link
// - focus and keyboard navigation
