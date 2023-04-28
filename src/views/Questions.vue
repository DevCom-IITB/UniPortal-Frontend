<template>
    <div class="container">
     
      <questionheader />
      <Question />
      
    </div>
  </template>
  
  <script>
  import Navbar from '../components/common/Navbar.vue'
  import Sidebar from '../components/common/Sidebar.vue'
  import Question from '../components/Questions/Question.vue'
  import questionheader from '../components/Questions/questionheader.vue'

  
  export default {
    name: 'Questions',
    components: {
      Navbar,
      Sidebar,
      
      Question,
      questionheader
     
    }
  }
  </script>
  
  <style>
  * {
    background: white;
  }
  
  </style>