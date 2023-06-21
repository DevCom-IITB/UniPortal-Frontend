<template>

  <div class="askQuestion" :style="{ background : colourStore.light_text } ">
    <ask />&nbsp;&nbsp;{{ PopAction }}
  </div>

</template>
 
<script>

import { useAuthStore } from '@/stores/auth';
import { useColourStore } from '../../stores/colour';

import ask from '../icons/question.svg'
import email from '../icons/email.svg'

  export default {
      name: 'popup',
      data(){
        return{
          PopAction : 'Ask a Question',
        }
      },
      components : {
        ask,
      },
      mounted(){
        if(this.authStore.role == 5980 || this.authStore.role == 6311){
          this.PopAction = 'Post Infopost';
        }
        else{
          this.PopAction = 'Ask Question';
        }
      },
      setup(){
        const authStore = useAuthStore();
        const colourStore = useColourStore();
        return{
          authStore,
          colourStore,
        }
      }
 }
</script>
 
 <style scoped>

.askQuestion{
  height: 100%;
  border: 1px solid #52492E;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
}

@media screen and (max-width: 1150px) {

  .askQuestion{
    font-size: 14px;
  }

}

@media screen and (max-width: 950px) {

.askQuestion{
  border-radius: 12px;
}

}

@media screen and (max-width: 750px) {

.askQuestion{
  font-size: 12px;
}

}

 </style>