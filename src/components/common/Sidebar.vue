<template>
  <aside class="sidebar">
    <button v-if="windowWidth < 750" class="burger" type="button" @click="Burger" aria-label="Toggle menu">
      <burger />
    </button>
  
    <div class="sidebar-content" v-if="!showNotifications">
      <section class="welcome-section">
        <Logo class="sidebar-mark" />
        <h1>Welcome to<br />Newbee</h1>
        <p>
          Ask seniors anything before campus starts. Join 5,000+ freshmen getting
          ready for the hive.
        </p>
      </section>

      <section class="quick-links-section" v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)">
        <div class="quick-links-header">
          <open_in_new class="link-icon-header" />
          <span>Quick Links</span>
        </div>
        <button class="link-row" type="button" @click="whatsapp">
          <Globe class="link-icon" />
          <span>Whatsapp Group</span>
        </button>
        <button class="link-row" type="button" @click="smpEmail">
          <email class="link-icon" />
          <span>SMP Email</span>
        </button>
        <button class="link-row" type="button" @click="toSMP">
          <Globe class="link-icon" />
          <span>SMP Website</span>
        </button>
        <button class="link-row" type="button" @click="insta">
          <contact class="link-icon" />
          <span>SMP Instagram</span>
        </button>
      </section>
    </div>

    <div class="notifications-panel" v-else>
      <div class="quick-links-header">
        <span>Notifications</span>
      </div>
      <div v-if="!notifs.length" class="no-notifs">No new notifications</div>
      <div v-else class="notif-list">
        <div v-for="(notif, idx) in notifs" :key="idx" class="notif-item">
          {{ notif.message || notif }}
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import Globe from "../icons/web.svg";
import email from "../icons/email.svg";
import contact from "../icons/Insta.svg";
import burger from "../icons/menu.svg";
import open_in_new from "../icons/open_in_new.svg";
import Logo from "../icons/Logo.svg";

import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";
import { useQuestionStore } from '@/stores/question'

export default {
  name: "Sidebar",
  components: {
    Globe,
    email,
    contact,
    burger,
    open_in_new,
    Logo,
  },
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    const questionStore = useQuestionStore();
    return { authStore, colourStore, questionStore };
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showSidebar: false,
      showNotifications: false,
      notifs: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.loadNotifications();
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async loadNotifications() {
      try {
        // Safe check for store-based endpoint availability
        if (this.questionStore?.fetchNotifs) {
          const res = await this.questionStore.fetchNotifs();
          if (res && res.notifications) {
            this.notifs = [...res.notifications].reverse();
          }
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    },
    async Burger() {
      this.showSidebar = !this.showSidebar;
      this.$emit("Burger", this.showSidebar);
    },
    async Logout() {
      await this.authStore.Logout();
    },
    async toSMP() {
      window.open("https://gymkhana.iitb.ac.in/~smp/");
    },
    async whatsapp() {
      window.open("https://chat.whatsapp.com/");
    },
    async smpEmail() {
      window.open("mailto:smp@iitb.ac.in");
    },
    async insta() {
      window.open("https://www.instagram.com/smp.iitb/");
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  padding: 26px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
  background: #fceeb9;
  color: #000000;
}

.sidebar-content, .notifications-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.sidebar-mark {
  width: 65px;
  height: 70px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.welcome-section h1 {
  margin: 0 0 18px;
  font-size: 32px;
  line-height: 1.06;
  font-weight: 700;
  color: #000000;
  letter-spacing: 0;
}

.welcome-section p {
  margin: 0;
  max-width: 205px;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 400;
  color: #1c1b1f;
}

.quick-links-section {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-bottom: 2px;
}

.quick-links-header {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
  color: #000000;
}

.quick-links-header span {
  font-size: 19px;
  line-height: 1;
  font-weight: 700;
}

.link-icon-header {
  width: 16px;
  height: 16px;
}

.link-row {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0 0 0 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000000;
  cursor: pointer;
  text-align: left;
  font-family: Inter, sans-serif;
}

.link-row span {
  font-size: 12px;
  line-height: 1.25;
  font-weight: 500;
  text-decoration: underline;
}

.link-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.burger {
  position: fixed;
  left: 14px;
  top: 14px;
  z-index: 12;
  border: none;
  background: #ffdf80;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.no-notifs {
  font-size: 13px;
  color: #555;
  margin-top: 10px;
}

.notif-list {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notif-item {
  font-size: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
}

@media only screen and (max-width: 750px) {
  .sidebar {
    width: 70vw;
    height: 100vh;
    border-radius: 0 20px 20px 0;
    padding: 82px 24px 28px;
    box-shadow: 12px 0 28px rgba(0, 0, 0, 0.14);
  }

  .sidebar-mark {
    width: 54px;
    height: 58px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .welcome-section h1 {
    font-size: 29px;
  }
}
</style>