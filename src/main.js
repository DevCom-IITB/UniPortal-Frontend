import { createApp } from "vue";
import App from "./App.vue";
import { createPinia, setActivePinia } from "pinia";
import router from "./router";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import Markdown from "vue3-markdown-it";
import "./assets/main.css";
import { useAuthStore } from "./stores/auth";

const pinia = createPinia();

if(import.meta.env.VITE_NODE_ENV != "DEV"){
        console.log = () => {};
}

pinia.use(piniaPluginPersistedState);

const app = createApp(App).use(router).use(pinia).use(Markdown);

// make pinia active so stores can be used before mounting
setActivePinia(pinia);

// Ensure any existing httpOnly refresh cookie is cleared and client auth state reset
(async () => {
    try {
        await fetch(`${import.meta.env.VITE_API_BASE}/user/logout`, {
            method: "POST",
            credentials: "include", // important so httpOnly cookie is sent and removed
        });
    } catch (e) {
        // ignore network errors
    }
    const auth = useAuthStore();
    if (auth && typeof auth.$reset === "function") {
        auth.$reset();
    } else if (auth) {
        auth.accessToken = "";
        auth.loggedIn = false;
        auth.user_ID = 0;
        auth.role = 0;
        auth.name = "";
    }
    try {
        router.replace("/login");
    } catch (e) {
        // ignore if router not ready
    }
    app.mount("#app");
})();
