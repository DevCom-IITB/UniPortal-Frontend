<template>
  <div class="container">
    <Navbar />
    <Sidebar />
    
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Sidebar from './components/common/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    
  }
}
</script>

<style>


</style>