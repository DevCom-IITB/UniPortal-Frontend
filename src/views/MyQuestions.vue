<template>
    <div class="container">
     
      
      <questionHeader />
      <Question />
      
    </div>
  </template>
  
  <script>
  import Navbar from '../components/common/Navbar.vue'
  import Sidebar from '../components/common/Sidebar.vue'
  import questionBox from '../components/myQuestions/questionBox.vue'
  import Question from '../components/myQuestions/Question.vue'
  import questionHeader from '../components/myQuestions/questionHeader.vue'

  
  export default {
    name: 'Myquestions',
    components: {
      Navbar,
      Sidebar,
      questionBox,
      Question,
      questionHeader
     
    }
  }
  </script>
  
  <style>
  * {
    background: white;
  }
  
  </style>