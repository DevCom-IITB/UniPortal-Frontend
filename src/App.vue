<template>
  <div class="container">
    <Navbar />
    <Sidebar />
    <AskQuestion />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Sidebar from './components/common/Sidebar.vue'
import AskQuestion from './components/common/AskQuestion.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    AskQuestion

  }
}
</script>

<style>


</style>