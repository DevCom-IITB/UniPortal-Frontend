<template>
    <div class="container">
      
      <Header />
      <InfoBox />
      <questionBox/>      
      <router-view></router-view>
    </div>
  </template>
  
  <script lang="ts" >
  import questionBox from '../components/common/infopostBox.vue'
  import Header from '../components/common/Header.vue'
  import InfoBox from '../components/infopost/InfoBox.vue'
  
  export default {
    name: 'Infopost',
    components: {
      
      questionBox,
      Header, 
      InfoBox
    }
  }
  </script>
  
  <style>
  * {
    background: white;
  }

  
  </style>