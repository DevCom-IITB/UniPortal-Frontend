<template>
  <div class="container">
    <Navbar />
    <Sidebar />
    <Header />
    <questionBox />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import questionBox from './components/questionBox.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    questionBox,
    Header
  }
}
</script>

<style>
* {
  background: white;
}

</style>