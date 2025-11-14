import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./style.css";
import "vuetify/styles";
import { createVuetify, useTheme } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
/* FontAwesome, only icons to be used */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDice, faUsers, faBoxArchive, faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import VueSweetalert2 from "vue-sweetalert2";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const COLOR = {
  TEXT_DARK: "#2D153D",
  TEXT_LIGHT: "#fcfffe",

  PRIMARY_100: "#EDE2F3",
  PRIMARY_300: "#BD9CD3",
  PRIMARY_400: "#9A67BD",
  PRIMARY_600: "#633183",

  NEUTRAL_200: "#CFDDD5",
  NEUTRAL_800: "#36453D",
  NEUTRAL_900: "#242E28",

  ACCENT_400: "#B5E853",
  ACCENT_600: "#96D71D",

  ERROR_LIGHT: "#881212",
  SUCCESS_LIGHT: "#1B5E20",
  INFO_LIGHT: "#0D47A1",
  WARNING_LIGHT: "#FFC107",
  ERROR_DARK: "#FF8A80",
  SUCCESS_DARK: "#81C784",
  INFO_DARK: "#64B5F6",
  WARNING_DARK: "#FFD740", 
}

const lightTheme = {
  dark: false,
  colors: {
    primary: COLOR.PRIMARY_400,
    secondary: COLOR.ACCENT_400,
    background: COLOR.NEUTRAL_200,
    surface: COLOR.TEXT_LIGHT,
    'on-primary': COLOR.TEXT_DARK,
    'on-secondary': COLOR.TEXT_DARK,
    'on-background': COLOR.TEXT_DARK,
    'on-surface': COLOR.TEXT_DARK,
    error: COLOR.ERROR_LIGHT,
    info: COLOR.INFO_LIGHT,
    success: COLOR.SUCCESS_LIGHT,
    warning: COLOR.WARNING_LIGHT,
    'on-error': COLOR.TEXT_LIGHT,
    'on-info': COLOR.TEXT_LIGHT,
    'on-success': COLOR.TEXT_LIGHT,
    'on-warning': COLOR.TEXT_DARK,
  }
};

const darkTheme = {
  dark: true,
  colors: {
    primary: COLOR.PRIMARY_300,
    secondary: COLOR.ACCENT_600,
    background: COLOR.NEUTRAL_900,
    surface: COLOR.NEUTRAL_800,
    'on-primary': COLOR.TEXT_DARK,
    'on-secondary': COLOR.TEXT_DARK,
    'on-background': COLOR.TEXT_LIGHT,
    'on-surface': COLOR.TEXT_LIGHT,
    error: COLOR.ERROR_DARK,
    info: COLOR.INFO_DARK,
    success: COLOR.SUCCESS_DARK,
    warning: COLOR.WARNING_DARK,
    'on-error': COLOR.TEXT_DARK,
    'on-info': COLOR.TEXT_DARK,
    'on-success': COLOR.TEXT_DARK,
    'on-warning': COLOR.TEXT_DARK,
  }
};

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			fa,
			mdi,
		},
	},
	theme: {
		defaultTheme: "darkTheme",
		themes: {
			darkTheme,
      lightTheme,
		},
	},
});

// Mock API
async function prepareApp() {
  if(import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

let app = createApp(App);

// Font Awesome
library.add(faDice, faUsers, faBoxArchive, faBars, faSun, faMoon);

app.use(vuetify);
app.use(router);
app.use(createPinia());
app.use(VueSweetalert2);
app.component("VueDatePicker", VueDatePicker);
app.component("font-awesome-icon", FontAwesomeIcon);

prepareApp().then(()=> {
  app.mount("#app");
})
