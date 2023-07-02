<template>
    <div class="Snackbar" :style="{color : ColourStore.snackColor, borderColor : ColourStore.snackColor}" >
      <div class="text">
        {{ QuestionStore.snackMessage }}
      </div>
      <div class="cancel" @click="Cancel"></div>
    </div>
</template>

<script>
import { useQuestionStore } from '../../stores/question';
import { useColourStore } from '../../stores/colour';
export default {
    name: "Snackbar",
    data: () => ({
      text: 'Welcome aboard With the all new freshers portal clear all your doubts regarding the admission process, Welcome aboard With the all new freshers portal ',
    }),
    setup() {
      const QuestionStore = useQuestionStore();
      const ColourStore = useColourStore();
      return {
        QuestionStore,
        ColourStore
      }
    },
    methods: {
      Cancel() {
        this.QuestionStore.showSnackbar = false;
      }
    }
}
</script>

<style scoped>
.Snackbar {
  padding: 16px 32px;
  background: white;
  /* border : 1px solid ; */
  box-shadow: 20px 20px 60px #3a3a3a, -20px -20px 60px #ffffff;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
}

.cancel {
  position: absolute;
  z-index: 8;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  background: #60b926;
  top: 10px;
  right: 10px;
  
}

.cancel:hover {
  background: #ff7c7c;
}

@media only screen and (max-width: 750px) {
  .Snackbar {
    font-size: 12px;
    padding: 16px 16px;
  }
  
}
</style>



