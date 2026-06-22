import { defineStore } from "pinia";
import { useQuestionStore } from "./question";
import { useColourStore } from "./colour";
const SMP_KEY = import.meta.env.VITE_SMP_ACCESS_KEY;

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => ({
    accessToken: "",
    loggedIn: true,
    user_ID: 0,
    role: 0,
    name: "",
    vite_base: import.meta.env.VITE_BASE,
  }),
  persist: true,
  actions: {
    async Login(uid, password, sso) {
      const questionStore = useQuestionStore();
      const colourStore = useColourStore();
      let res; // We will store the fetch response here for both paths

      if (sso) {
        console.log("login with sso");
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");
        console.log(authorizationCode);

        // Make ONE request to the securely updated backend route
        res = await fetch(`${import.meta.env.VITE_API_BASE}/user/smplogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authCode: authorizationCode }),
        });

      } else {
        console.log("normal login");
        const info = {
          user_ID: uid,
          password: password,
        };

        // Make standard login request
        res = await fetch(`${import.meta.env.VITE_API_BASE}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
      }

      // Handle the response identically for both SSO and Normal Login
      if (res.status === 200) {
        const data = await res.json();
        console.log("data :", data);
        
        this.accessToken = data.accessToken; // Now the backend actually sends this!
        this.loggedIn = true;
        this.user_ID = data.user_ID || uid; 
        this.name = data.name;
        this.role = data.role;
        
        console.log("logged in as :", this.loggedIn);
        console.log("user id :", this.user_ID);
        console.log("role :", this.role);
        
        // Redirect to dashboard
        window.location.href = import.meta.env.VITE_BASE + "/";
      } else {
        console.log("Login failed");
        const data = await res.json();
        console.log("data :", data);
        
        await questionStore.SetShowSnackBar(true);
        await questionStore.SetSnackMessage(data.message || "Invalid Credentials");
        await colourStore.SetSnackColor(false);
      }
    },
    async Refresh() {
      const questionStore = useQuestionStore();
      const colourStore = useColourStore();
      console.log("We entered the refresh function in auth.js");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/user/refresh`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data :", data);

      if (res.status == 200) {
        this.accessToken = data["accessToken"];
        console.log("new access token: " + this.accessToken);
        this.loggedIn = true;
        this.user_ID = data["user_ID"];
        this.role = data["role"];
        this.name = data["name"];
      } else {
        await questionStore.SetShowSnackBar(true);
        await questionStore.SetSnackMessage(data.message);
        await colourStore.SetSnackColor(false);
        this.loggedIn = false;
      }
    },
    async Logout() {
      const questionStore = useQuestionStore();
      const colourStore = useColourStore();
      console.log("logging out");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res :", res);



      if (res.status == 200) {
        console.log("logged out");
        this.accessToken = "";
        this.loggedIn = false;
      } else {
        this.accessToken = "";
        this.loggedIn = false;
        await questionStore.SetShowSnackBar(true);
        await questionStore.SetSnackMessage('cookie was not found');
        await colourStore.SetSnackColor(false);
        console.log("logged in as :", this.loggedIn);
      }
    },
  },
});
