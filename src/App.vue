<template>
  <!-- Mentor routes get their own layout — skip student wrapper -->
  <router-view v-if="isMentorRoute" />

  <div class="container" v-else-if="Auth.loggedIn">
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
      :style="windowWidth < 750 ? { width: '100vw' } : { width: '78.55vw' }"
    >
      <div class="Navbar">
        <Navbar
          @selected1="ColorInfoPost"
          @selected2="ColorQuestions"
          @selected3="ColorMyQuestions"
          :grey="grey"
          :unselected="unselected"
          :primary="primary"
          :emphasisText="emphasisText"
        />
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
      <div
        class="popup"
        @click="postInfoQues"
        v-if="ColourStore.askPopup && Auth.role != 6311"
      >
        <popup :lightText="lightText" />
      </div>
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
  <div class="login" v-else>
    <SMP class="SMP" @click="toSMP"/>
    <DC class="DC" @click="toDevCom"/>
    <div class="login-shell">
      <section class="login-visual">
        <button class="login-arrow" type="button" aria-label="Previous slide" @click="prevLoginSlide">&lsaquo;</button>
        <div class="login-visual__content">
          <h1>{{ loginSlides[activeLoginSlide].title }}</h1>
          <p>{{ loginSlides[activeLoginSlide].subtitle }}</p>
          <img class="login-visual__art" :src="loginSlides[activeLoginSlide].image" alt="" />
          <div class="login-dots" aria-hidden="true">
            <button
              v-for="(_, index) in loginSlides"
              :key="index"
              class="login-dot"
              :class="{ 'login-dot--active': activeLoginSlide === index }"
              type="button"
              @click="activeLoginSlide = index"
            ></button>
          </div>
        </div>
        <button class="login-arrow" type="button" aria-label="Next slide" @click="nextLoginSlide">&rsaquo;</button>
      </section>
      <div class="login-form">
        <Login :loggedIn="loggedIn" @loggedIn="Login" />
      </div>
    </div>
    <div class="snackbar"
        v-if="QuestionStore.showSnackbar == true">
          <Snackbar /> 
    </div>
  </div>
</template>

<script>
import Navbar from "./components/common/Navbar.vue";
import Sidebar from "./components/common/Sidebar.vue";
import popup from "./components/common/popup.vue";
import askBox from "./components/common/askBox.vue";
import Snackbar from "./components/common/snackbar.vue"
import Login from "./components/common/Login.vue";
import DC from "./components/icons/DC.svg";
import SMP from "./components/icons/SMP_black.svg";

