<template>
  <div class="container">
   
    <div class="Question" @click="test" :style="{ borderBlockColor : grey }"><Question :upvotes="upvotes" :showAnswerBox="this.true" :comments="comments" :question="question" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent" @comment="$emit('comment')"/></div>
    <div class="Lister">
      <div :key="answer['id']" v-for="answer in answers" class="QuestionBox">
        <Question :upvotes="answer['upvotes']" :showAnswerBox="this.false" :comments="answer['comments']" :question="answer" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent" @comment="$emit('comment')"/>
      </div>
      
    </div>

 
   
 </div>
    
</template>

<script>
import Question from '../components/common/questionBoxMax.vue'
import axios from 'axios'

import { useQuestionStore } from '@/stores/question'

export default {
  name: 'Questionview',
  setup(){
    const questionStore = useQuestionStore()
    return { questionStore }
  },
  data() {
    return {
      sidebar : '#F0F3E8',
      background: '#FDFDF6',
      primaryColor : '#3E3C5D',
      secondaryColor : '#386A20',
      primaryAccent : '#D9E7CB',
      unselected : '#F0F3E8',

      question : {},
      answers : [],
      comments : [],  
      upvotes : 0,
      true : true,
      false : false
    }
  },
  components: {
    Question,
  },
  methods:{
      async fetchQuestions(id) {
        const res = await fetch(`http://localhost:7000/questions/${id}`)
        console.log("we got the response : ",res);
        const data = await res.json()
        console.log("we get the data : ",data);
        return data
      },
      test(){
        console.log(this.question.comments);
      }
    },
    async mounted() {
      console.log('we have enterd the question view');
      // const id = decodeURIComponent(window.location.pathname).split('/')[2];
      // console.log(id);
      // this.question = await this.fetchQuestions(id)
      // this.answers = this.question.answers;
      // this.comments = this.question.comments;
      // this.upvotes = this.question.upvotes;
      // console.log(this.question);
      //console.log(this.question.answers.length?"yes":"no");
      // console.log(this.question.verified);
      // console.log("upvotes : ",this.upvotes);
      console.log('state question', this.questionStore.question);
      this.question = this.questionStore.question
    }
}
</script>

<style scoped>

.container{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container::-webkit-scrollbar {
    display: none;
  }

.Question{
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 2px solid;
}

.Lister{
  max-height: 64.04%;
  width: 100%;
  /* border: 5px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:start;
  overflow-y: scroll;
  overflow-x: hidden;
}

.Lister::-webkit-scrollbar {
  width: 8px;
}


.Lister::-webkit-scrollbar-thumb {
  background: #386A20;
  border-radius: 24px;
}

.Lister::-webkit-scrollbar-thumb:hover {
  background: #3E3C5D;
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