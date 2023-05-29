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

export default {
  name: 'Questionview',
  data() {
    return {
      headerName : 'Questions',
      headerText : 'A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may ',
      background: '#FFF3F2',
      primaryColor : '#1F1514',
      secondaryColor : '#CC655E',
      primaryAccent : '#FFD2D1',
      grey : '#F2F2F2',
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
      const id = decodeURIComponent(window.location.pathname).split('/')[2];
      console.log(id);
      this.question = await this.fetchQuestions(id)
      this.answers = this.question.answers;
      this.comments = this.question.comments;
      this.upvotes = this.question.upvotes;
      console.log(this.question);
      //console.log(this.question.answers.length?"yes":"no");
      console.log(this.question.verified);
      console.log("upvotes : ",this.upvotes);
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
  background: #CC655E;
  border-radius: 24px;
}

.Lister::-webkit-scrollbar-thumb:hover {
  background: #3E2A28;
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