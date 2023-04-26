<template>
  <div class="container">
    <Question />
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import questionBox from './components/questionBox.vue'
import Header from './components/Header.vue'
import Question from './components/Question.vue'
import Questionheader from './components/Questionheader.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    questionBox,
    Header,
    Question,
    Questionheader
  }
}
</script>

<style>
* {
  background: white;
}

</style>