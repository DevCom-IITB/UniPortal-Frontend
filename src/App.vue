<template>
  <div class="app-layout" v-if="Auth.loggedIn">
    <div class="TopBar">
      <Navbar
        :notificationsOpen="showNotifications"
        @selected1="ColorInfoPost"
        @selected2="ColorQuestions"
        @selected3="ColorMyQuestions"
        @toggleNotifications="toggleNotifications"
      />
    </div>
    <div class="main-body">
      <div class="Sidebar">
        <Sidebar
          @Burger="Burger"
          :style="
            !showSidebar && windowWidth < 750
              ? { width: '0vw' }
              : { width: '70vw' }
          "
        />
      </div>
      <div
        class="Content"
        :style="windowWidth < 750 ? { width: '100vw' } : {}"
      >
        <div class="content-actions" v-if="Auth.role != 6311">
          <button class="language-button" type="button" @click="toggleHindi">हिन्दी</button>
          <button class="ask-button" type="button" @click="postInfoQues">
            <span class="ask-button-icon">?</span>
            <span>{{ actionLabel }}</span>
          </button>
        </div>
        <div class="RouterView">
          <router-view
            @comment="ask"
            @askView="ColorQuestionView"
            @expand="ExpandImage"
            @edit="EditInfo"
          ></router-view>
        </div>
        <div class="snackbar"
          v-if="QuestionStore.showSnackbar == true">
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
        <div class="ask" v-if="askQuestion == true">
          <askBox
            :askQuestion="askQuestion"
            @discard="ask"
            @OnSubmit="ask"
            :editBody="editBody"
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
    <div class="snackbar"
        v-if="QuestionStore.showSnackbar == true">
          <Snackbar />
    </div>
  </div>

  <!-- Hidden Google Translate Element -->
  <div id="google_translate_element" style="display: none;"></div>

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
      accessToken: "",
      glass: false,
      expanded: false,
      editBody: "",
      showNotifications: false,
      isHindi: false,
    };
  },
  computed: {
    actionLabel() {
      return this.Auth.role == 5980 ? "Post Infopost" : "Ask question";
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
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    async OnSubmit() {
      this.askQuestion = false;
    },

    async ask() {
      this.askQuestion = !this.askQuestion;
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
    async EditInfo(body) {
      this.askQuestion = true;
      console.log("body:", body);
      this.editBody = body;
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
    toggleHindi() {
      this.isHindi = !this.isHindi;
      if (this.isHindi) {
        // Load Google Translate Element
        if (!document.getElementById('google_translate_element')) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.id = 'google_translate_script';
          document.head.appendChild(script);

          // Initialize Google Translate
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'hi',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
            
            // Trigger translation to Hindi
            setTimeout(() => {
              const selectElement = document.querySelector('.goog-te-combo');
              if (selectElement) {
                selectElement.value = 'hi';
                selectElement.dispatchEvent(new Event('change'));
              }
            }, 500);
          };
        } else {
          // If script already loaded, just change language
          const selectElement = document.querySelector('.goog-te-combo');
          if (selectElement) {
            selectElement.value = 'hi';
            selectElement.dispatchEvent(new Event('change'));
          }
        }
      } else {
        // Revert to English
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
          selectElement.value = 'en';
          selectElement.dispatchEvent(new Event('change'));
        }
      }
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
  .TopBar {
    height: 64px;
  }

  .main-body {
    height: calc(100vh - 64px);
  }

  .Sidebar {
    height: 100vh;
    z-index: 2;
    position: fixed;
    justify-content: start;
    padding: 0;
  }

  .Content {
    height: 100%;
    padding: 18px 12px 0;
  }

  .RouterView {
    width: 100%;
  }

  .Sidebar {
    width: 0px;
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
