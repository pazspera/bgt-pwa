import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import type { Component } from "vue";

export function createVuetifyForTest(components: Record<string, Component> = {}) {
  return createVuetify({
    components,
    directives: directives,
    theme: {
      defaultTheme: "darkTheme",
      themes: {
        lightTheme: {
          dark: false,
          colors: {}
        },
        darkTheme: {
          dark: true,
          colors: {}
        }
      }
    }
  })
}