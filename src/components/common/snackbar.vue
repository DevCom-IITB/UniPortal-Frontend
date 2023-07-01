<template>
    <div class="test-snackbar" v-if="snackbar">
        
        <v-snackbar class="snackbar"
      v-model="snackbar"
      :timeout = "timeout"
      multi-line
      bottom
    >
    <div class="cancel" @click="snackbar=false">
    </div>
    <div class="text">
    {{ text }}
    </div>
    
        </v-snackbar>
    </div>
</template>

<script>
import { useQuestionStore } from '../../stores/question';
export default {
    name: "Snackbar",
    data: () => ({
      snackbar: true,
      text: 'Welcome aboard With the all new freshers portal clear all your doubts regarding the admission process',
      timeout: 3000,
    }),
    setup() {
      const QuestionStore = useQuestionStore();
      return {
        QuestionStore,
      }
    }
}
</script>

<style scoped>
.test-snackbar {
  padding: 16px 48px;
  background: rgba(255, 255, 255, 0.90);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 24px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;

}

.cancel {
  position: fixed;
  z-index: 8;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: #60b926;
  margin-top: 5px;
  margin-right: 5px;
  
}

.cancel:hover {
  background: #ff7c7c;
}

@media only screen and (max-width: 750px) {
  .test-snackbar {
    font-size: 12px;
    padding: 16px 16px;
  }
  
}
</style>



