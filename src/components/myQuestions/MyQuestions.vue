<template>
    <div class="container">
     
      <Navbar />
      <Sidebar />
      <Questionheader />
      <Question />
      
    </div>
  </template>
  
  <script>
  import Navbar from './components/common/Navbar.vue'
  import Sidebar from './components/common/Sidebar.vue'
  import questionBox from './components/myQuestions/questionBox.vue'
  import Header from './components/common/Header.vue'
  import Question from './components/myQuestions/Question.vue'
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