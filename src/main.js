import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./style.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
/* FontAwesome, only icons to be used */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDice, faUsers, faBoxArchive, faBars } from "@fortawesome/free-solid-svg-icons";

// Bootstrap removed: using Vuetify components for layout instead

import VueSweetalert2 from "vue-sweetalert2";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const customTheme = {
	dark: false,
	colors: {
		background: "#E8EDEB",
		surface: "#E8EDEB",
		primary: "#9A67BD",
		"primary-300": "#C7AADA",
		"primary-darken-1": "#633880",
		secondary: "#8FA79B",
		"secondary-darken-1": "#292929",
		"neutral-800": "#292929",
		darkBG: "#6E3E8E",
		white: "#ffffff",
		error: "#DD1C1A",
		info: "#FFD23F",
		success: "#43AA8B",
		warning: "#FFD23F",
	},
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
		defaultTheme: "customTheme",
		themes: {
			customTheme,
		},
	},
});

let app = createApp(App);

// Font Awesome
library.add(faDice, faUsers, faBoxArchive, faBars);

app.use(vuetify);
app.use(router);
app.use(createPinia());
app.use(VueSweetalert2);
app.component("VueDatePicker", VueDatePicker);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
