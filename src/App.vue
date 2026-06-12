<template>
  <div class="app-layout" v-if="Auth.loggedIn">
    <div class="TopBar">
      <Navbar
        :notificationsOpen="showNotifications"
        @selected1="ColorInfoPost"
        @selected2="ColorQuestions"
        @selected3="ColorMyQuestions"
        @toggleNotifications="toggleNotifications"
        @toggleSidebar="showSidebar = !showSidebar"
        @toggleDropdown="showDropdown = !showDropdown"
      />
      <!-- Mobile Dropdown Menu -->
      <transition name="dropdown-fade">
        <div v-if="showDropdown && windowWidth < 750" class="mobile-dropdown-menu">
          <button class="dropdown-item translate-item" type="button" @click="triggerHindiTranslationAndClose">
            <svg class="dropdown-icon translation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="dropdown-text translation-text">हिन्दी</span>
          </button>
          
          <div class="dropdown-header">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span class="dropdown-header-text">Quick Links</span>
          </div>
          
          <button class="dropdown-item link-item" type="button" @click="whatsapp">
            <svg class="dropdown-icon whatsapp" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span class="dropdown-text">Whatsapp Group</span>
          </button>
          
          <button class="dropdown-item link-item" type="button" @click="smpEmail">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span class="dropdown-text">SMP Email</span>
          </button>
          
          <button class="dropdown-item link-item" type="button" @click="toSMP">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span class="dropdown-text">SMP Wesbite</span>
          </button>
          
          <button class="dropdown-item link-item" type="button" @click="insta">
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span class="dropdown-text">SMP Instagram</span>
          </button>
          
          <button class="dropdown-item logout-item" type="button" @click="handleLogoutAndClose">
            <svg class="dropdown-icon logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span class="dropdown-text">Logout</span>
          </button>
        </div>
      </transition>
    </div>
    <div class="main-body">
      <div class="Sidebar" :class="{ 'hidden': windowWidth < 750 && !showSidebar }">
        <Sidebar
          @Burger="Burger"
        />
      </div>
      <div
        class="Content"
        :style="windowWidth < 750 ? { width: '100vw' } : {}"
      >
        <div class="content-actions desktop-only" v-if="Auth.role != 6311">
          <button class="language-button notranslate" type="button" @click="triggerHindiTranslation">
            {{ isCurrentlyHindi ? 'Eng' : 'Hindi' }}
          </button>
          <button class="ask-button" type="button" @click="postInfoQues">
            <span class="ask-button-icon">?</span>
            <span>{{ actionLabel }}</span>
          </button>
        </div>
        
        <!-- Mobile Floating Action Button (FAB) -->
        <button
          v-if="windowWidth < 750 && Auth.role != 6311"
          class="mobile-fab"
          type="button"
          @click="postInfoQues"
        >
          <span class="fab-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </span>
          <span>{{ actionLabel }}</span>
        </button>
        <div class="RouterView">
          <router-view
            @comment="ask"
            @askView="ColorQuestionView"
            @expand="ExpandImage"
            @edit="EditInfo"
          ></router-view>
        </div>

        <div class="snackbar" v-if="isSnackbarVisible" :key="snackbarKey">
            <Snackbar /> 
        </div>

        <section v-if="showNotifications" class="notification-panel" aria-label="Notifications">
          <h2>Notifications</h2>
          <article
            v-for="item in notificationItems"
            :key="item.id"
            class="notification-card"
          >
            <p class="notification-kicker">{{ item.kicker }}</p>
            <h3>{{ item.title }}</h3>
            <p class="notification-body">{{ item.body }}</p>
            <span class="notification-time">{{ item.time }}</span>
          </article>
        </section>
        <div class="ask" v-if="askQuestion">
          <askBox
            :askQuestion="askQuestion"
            @discard="ask"
            @OnSubmit="ask"
            :editBody="editBody"
            :editTitle="editTitle"
          />
        </div>
        <div class="ExpandedImg" v-if="expanded">
          <div class="cancel" @click="CloseImg"></div>
          <img :src="QuestionStore.ImageLink" alt="" />
        </div>
      </div>
      <div
        class="glass"
        v-if="askQuestion == true || glass == true"
        @click="glassClick"
        :style="
          windowWidth <= 750
            ? { background: ColourStore.background }
            : { background: 'rgba(0, 0, 0, 0.5)' }
        "
      ></div>
    </div>
  </div>
  <div class="login" v-if="!Auth.loggedIn">
    <DC class="DC" @click="toDevCom"/>
    <SMP class="SMP" @click="toSMP"/>
    <login_background class="login-background" />
    <div class="login-form">
      <Login :loggedIn="loggedIn" @loggedIn="Login" />
    </div>
    <div class="snackbar" v-if="isSnackbarVisible" :key="snackbarKey">
          <Snackbar /> 
    </div>
  </div>
