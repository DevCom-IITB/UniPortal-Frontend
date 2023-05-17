<template>
  <div class="container">
    
    <Navbar />
    <Sidebar />
    <router-view></router-view>
    <popup />
    
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

<style>


</style>