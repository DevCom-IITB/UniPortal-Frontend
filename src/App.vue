<template>
  <div class="container" v-if="Auth.loggedIn" >
    <div class="Sidebar" >
      <Sidebar
        @Burger="Burger"
        :style="
          !showSidebar && windowWidth < 750
            ? { width: '0vw' }
            : { width: '70vw' }
        "
        @displaynotif="showNotification2"
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
      <div class="ask" v-if="notificationVisible == true">
      <NotificationBox 
      v-if="notificationVisible" 
      :notifP="notif1"
      @closeNwindow="handleClose" 
      @openNwindow="handleOpen" 
    />
  </div>
    
      <div class="ExpandedImg" v-if="expanded">
        <div class="cancel" @click="CloseImg"></div>
        <img :src="QuestionStore.ImageLink" alt="" />
      </div>
    </div>
    <div
      class="glass"
      v-if="askQuestion == true || glass == true "
      @click="glassClick"
      :style="
        windowWidth <= 750
          ? { background: ColourStore.background }
          : { background: 'rgba(0, 0, 0, 0.5)' }
      "
    ></div>
    
    
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
  
</template>

<script>
import NotificationBox from "./components/common/NotificationBox.vue";
import Navbar from "./components/common/Navbar.vue";
import Sidebar from "./components/common/Sidebar.vue";
import popup from "./components/common/popup.vue";
import askBox from "./components/common/askBox.vue";
import Snackbar from "./components/common/snackbar.vue"
import login_background from "./components/background_images/Group 9.svg";
import Login from "./components/common/Login.vue";
import DC from "./components/icons/DC.svg";
import SMP from "./components/icons/SMP_black.svg";

import { useAuthStore } from "./stores/auth";
import { useQuestionStore } from "./stores/question";
import { useColourStore } from "./stores/colour";


export default {
  name: "App",
  components: {
    NotificationBox,
    Navbar,
    Sidebar,
    popup,
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
      notificationVisible: false,
      notif1: [],
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
      this.notificationVisible = false;
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
    showNotification() {
      this.notificationVisible = true;
      this.glass = true;
      console.log('this is in app.vue')
    },
    handleOpen() {
      // something about save
      console.log('Open button clicked');
      this.notificationVisible = false;
      this.glass = false;
    },
    handleClose(){
      this.notificationVisible = false;
      this.glass = false;
    },
    showNotification2(notif){
      this.notificationVisible = true;
      this.glass = true;
      this.notif1 = notif
      console.log(notif)
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
    width: 95vw;
    height: 95vh;
  }
}
</style>
