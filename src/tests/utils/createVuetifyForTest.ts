import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import type { Component } from "vue";

export function createVuetifyForTest(components: Record<string, Component> = {}) {
  return createVuetify({
    components,
    directives: directives,
  })
}