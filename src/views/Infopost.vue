<template>
    <div class="container">
      
      <Header />
      <questionBox />
      <router-view></router-view>
    </div>
  </template>
  
  <script lang="ts" >
  import questionBox from '../components/common/infopostBox.vue'
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