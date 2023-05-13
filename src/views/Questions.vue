<template>
    <div class="container">
     
      <questionheader />
      <Question />
      <viewcomments />
      
    </div>
  </template>
  
  <script>
  import Navbar from '../components/common/Navbar.vue'
  import Sidebar from '../components/common/Sidebar.vue'
  import Question from '../components/common/questionBox.vue'
  import questionheader from '../components/Questions/questionheader.vue'
  import viewcomments from '../components/common/viewcomments.vue'

  
  export default {
    name: 'Questions',
    components: {
      Navbar,
      Sidebar,
      
      Question,
      questionheader,
      viewcomments,
     
    }
  }
  </script>
  
  <style>
  * {
    background: white;
  }
  
  </style>