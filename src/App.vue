<template>
  <div class="container" v-if="loggedIn">
    <div class="Sidebar"><Sidebar :sidebar="sidebar" :emphasisText="emphasisText" :hover="hover" :background="background" :primary="primary" @Burger="Burger" :style=" !showSidebar && windowWidth<750 ? {width:'0vw'} : {width : '70vw'} " /></div>
    <div class="Content" :style=" windowWidth<750 ? {width:'100vw'} : {width:'78.55vw'}" >
      <div class="Navbar"><Navbar @selected1="ColorInfoPost" @selected2="ColorQuestions" @selected3="ColorMyQuestions" :grey="grey" :unselected="unselected" :primary="primary" :emphasisText="emphasisText" /></div>
      <div class="RouterView"><router-view @comment="ask" @askView="ColorQuestionView"></router-view></div>
      <div class="popup" @click="ask" v-if="askPopup"><popup :lightText="lightText" /></div>
      <div class="ask" v-if="askQuestion == true"><askBox :grey="grey" :background="background" :primary="primary" :askQuestion="askQuestion" @discard="ask" @OnSubmit="ask" /></div>
    </div>
    <div class="glass" v-if="askQuestion == true" @click="ask" :style="windowWidth<=750 ? {background : background} : {background : 'rgba(0, 0, 0, 0.5)'}" ></div>
  </div>
  <div class="login" v-if="!loggedIn">
    <DC class="DC"/>
    <login_background class="login-background" />
    <div class="login-form"><Login /></div>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Sidebar from './components/common/Sidebar.vue'
import popup from './components/common/popup.vue'
import askBox from './components/common/askBox.vue'
import login_background from './components/background_images/Group 9.svg'
import Login from './components/common/Login.vue'
import DC from './components/icons/DC.svg'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    popup,
    askBox,
    login_background,
    Login,
    DC,
  },
  data(){
    return{
      sidebar : '#FFEDB2',
      primary : '#FFDF80',
      grey : '#CCB160',
      unselected : '#FAF4E1',
      hover : '#FFD899',
      emphasisText : '#211D12',
      lightText : '#52492E',
      background : '#FFF9E5',
      askQuestion : false,
      askPopup : true,
      windowWidth : window.innerWidth,
      showSidebar : false,
      loggedIn : false,
    }
  },
  mounted() {
      this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      })
  },
  beforeDestroy() { 
      window.removeEventListener('resize', this.onResize); 
  },
  methods:{
    async ColorInfoPost(){
      this.sidebar = '#FFEDB2';
      this.primary = '#FFDF80';
      this.grey = '#CCB160';
      this.unselected = '#FAF4E1';  
      this.hover = '#FFD899';
      this.emphasisText = '#211D12';
      this.lightText = '#52492E';
      this.background = '#FFF9E5';
      this.askPopup = true;
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async OnSubmit(newPost){
      const response = await fetch('api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })

      this.askQuestion = false;
    },
    async ColorQuestions(){
      this.sidebar = '#FFE5E5';
      this.primary = '#FFD2D1';
      this.grey = '#CC655E';
      this.unselected = '#FFF4F2';  
      this.hover = '#FFA599';
      this.emphasisText = '#1F1514';
      this.lightText = '#3E2A28';
      this.background = '#FFF3F2';
      this.askPopup = true;
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async ColorMyQuestions(){
      this.sidebar = '#E5D7FF';
      this.primary = '#D4BDFF';
      this.grey = '#8D87B3';
      this.unselected = '#E8E7F5';  
      this.hover = '#C9B4F2';
      this.emphasisText = '#201E2F';
      this.lightText = '#3E3C5D';
      this.background = '#F6F5FF';
      this.askPopup = true;
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async ColorQuestionView(){
      this.sidebar = '#F0F3E8';
      this.primary = '#D9E7CB';
      this.grey = '#386A20';
      this.unselected = '#F0F3E8';  
      this.hover = '#D9E7CB';
      this.emphasisText = '#1C1B1F';
      this.background = '#FDFDF6';
      this.askPopup = false;
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async ask(){
      this.askQuestion = !this.askQuestion;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Burger(value){
      this.showSidebar = value;
      console.log(this.showSidebar);
    }
  },
}
</script>

<style scoped>

.container{
  display: flex;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  flex-flow: row wrap;
  overflow-y: hidden;
  /* border: 5px solid red; */
}

.Sidebar{
  width: 21.45%;
  display: flex;
  justify-content: center;
}

.Content{
  height: 100vh;
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Navbar{
  height: 14.29%;
  width: 66.58%;
  margin-top: 1.56%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.RouterView{
  height: 85.71%;
  width: 78.65%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup{
  position: fixed;
  margin-top: 85vh;
  width : 15.79%;
  height: 10%;
  cursor: pointer;
}

.ask{
  position: fixed;
  width: 52.33vw;
  height: 30vh;
  margin-bottom: 42vh;
  z-index: 1;
  background: white;
  border-radius: 24px;
  padding: 16px 24px;
}

.glass{
  position: fixed;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  
}

.login{
  width: 100vw;
  height: 100vh;
  background: #FFF9E5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-background{
  position: fixed;
}

.DC{
  left: 10px;
  top: 0px;
  z-index: 1;
  position: fixed;
}

.login-form{
  background: #fff;
  border-radius: 24px;
  width: 38vw;
  height: 85vh;
  box-shadow:  20px 20px 60px #d9d4c3,
             -20px -20px 60px #FFF9E5;
  z-index: 1;
  padding: 24px 24px; 
}


@media only screen and (max-width:750px){

.Sidebar{
  height: 100vh;
  z-index: 2;
  position: fixed;
  justify-content: start;
}

.Content{
  margin-top: 64px;
  height: 92vh;
}

.Navbar{
  width: 95vw;
}

.RouterView{
  width: 95vw;
}

.Sidebar{
  width: 0px;
}

.popup{
  width: 40%;
  height: 5%;
}

.ask{
  width: 100vw;
  height: 90vh;
  margin-top: 47vh;
  padding: 16px 24px;
}

}


</style>