import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import Markdown from "vue3-markdown-it";
import "./assets/main.css";

const pinia = createPinia();

if(import.meta.env.VITE_NODE_ENV != "DEV"){
    console.log = () => {};
}

pinia.use(piniaPluginPersistedState);

createApp(App).use(router).use(pinia).use(Markdown).mount("#app");
