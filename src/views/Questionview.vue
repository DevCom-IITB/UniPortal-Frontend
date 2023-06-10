<template>
  <div class="container">
   
    <div class="Question" @click="test" :style="{ borderBlockColor : grey }"><Question :isAnswer="this.false" :upvotes="upvotes" :showAnswerBox="this.true" :comments="questionStore.comments" :question="question" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent" @comment="$emit('comment')"/></div>
    <div class="Lister">
      <div :key="answer['id']" v-for="answer in answers" class="QuestionBox">
        <Question :isAnswer="this.true" :upvotes="answer['upvotes']" :showAnswerBox="this.false" :comments="answer['comments']" :question="answer" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent" @comment="$emit('comment')" @answer_id="CommentAnswer" @upvote="UpvoteAnswer" @hide="HideAnswer" />
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
      test(){
        console.log(this.question.comments);
      },
      async CommentAnswer(answer_id){
        console.log('answer_id : ', answer_id);
        console.log('we will be commenting on this answer');
        console.log('question id : ', this.question['_id']);
        console.log('we will be commenting on this answer with question id : ', this.question['_id']);
        await this.questionStore.SetQuestionID(this.question['_id'])
      },
      async UpvoteAnswer(){
        console.log('we will be upvoting this answer');
        console.log('question id : ', this.question['_id']);
        console.log('we will be upvoting this answer with question id : ', this.question['_id']);
        await this.questionStore.SetQuestionID(this.question['_id'])
        await this.questionStore.UpvoteAnswer()
      },
      async HideAnswer(){
        console.log('we will be hiding this answer');
        console.log('we will be hiding this answer with question id : ', this.question['_id']);
        await this.questionStore.SetQuestionID(this.question['_id'])
        await this.questionStore.HideAnswer()
      }
    },
    async mounted() {
      console.log('we have enterd the question view');
      console.log('state question', this.questionStore.question);
      this.question = this.questionStore.question
      this.answers = this.questionStore.answers
      this.comments = this.questionStore.comments
      this.upvotes = this.questionStore.question['upvotes']
      console.log('comments in question view :', this.comments);
      this.$emit('askView')
    }
}
</script>

<style scoped>

.container{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
}

::-webkit-scrollbar {
  width: 8px;
}


::-webkit-scrollbar-thumb {
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