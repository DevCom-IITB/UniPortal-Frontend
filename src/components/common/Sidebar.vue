<template>
  <div
    class="sidebar"
    :style="
      windowWidth > 750
        ? { background: colourStore.sidebar, color: colourStore.emphasis_text }
        : showSidebar
        ? { background: colourStore.sidebar }
        : { width: '0px' }
    "
  >
    <div
      class="Logo"
      :style="
        windowWidth < 750
          ? { background: colourStore.primary }
          : { background: colourStore.sidebar }
      "
    >
      <div v-if="windowWidth < 750" class="burger" @click="Burger">
        <burger />
      </div>
      <div class="Logoimg"><Logo /></div>
    </div>

    <div
      class="Info"
      v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)"
    >
      <div class="InfoText">
        Welcome aboard! <br />
        With the all new freshers’ portal clear all your doubts regarding the
        admission process
      </div>

      <div class="InfoLinks">
        <button
          class="btn"
          @mouseover="hovering = 1"
          @mouseleave="hovering = 0"
          :style="
            hovering == 1
              ? {
                  background: colourStore.active_hovering,
                  color: colourStore.emphasis_text,
                }
              : windowWidth > 750
              ? {
                  background: colourStore.sidebar,
                  color: colourStore.emphasis_text,
                }
              : { background: colourStore.sidebar }
          "
        >
          <email />&nbsp;&nbsp;smpcs2023@gmail.com
        </button>

        <button
          class="btn" @click="toSMP"
          @mouseover="hovering = 2"
          @mouseleave="hovering = 0"
          :style="
            hovering == 2
              ? {
                  background: colourStore.active_hovering,
                  color: colourStore.emphasis_text,
                }
              : windowWidth > 750
              ? {
                  background: colourStore.sidebar,
                  color: colourStore.emphasis_text,
                }
              : { background: colourStore.sidebar }
          "
        >
          <Globe />&nbsp;&nbsp;SMP Website
        </button>

        <button
          class="btn" @click="insta"
          @mouseover="hovering = 3"
          @mouseleave="hovering = 0"
          :style="
            hovering == 3
              ? {
                  background: colourStore.active_hovering,
                  color: colourStore.emphasis_text,
                }
              : windowWidth > 750
              ? {
                  background: colourStore.sidebar,
                  color: colourStore.emphasis_text,
                }
              : { background: colourStore.sidebar }
          "
        >
          <contact />&nbsp;&nbsp;smp.iitb
        </button>
      </div>
    </div>
    <div
      class="Creds"
      v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)"
    >
      <button class="credentials" :style="{ background: colourStore.sidebar }">
        <DC class="DevComLogo" @click="toDevCom" /><SMP
          class="SMPLogo"
          @click="toSMP"
        />
      </button>
      <button
        class="logout"
        :style="{
          background: colourStore.sidebar,
          borderColor: colourStore.grey,
          color: colourStore.grey,
        }"
        @click="Logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script>
import Logo from "../icons/Logo.svg";
import Globe from "../icons/globe.svg";
import email from "../icons/email.svg";
import contact from "../icons/contact.svg";
import burger from "../icons/menu.svg";
import DC from "../icons/DC.svg";
import SMP from "../icons/SMP_black.svg";

import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";

export default {
  name: "Sidebar",
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    return { authStore, colourStore };
  },
  components: {
    Logo,
    Globe,
    email,
    contact,
    burger,
    DC,
    SMP,
  },
  data() {
    return {
      hovering: 0,
      windowWidth: window.innerWidth,
      showSidebar: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Burger() {
      this.showSidebar = !this.showSidebar;
      this.$emit("Burger", this.showSidebar);
    },
    async Logout() {
      console.log("logout");
      await this.authStore.Logout();
    },
    async toDevCom() {
      window.open("https://devcom-iitb.org/");
    },
    async toSMP() {
      window.open("https://smp.gymkhana.iitb.ac.in/");
    },
    async insta(){
      window.open("https://www.instagram.com/smp.iitb/")
    }
  },
};
</script>

<style scoped>
.sidebar {
  width: 92.38%;
  margin-top: 4.12%;
  margin-left: 4.12%;
  margin-bottom: 4.12%;
  padding-top: 5%;
  padding-bottom: 5%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.Logo {
  height: 12.98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.burger {
  position: fixed;
  left: 16px;
  margin-top: 8px;
}

.Logoimg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Info {
  width: 87.63%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 16px 0px;
}

.InfoText {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15%;
}

.InfoLinks {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding-left: 7%;
  margin: 8px 0px;
  cursor: pointer;
}

.Creds {
  width: 87.63%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.credentials {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: none;
}

.DevComLogo {
  cursor: pointer;
}

.SMPLogo {
  cursor: pointer;
}

.logout {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding-left: 7%;
  margin: 8px 0px;
  cursor: pointer;
  border: 1px solid;
}

@media only screen and (max-width: 1150px) {
  .InfoText {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 50px;
  }

  .btn {
    font-size: 14px;
  }

  .btn-1 {
    font-size: 14px;
  }
}

@media only screen and (max-width: 950px) {
  .InfoText {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 50px;
  }

  .btn {
    font-size: 12px;
  }

  .btn-1 {
    font-size: 12px;
  }
}

@media only screen and (max-width: 750px) {
  .sidebar {
    width: 70%;
    margin-top: 0px;
    border-radius: 0%;
    align-items: start;
  }

  .Logo {
    height: 80px;
    padding-top: 0%;
    width: 100vw;
  }

  .Info {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .InfoText {
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
  }

  .Creds {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .btn-1 {
    justify-content: center;
    font-size: 16px;
  }
}
</style>
