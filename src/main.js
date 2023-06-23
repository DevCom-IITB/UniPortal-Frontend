import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "./assets/main.css";

const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

createApp(App).use(router).use(pinia).mount("#app");
