<template>
  <div class="container">
    <div class="Sidebar"><Sidebar /></div>
    <div class="Content">
      <div class="Navbar"><Navbar /></div>
      <div class="RouterView"><!--<router-view></router-view>--></div>
    </div>
     
    <div class="popup"><!--<popup />--></div>
    
    
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
  }
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
  border: 5px solid green;
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
  border: 5px solid yellow;
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
  width: 66.58%;
  border: 5px solid purple;
}

.popup{
  flex: 0;
}



</style>