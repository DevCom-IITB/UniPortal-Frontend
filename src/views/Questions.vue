<template>
    <div class="container">
     
     <div class="Header"><Header :headerName="headerName" :headerText="headerText" :background="background" :primaryColor="primaryColor"/></div>
     <div class="Lister">
       <div :key="question['id']" v-for="question in questions" class="QuestionBox">
        
         <Question :showAnswerBox="this.true" :question="question" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent" @comment="$emit('comment')"/>
         
        </div>
        
     </div>

   
     
   </div>
      
</template>
  
<script>
  import Question from '../components/common/questionBox.vue'
  import Header from '../components/common/Header.vue'

  
  export default {
    name: 'MyQuestions',
    data() {
      return {
        headerName : 'Questions',
        headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may ',
        questions : [],
        background: '#FFF3F2',
        primaryColor : '#1F1514',
        secondaryColor : '#CC655E',
        primaryAccent : '#FFD2D1',
        true : true,
        false : false,
      }
    },
    components: {
      Question,
      Header
    },
    methods:{
      async fetchQuestions() {
        const res = await fetch('api/questions')
        console.log(res);
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
    width: 100%;
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
    align-items: center;
    justify-content:start;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .Lister::-webkit-scrollbar {
    display: none;
  }

  .QuestionBox{
    height: fit-content;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }


  </style>