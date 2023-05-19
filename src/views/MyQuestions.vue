<template>
    <div class="container">
     
      <div class="Header"><Header :headerName="headerName" :headerText="headerText" /></div>
      <div class="Lister">
        <!-- <div :key="question['id']" v-for="question in questions" class="QuestionBox">
          <Question/>
        </div> -->
        <div class="QuestionBox">
          <Question/>
        </div>
      </div>

      
      
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
        headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may ',
        questions : []
      }
    },
    components: {
      Question,
      Header
    },
    methods:{
      async fetchQuestions() {
        const res = await fetch('api/questions')
        const data = await res.json()
        console.log(data)
        return data
      },
    },
    async mounted() {
      this.questions = await this.fetchQuestions()
      console.log(this.questions);
    }
  }
  </script>
  
  <style scoped>  

.container{
    height: 100%;
    width: 117.66%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Header{
    height: 35.96%;
    width: 84.98%;
  }

  .Lister{
    height: 64.04%;
    width: 100%;
    /* border: 5px solid green; */
    display: flex;
    flex-direction: column;
    justify-content:start;
    overflow-y: scroll;
  }

  .Lister::-webkit-scrollbar {
    display: none;
  }

  .QuestionBox{
    height: 37.32%;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
   }

  </style>