</template>

<script>
import Navbar from "./components/common/Navbar.vue";
import Sidebar from "./components/common/Sidebar.vue";
import askBox from "./components/common/askBox.vue";
import Snackbar from "./components/common/snackbar.vue";
import login_background from "./components/background_images/Group 9.svg";
import Login from "./components/common/Login.vue";
import DC from "./components/icons/DC.svg";
import SMP from "./components/icons/SMP_black.svg";

import { useAuthStore } from "./stores/auth";
import { useQuestionStore } from "./stores/question";
import { useColourStore } from "./stores/colour";
import { useListStore } from "./stores/list";


export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    askBox,
    login_background,
    Login,
    Snackbar,
    DC,
    SMP,
  },
  data() {
    return {
      askQuestion: false,
      windowWidth: window.innerWidth,
      showSidebar: false,
      showDropdown: false,
      accessToken: "",
      glass: false,
      expanded: false,
      editBody: "",
      editTitle: "",
      showNotifications: false,
      isCurrentlyHindi: false, 
      localSnackbarOverride: false,
      snackbarKey: 0,
      observer: null
    };
  },
  computed: {
    isSnackbarVisible() {
      if (this.localSnackbarOverride) return false;
      return this.QuestionStore.showSnackbar === true;
    },
    actionLabel() {
      return this.Auth.role == 5980 ? "Create Announcement" : "Ask question";
    },
    notificationItems() {
      const items = Array.isArray(this.ListStore.list) ? this.ListStore.list : [];
      const fallbackTitle = "What are the best electives for first-year CS students?";
      const fallbackBody =
        "The answer will be here. The answer will be here. The answer will be here. The answer will be here. The answer will be here.";
      const candidates = items.filter((item) => item && item.body).slice(0, 2);

      if (!candidates.length) {
        return [1, 2].map((id) => ({
          id,
          kicker: "Your question was answered by ISMP Priya",
          title: fallbackTitle,
          body: fallbackBody,
          time: "12 May 26 07:45pm",
        }));
      }

      return candidates.map((item, index) => ({
        id: item._id || item.id || index,
        kicker: "Your question was answered by ISMP Priya",
        title: item.title || item.body || fallbackTitle,
        body:
          item.answers && item.answers.length
            ? item.answers[0].body || fallbackBody
            : fallbackBody,
        time: this.formatShortDate(item.asked_At),
      }));
    },
  },
  
  watch: {
    "QuestionStore.showSnackbar"(newValue) {
      if (newValue === true) {
        this.localSnackbarOverride = false;
        
        setTimeout(() => {
          this.QuestionStore.showSnackbar = false;
          if (typeof this.QuestionStore.SetSnackbar === "function") this.QuestionStore.SetSnackbar(false);
          if (typeof this.QuestionStore.setSnackbar === "function") this.QuestionStore.setSnackbar(false);
          
          this.localSnackbarOverride = true;
          this.snackbarKey += 1; 
        }, 3000);
      } else {
        this.localSnackbarOverride = false;
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.checkGoogleTranslateState();
    });

    this.observer = new MutationObserver(() => {
      this.checkGoogleTranslateState();
    });
    this.observer.observe(document.documentElement, { attributes: true });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    checkGoogleTranslateState() {
      const htmlEl = document.documentElement;
      const hasTranslatedClass = htmlEl.classList.contains('translated-ltr') || htmlEl.classList.contains('translated-rtl');
      const isHindiLang = htmlEl.getAttribute('lang') === 'hi';
      
      const selectElement = document.querySelector('.goog-te-combo');
      const selectIsHindi = selectElement && selectElement.value === 'hi';

      this.isCurrentlyHindi = !!(hasTranslatedClass || isHindiLang || selectIsHindi);
    },

    async OnSubmit() {
      this.askQuestion = false;
    },

    async ask() {
      console.log("Ask toggled, current state:", this.askQuestion);
      this.askQuestion = !this.askQuestion;
    },
    
    // FIXED: Uses native restore widget handlers & cookie resets to cleanly skip the middle step entirely
    triggerHindiTranslation() {
      this.checkGoogleTranslateState();

      if (this.isCurrentlyHindi) {
        // Alternative approach: Find Google's native 'Show Original' skip button in its iframe wrappers
        const restoreButton = document.querySelector('.goog-te-banner-frame')?.contentWindow?.document?.querySelector('.goog-te-button button');
        
        if (restoreButton) {
          restoreButton.click();
        } else {
          // If the button is inaccessible inside the iframe cross-origin context, clear the cookie and refresh to guarantee baseline state
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.hostname;
          location.reload();
          return;
        }
      } else {
        // Forward translation: Directly target the dropdown combo box
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
          selectElement.value = 'hi';
          selectElement.dispatchEvent(new Event('change'));
        } else {
          console.warn("Google Translate combo element missing.");
        }
      }

      this.isCurrentlyHindi = !this.isCurrentlyHindi;
    },
    triggerHindiTranslationAndClose() {
      this.triggerHindiTranslation();
      this.showDropdown = false;
    },
    whatsapp() {
      window.open("https://chat.whatsapp.com/", "_blank");
      this.showDropdown = false;
    },
    smpEmail() {
      window.open("mailto:smp@iitb.ac.in");
      this.showDropdown = false;
    },
    toSMP() {
      window.open("https://gymkhana.iitb.ac.in/~smp/", "_blank");
      this.showDropdown = false;
    },
    insta() {
      window.open("https://www.instagram.com/smp.iitb/", "_blank");
      this.showDropdown = false;
    },
    async handleLogoutAndClose() {
      await this.Auth.Logout();
      this.showDropdown = false;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
    },
    async Burger(value) {
      this.showSidebar = value;
      console.log(this.showSidebar);
    },
    async ColorInfoPost() {
      await this.ColourStore.colourInfopost();
    },
    async ColorQuestions() {
      await this.ColourStore.colourQuestions();
    },
    async ColorMyQuestions() {
      await this.ColourStore.colourMyQuestions();
    },
    async ColorQuestionView() {
      await this.ColourStore.colourQuestionView();
    },
    async postInfoQues() {
      console.log("Post button clicked, role:", this.Auth.role);
      this.QuestionStore.SetAddImage(true);
      if (this.Auth.role == 5980 || this.Auth.role == 6311) {
        await this.ask();
        await this.QuestionStore.SetAction(5);
      } else {
        await this.ask();
        await this.QuestionStore.SetAction(4);
      }
    },
    async ExpandImage() {
      this.glass = true;
      this.expanded = true;
    },
    async CloseImg() {
      this.glass = false;
      this.expanded = false;
    },
    async glassClick() {
      this.glass = false;
      this.askQuestion = false;
      this.expanded = false;
    },
    async EditInfo(infopost) {
      this.askQuestion = true;
      console.log("editing infopost:", infopost);
      if (infopost && typeof infopost === "object") {
        this.editBody = infopost.body || "";
        this.editTitle = infopost.title || "";
      } else {
        this.editBody = infopost || "";
        this.editTitle = "";
      }
    },
    async EditAnswer(body) {
      this.askQuestion = true;
      console.log("body:", body);
      this.editBody = body;
    },
    async toDevCom() {
      window.open("https://devcom.gymkhana.iitb.ac.in/");
    },
    async toSMP() {
      window.open("https://smp.gymkhana.iitb.ac.in/");
    },
    formatShortDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "12 May 26 07:45pm";
      }
      return date
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "")
        .replace(" am", "am")
        .replace(" pm", "pm");
    },
  },
  setup() {
    const Auth = useAuthStore();
    const QuestionStore = useQuestionStore();
    const ColourStore = useColourStore();
    const ListStore = useListStore();

    return {
      Auth,
      QuestionStore,
      ColourStore,
      ListStore,
    };
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  overflow: hidden;
}

