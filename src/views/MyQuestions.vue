<template>
    <div class="container">
     
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" /></div>
      <div class="Lister"></div>
      <!-- <Header :headerName="headerName" />
      <Question /> -->
      
      
    </div>
  </template>
  
  <script lang="ts">
  import Question from '../components/common/questionBox.vue'
  import Header from '../components/common/Header.vue'

  
  export default {
    name: 'MyQuestions',
    data() {
    return {
      headerName : 'MyQuestions',
      headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may '
    }
  },
    components: {
      Question,
      Header
     
    }
  }
  </script>
  
  <style scoped>  

.container{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Header{
    height: 35.96%;
    width: 100%;
  }

  .Lister{
    height: 64.04%;
    width: 100%;
    border: 5px solid green;
  }

  </style>