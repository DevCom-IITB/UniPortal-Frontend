<template>

  <div class="askQuestion" :style="{ background : lightText } ">
    <ask />&nbsp;&nbsp;Ask a Question
  </div>

</template>
 
<script>

import ask from '../icons/question.svg'
import email from '../icons/email.svg'

  export default {
      name: 'popup',
      clearTextBox() {
        document.getElementById("myTextBox").value = "";
      },
      props : {
        lightText : String,
      },
      components : {
        ask,
      },
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
  font-size: 12px;
}

}

 </style>