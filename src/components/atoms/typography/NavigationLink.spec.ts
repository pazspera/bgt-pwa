import { it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationLink from "./NavigationLink.vue";
import { router } from "../../../tests/utils/createRouterMock";

const mountNavigationLink = (
  props = {}, 
  slots={ default: "Test" }
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

it.todo("displays text", ()=> {});

it.todo("has base css class", ()=> {});

it.todo("receives valid :to route as an object", ()=> {});

it.todo("displays 'aria-current=page' when the current route matches the 'to' prop", ()=> {});

it.todo("doesn't display 'aria-current=page' when the current route doesn't match the 'to' prop", ()=> {});

