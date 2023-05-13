<template>
    <div class="container">
     
      <questionHeader />
      <Question />
      
    </div>
  </template>
  
  <script>
  
  import questionBox from '../components/myQuestions/questionBox.vue'
  import Question from '../components/myQuestions/Question.vue'
  import questionHeader from '../components/myQuestions/questionHeader.vue'

  
  export default {
    name: 'Myquestions',
    components: {
      
      questionBox,
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