import { useAuthStore } from "./stores/auth";
import { useQuestionStore } from "./stores/question";
import { useColourStore } from "./stores/colour";
import { useRoute } from "vue-router";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    popup,
    askBox,
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
      activeLoginSlide: 0,
      loginSlides: [
        {
          title: "Have Questions?",
          subtitle: "Get answers before you arrive.",
          image: new URL("./components/background_images/login-slide-questions.svg", import.meta.url).href,
        },
        {
          title: "Connect With Mentors,",
          subtitle: "Learn from experienced students.",
          image: new URL("./components/background_images/NewBee_login_image_2/Vector-14.svg", import.meta.url).href,
        },
        {
          title: "Ask Anything,",
          subtitle: "From admissions to campus life.",
          image: new URL("./components/background_images/NewBee_login_image_3/Vector-50.svg", import.meta.url).href,
        },
        {
          title: "Get Answers,",
          subtitle: "Trusted guidance from official mentors.",
          image: new URL("./components/background_images/NewBee_login_image_4/Vector-74.svg", import.meta.url).href,
        },
        {
          title: "Join Confidently,",
          subtitle: "Start your college journey prepared.",
          image: new URL("./components/background_images/NewBee_login_image_5/Vector-156.svg", import.meta.url).href,
        },
      ],
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
    async OnSubmit() {
      this.askQuestion = false;
    },

    async ask() {
      this.askQuestion = !this.askQuestion;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Burger(value) {
      this.showSidebar = value;
      console.log(this.showSidebar);
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
    async toDevCom() {
      window.open("https://devcom-iitb.org/");
    },
    async toSMP() {
      window.open("https://smp.gymkhana.iitb.ac.in/");
    },
    nextLoginSlide() {
      this.activeLoginSlide = (this.activeLoginSlide + 1) % this.loginSlides.length;
    },
    prevLoginSlide() {
      this.activeLoginSlide =
        (this.activeLoginSlide - 1 + this.loginSlides.length) % this.loginSlides.length;
    },
  },
  computed: {
    isMentorRoute() {
      return this.$route.path.startsWith(this.Auth.vite_base + '/mentor');
    },
  },
  setup() {
    const Auth = useAuthStore();
    const QuestionStore = useQuestionStore();
    const ColourStore = useColourStore();

    return {
      Auth,
      QuestionStore,
      ColourStore,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  flex-flow: row wrap;
  overflow-y: hidden;
  /* border: 5px solid red; */
}

.Sidebar {
  width: 21.45%;
  display: flex;
  justify-content: center;
}

.Content {
  height: 100vh;
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Navbar {
  height: 14.29%;
  width: 66.58%;
  margin-top: 1.56%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.RouterView {
  height: 85.71%;
  width: 78.65%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snackbar {
  z-index: 5;
  bottom: 40px;
  max-width: 66.58%;
  position: absolute;
  }

  
.popup {
  position: fixed;
  bottom: 18px;
  width: 15.79%;
  height: 10%;
  cursor: pointer;
}

.ask {
  position: fixed;
  width: 52.33vw;
  top: 100px;
  z-index: 1;
  background: white;
  border-radius: 24px;
  padding: 16px 24px;
}

.glass {
  position: fixed;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: linear-gradient(90deg, #ffffff 0 50%, #fff1bb 50% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.DC {
  right: 28px;
  top: 22px;
  z-index: 1;
  position: fixed;
  width: 44px;
  height: auto;
}

.SMP {
  left: 28px;
  top: 20px;
  z-index: 1;
  position: fixed;
  width: 57px;
  height: auto;
}

.login-shell {
  width: min(84vw, 1440px);
  height: min(72vh, 720px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(90deg, #ffffff 0 50%, #fff1bb 50% 100%);
  transform: translateY(-2vh);
}

.login-visual {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
}

.login-visual__content {
  position: relative;
  width: 100%;
  height: 86%;
  border-radius: 24px 0 0 24px;
  background: #fff1bb;
  text-align: center;
  overflow: hidden;
  padding: 50px 28px 58px;
}

.login-visual__content h1 {
  margin: 0;
  color: #050031;
  font-size: 26px;
  font-weight: 800;
  line-height: 1.1;
}

.login-visual__content p {
  margin: 6px 0 8px;
  color: #050031;
  font-size: 24px;
  line-height: 1.15;
}

.login-visual__art {
  display: block;
  width: 86%;
  max-height: 70%;
  margin: 0 auto;
  object-fit: contain;
}

.login-arrow {
  position: absolute;
  z-index: 2;
  border: 0;
  background: transparent;
  color: #6c644f;
  font-size: 20px;
  cursor: pointer;
}

.login-arrow:first-child {
  left: 18px;
}

.login-arrow:last-child {
  right: 18px;
}

.login-dots {
  position: absolute;
  left: 50%;
  bottom: 34px;
  display: inline-flex;
  gap: 4px;
  transform: translateX(-50%);
}

.login-dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 1.5px solid #1a1a1a;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}

.login-dot--active {
  background: #f6cf59;
}

.login-form {
  background: #fff;
  border-radius: 0 24px 24px 0;
  width: 100%;
  height: 86%;
  align-self: center;
  z-index: 1;
  padding: 0;
}

@media only screen and (max-width: 950px) {
  .ExpandedImg {
    height: 300px;
  }
}

@media only screen and (max-width: 750px) {
  .Sidebar {
    height: 100vh;
    z-index: 2;
    position: fixed;
    justify-content: start;
  }

  .Content {
    margin-top: 64px;
    height: 92vh;
  }

  .Navbar {
    width: 95vw;
  }

  .RouterView {
    width: 95vw;
  }

  .Sidebar {
    width: 0px;
  }

  .snackbar {
    max-width: 95vw;
  }
  .popup {
    width: 40%;
    height: 5%;
  }

  .ask {
    width: 100vw;
    height: 90vh;
    top: 100px;
    padding: 16px 24px;
  }

  .ExpandedImg {
    height: 200px;
  }

  .login-form {
    border-radius: 24px;
    height: auto;
    min-height: 560px;
  }

  .login-shell {
    width: 94vw;
    height: auto;
    grid-template-columns: 1fr;
    padding: 72px 0 24px;
    background: #fff1bb;
  }

  .login-visual {
    display: none;
  }
}
</style>
