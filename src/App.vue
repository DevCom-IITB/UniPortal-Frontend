<template>
  <div class="container">
    <div class="Sidebar"><Sidebar :sidebar="sidebar" :emphasisText="emphasisText"/></div>
    <div class="Content">
      <div class="Navbar"><Navbar @selected1="ColorInfoPost" @selected2="ColorQuestions" @selected3="ColorMyQuestions" :grey="grey" :unselected="unselected" :primary="primary" :emphasisText="emphasisText" /></div>
      <div class="RouterView"><router-view></router-view></div>
    </div>
     
    <div class="popup"><popup /></div>
    
    
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Sidebar from './components/common/Sidebar.vue'
import popup from './components/common/popup.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    popup,
  },
  data(){
    return{
      sidebar : '#FFEDB2',
      primary : '#FFDF80',
      grey : '#CCB160',
      unselected : '#FAF4E1',
      hover : '#FFD899',
      emphasisText : '#211D12',
    }
  },
  methods:{
    async ColorInfoPost(){
      this.sidebar = '#FFEDB2';
      this.primary = '#FFDF80';
      this.grey = '#CCB160';
      this.unselected = '#FAF4E1';  
      this.hover = '#FFD899';
      this.emphasisText = '#211D12';
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async ColorQuestions(){
      this.sidebar = '#FFE5E5';
      this.primary = '#FFD2D1';
      this.grey = '#CC655E';
      this.unselected = '#FFF4F2';  
      this.hover = '#FFA599';
      this.emphasisText = '#1F1514';
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
    async ColorMyQuestions(){
      this.sidebar = '#E5D7FF';
      this.primary = '#D4BDFF';
      this.grey = '#8D87B3';
      this.unselected = '#E8E7F5';  
      this.hover = '#C9B4F2';
      this.emphasisText = '#201E2F';
      console.log(this.sidebar, this.primary, this.grey, this.unselected, this.hover);
    },
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
  /* border: 5px solid red; */
}

.Sidebar{
  width: 21.45%;
  display: flex;
  justify-content: center;
}

.Content{
  width: 78.55%;
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
  width: 78.35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup{
  flex: 0;
}



</style>