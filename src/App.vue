<template>
  <div class="container">
    <Navbar />
    <Sidebar />
    <Header />
    <questionBox />
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Sidebar from './components/common/Sidebar.vue'
import questionBox from './components/myQuestions/questionBox.vue'
import Header from './components/common/Header.vue'

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