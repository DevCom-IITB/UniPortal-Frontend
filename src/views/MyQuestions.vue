<template>
    <div class="container">
     
      <questionHeader />
      <Question />
      
    </div>
  </template>
  
  <script lang="ts">
  import Navbar from '../components/common/Navbar.vue'
  import Sidebar from '../components/common/Sidebar.vue'
  import Question from '../components/common/questionBox.vue'
  import questionHeader from '../components/myQuestions/questionHeader.vue'

  
  export default {
    name: 'Myquestions',
    components: {
      
      Question,
      questionHeader
     
    },
    data(){
    return{
      questions: []
    }},
    
  }
  </script>
  
  <style>
  * {
    background: white;
  }
  
  </style>