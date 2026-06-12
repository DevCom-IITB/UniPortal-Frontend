<template>
  <div class="navbar">
    <div class="logo-container">
      <Logo class="asterisk-logo" />
      <div class="logo-text">NewBee</div>
    </div>

    <div class="center-icon">
      <DC class="dc-logo" @click="toDevCom" />
    </div>

    <div class="right-links">
      <button
        type="button"
        class="nav-icon bell-icon"
        :class="{ active: notificationsOpen }"
        @click="$emit('toggleNotifications')"
        aria-label="Open notifications"
      ></button>
      <button
        v-if="isMobile"
        class="mobile-burger-right"
        @click="$emit('toggleDropdown')"
        aria-label="Toggle dropdown menu"
      >
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
      </button>
      <button type="button" class="nav-icon grid-icon" aria-label="Open menu">
        <span v-for="dot in 9" :key="dot"></span>
      </button>
      <div class="user-profile" @click="toggleLogoutMenu">
        <div class="user-avatar"></div>
        <div class="user-info">
          <div class="user-name">{{ displayName }}</div>
          <div class="user-id">{{ displayId }}</div>
        </div>
        <div v-if="showLogoutMenu" class="logout-menu">
          <button type="button" class="logout-button" @click.stop="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DC from "../icons/DC.svg";
import Logo from "../icons/Logo.svg";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Navbar",
  props: {
    notificationsOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggleNotifications", "selected1", "selected2", "selected3", "toggleDropdown"],
  components: {
    DC,
    Logo,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      showLogoutMenu: false,
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    isMobile() {
      return this.windowWidth < 768;
    },
    displayName() {
      return this.authStore.name || "Varada Gajare";
    },
    displayId() {
      return this.authStore.user_ID || "24B3632";
    },
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    toDevCom() {
      window.open("https://devcom.gymkhana.iitb.ac.in/");
    },
    toggleLogoutMenu() {
      this.showLogoutMenu = !this.showLogoutMenu;
    },
    async handleLogout() {
      await this.authStore.Logout();
      this.showLogoutMenu = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 76px;
  padding: 0 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fceeb9;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.mobile-burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.burger-bar {
  width: 100%;
  height: 2.5px;
  background-color: #000000;
  border-radius: 10px;
}

.asterisk-logo {
  width: 26px;
  height: 28px;
  display: block;
}

.logo-text {
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
  font-family: Inter, sans-serif;
  color: #000000;
}

.center-icon {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dc-logo {
  width: 88px;
  height: auto;
  cursor: pointer;
}

.right-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 22px;
  flex: 1;
}

.nav-icon {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.bell-icon::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 5px;
  width: 12px;
  height: 14px;
  border: 2px solid #000000;
  border-bottom: none;
  border-radius: 9px 9px 5px 5px;
}

.bell-icon::after {
  content: "";
  position: absolute;
  left: 9px;
  bottom: 5px;
  width: 8px;
  height: 5px;
  border: 2px solid #000000;
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.bell-icon.active {
  background: #ffdf80;
  border-radius: 9px;
}

.grid-icon {
  display: grid;
  grid-template-columns: repeat(3, 4px);
  grid-template-rows: repeat(3, 4px);
  justify-content: center;
  align-content: center;
  gap: 5px;
}

.grid-icon span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #000000;
}

.user-profile {
  position: relative;
  display: flex;
  align-items: center;
  background: #ffdf80;
  width: 164px;
  height: 46px;
  padding: 5px 10px;
  border-radius: 14px;
  gap: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #cfd3d8;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.user-name {
  font-size: 11px;
  font-weight: 800;
  color: #000000;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-id {
  font-size: 11px;
  line-height: 1.15;
  font-weight: 600;
  color: #000000;
}

.logout-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  min-width: 120px;
  z-index: 100;
}

.logout-button {
  width: 100%;
  border: none;
  background: transparent;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
  border-radius: 4px;
  text-align: left;
  font-family: Inter, sans-serif;
}

.logout-button:hover {
  background: #f0f0f0;
}

@media only screen and (max-width: 750px) {
  .navbar {
    height: 64px;
    padding: 0 12px;
  }

  .logo-text {
    font-size: 18px;
  }

  .asterisk-logo {
    width: 22px;
    height: 24px;
  }

  .center-icon {
    display: none;
  }

  .right-links {
    gap: 12px;
  }

  .grid-icon {
    display: none;
  }

  .user-profile {
    display: none !important;
  }

  .mobile-burger-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 34px;
    height: 28px;
    background: #ffdf80;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    cursor: pointer;
    padding: 7px 6px;
    box-sizing: border-box;
  }

  .mobile-burger-right .burger-bar {
    width: 100%;
    height: 2px;
    background-color: #1c1b1f;
    border-radius: 99px;
  }
}
</style>