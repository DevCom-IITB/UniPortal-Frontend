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
      timer: null
    }),
    setup() {
      const QuestionStore = useQuestionStore();
      const ColourStore = useColourStore();
      return {
        QuestionStore,
        ColourStore
      }
    },
    mounted() {
      this.startTimer();
    },
    beforeUnmount() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    watch: {
      'QuestionStore.snackMessage': function() {
        this.startTimer();
      }
    },
    methods: {
      startTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.QuestionStore.showSnackbar = false;
        }, 5000);
      },
      Cancel() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.QuestionStore.showSnackbar = false;
      }
    }
}
</script>

<style scoped>
.Snackbar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 16px 32px;
  background: white;
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