.TopBar {
  width: 100%;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 6;
}

.main-body {
  display: flex;
  flex: 1;
  width: 100%;
  height: calc(100vh - 76px);
  min-height: 0;
}

.Sidebar {
  width: 280px;
  min-width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 24px 20px 16px;
}

.Sidebar.hidden {
  display: none;
}

.Content {
  height: 100%;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 28px 20px 0 12px;
  overflow-y: auto;
  position: relative;
}

.RouterView {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
}

.snackbar {
  z-index: 5;
  bottom: 40px;
  max-width: 66.58%;
  position: absolute;
}

.content-actions {
  position: absolute;
  top: 24px;
  right: 20px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-button,
.ask-button {
  border: none;
  background: #ffdf80;
  color: #111111;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-weight: 700;
  box-shadow: none;
}

.language-button {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  font-size: 15px;
}

.ask-button {
  height: 58px;
  min-width: 174px;
  border-radius: 34px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
}

.ask-button-icon {
  width: 26px;
  height: 26px;
  border: 2px solid #111111;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  line-height: 1;
  font-weight: 800;
}

.notification-panel {
  position: fixed;
  top: 96px;
  right: 20px;
  width: min(500px, calc(100vw - 40px));
  max-height: calc(100vh - 120px);
  overflow: auto;
  z-index: 9;
  background: #ffffff;
  border-radius: 0 28px 28px 28px;
  padding: 10px 14px 18px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
}

.notification-panel h2 {
  margin: 0 0 10px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  color: #1c1b1f;
}

.notification-card {
  background: #ededed;
  border-radius: 12px;
  padding: 14px 16px 12px;
  margin-bottom: 14px;
}

.notification-card:last-child {
  margin-bottom: 0;
}

.notification-kicker {
  margin: 0 0 5px;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 500;
  color: #1c1b1f;
}

.notification-card h3 {
  margin: 0 0 4px;
  font-size: 17px;
  line-height: 1.2;
  font-weight: 700;
  color: #1c1b1f;
}

.notification-body {
  margin: 0 0 8px;
  font-size: 12px;
  line-height: 1.18;
  font-weight: 400;
  color: #1c1b1f;
}

.notification-time {
  display: block;
  font-size: 11px;
  line-height: 1;
  font-weight: 400;
  color: #555555;
}

.ask {
  position: fixed;
  width: min(990px, calc(100vw - 220px));
  min-height: 572px;
  top: 102px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: white;
  border-radius: 28px;
  padding: 42px;
}

.glass {
  position: fixed;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 8;
}

.ExpandedImg {
  position: fixed;
  background: white;
  height: 400px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-start;
}

.cancel {
  position: fixed;
  z-index: 1;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: #60b926;
  margin-top: 15px;
  margin-right: 15px;
}

.cancel:hover {
  background: #ff7c7c;
}

.ExpandedImg img {
  height: 100%;
  object-fit: cover;
}

.login {
  width: 100vw;
  height: 100vh;
  background: #fff9e5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-background {
  position: fixed;
}

.DC {
  left: 10px;
  top: 0px;
  z-index: 1;
  position: fixed;
}

.SMP {
  right: 30px;
  top: 20px;
  z-index: 1;
  position: fixed;
}

.login-form {
  background: #fff;
  border-radius: 24px;
  width: 38vw;
  height: 85vh;
  box-shadow: 20px 20px 60px #d9d4c3, -20px -20px 60px #fff9e5;
  z-index: 1;
  padding: 24px 24px;
}

@media only screen and (max-width: 950px) {
  .ExpandedImg {
    height: 300px;
  }
}

@media only screen and (max-width: 750px) {
  .desktop-only {
    display: none !important;
  }

  .TopBar {
    height: 64px;
  }

  .main-body {
    height: calc(100vh - 64px);
  }

  .Sidebar {
    display: none !important;
  }

  .Content {
    height: 100%;
    padding: 18px 12px 0;
  }

  .RouterView {
    width: 100%;
  }

  .mobile-fab {
    position: fixed;
    bottom: 20px;
    right: 18px;
    z-index: 99;
    height: 64px;
    border-radius: 32px;
    background: #ffdf80; /* golden yellow */
    border: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    gap: 10px;
    color: #1c1b1f;
    font-family: Inter, sans-serif;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .mobile-fab:active {
    transform: scale(0.96);
  }

  .fab-icon {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .fab-icon svg {
    width: 20px;
    height: 20px;
  }

  .mobile-dropdown-menu {
    position: absolute;
    top: 68px;
    right: 12px;
    background: #fff0c2; /* light yellow matching header */
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    padding: 18px;
    width: 190px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 200;
  }

  .dropdown-item {
    border: none;
    background: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1c1b1f;
    cursor: pointer;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
  }

  .dropdown-item.link-item span {
    text-decoration: underline;
  }

  .dropdown-header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1c1b1f;
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 800;
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    padding-top: 12px;
  }

  .dropdown-item.logout-item {
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    padding-top: 12px;
  }

  .dropdown-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #1c1b1f;
  }

  .dropdown-icon.whatsapp {
    color: #1c1b1f;
  }

  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .snackbar {
    max-width: 95vw;
  }
  
  .content-actions {
    position: static;
    align-self: flex-end;
    margin-bottom: 14px;
  }

  .language-button {
    width: 46px;
    height: 46px;
    font-size: 13px;
  }

  .ask-button {
    min-width: 142px;
    height: 46px;
    padding: 0 16px;
    font-size: 14px;
  }

  .ask-button-icon {
    width: 22px;
    height: 22px;
    border-radius: 7px;
    font-size: 14px;
  }

  .notification-panel {
    top: 72px;
    right: 12px;
    left: 12px;
    width: auto;
    border-radius: 22px;
  }

  .notification-panel h2 {
    font-size: 24px;
  }

  .ask {
    width: calc(100vw - 24px);
    min-height: auto;
    max-height: calc(100vh - 88px);
    overflow-y: auto;
    top: 76px;
    padding: 28px 22px;
    border-radius: 24px;
  }

  .ExpandedImg {
    height: 200px;
  }

  .login-form {
    width: 95vw;
    height: 95vh;
  }
}
</style>

<style>
/* Global rules to cleanly hide the Google Translate widget header elements */
.goog-te-banner-frame,
iframe.goog-te-banner-frame,
.goog-te-menu-value,
#goog-gt-tt,
.skiptranslate,
iframe[id*=":1.container"],
iframe[id*=":2.container"] {
  display: none !important;
  visibility: hidden !important;
}

body {
  top: 0 !important;
  position: static !important;
}
</style>