<template>
    <div class="container">
      
      <Header />
      <questionBox />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import questionBox from '../components/myQuestions/questionBox.vue'
  import Header from '../components/common/Header.vue'
  
  export default {
    name: 'Infopost',
    components: {
      
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