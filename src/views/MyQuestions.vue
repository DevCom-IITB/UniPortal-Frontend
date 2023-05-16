<template>
    <div class="container">
     
      
      <Header :headerName="headerName" />
      <Question />
      
    </div>
  </template>
  
  <script lang="ts">
  import Question from '../components/common/questionBox.vue'
  import Header from '../components/common/Header.vue'

  
  export default {
    name: 'MyQuestions',
    data() {
    return {
      headerName : 'My Questions'
    }
  },
    components: {
      Question,
      Header
     
    }
  }
  </script>
  
  <style>  
  </style>