import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock';
import { config } from '@vue/test-utils';
import { beforeEach, vi } from "vitest";
import { routes as actualRoutes } from "../../router/index.js";

// create one router per test file
const router = createRouterMock({
  initialLocation: { name: "BoardGames" },
  routes: actualRoutes,
});

config.global.stubs.RouterLink = true;
config.global.stubs.RouterView = true;

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)

beforeEach(() => {
  // reset the router state
  router.reset() 

  injectRouterMock(router)
})

export { router };