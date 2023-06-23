<template>
  <div class="container">
    <div
      class="MainQuestion"
      @click="test"
      :style="{ borderBlockColor: secondaryColor }"
    >
      <Question
        @expand="$emit('expand')"
        v-if="question && Object.keys(question).length > 0"
        :isAnswer="this.false"
        :upvotes="question['upvotes']"
        :showAnswerBox="this.true"
        :comments="questionStore.comments"
        :question="question"
        :background="background"
        :primaryColor="primaryColor"
        :secondaryColor="secondaryColor"
        :primaryAccent="primaryAccent"
        @comment="$emit('comment')"
      />
    </div>
    <div class="List" v-if="answers.length">
      <div :key="answer['id']" v-for="answer in answers" class="QuestionBox">
        <Question
          @expand="$emit('expand')"
          :isAnswer="this.true"
          :upvotes="answer['upvotes']"
          :showAnswerBox="this.false"
          :comments="answer['comments']"
          :question="answer"
          :background="background"
          :primaryColor="primaryColor"
          :secondaryColor="secondaryColor"
          :primaryAccent="primaryAccent"
          @comment="$emit('comment')"
          @answer_id="CommentAnswer"
          @upvote="UpvoteAnswer"
          @hide="HideAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Question from "../components/common/questionBoxMax.vue";

import { useQuestionStore } from "../stores/question";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";

export default {
  name: "Questionview",
  setup() {
    const questionStore = useQuestionStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    return { questionStore, listStore, colourStore };
  },
  data() {
    return {
      // sidebar : '#F0F3E8',
      // background: '#FDFDF6',
      // primaryColor : '#3E3C5D',
      // secondaryColor : '#386A20',
      // primaryAccent : '#D9E7CB',
      // unselected : '#F0F3E8',

      question: {},
      answers: [],
      comments: [],
      upvotes: 0,
      true: true,
      false: false,
    };
  },
  components: {
    Question,
  },
  methods: {
    test() {
      console.log(this.question.comments);
    },
    async CommentAnswer(answer_id) {
      console.log("answer_id : ", answer_id);
      console.log("we will be commenting on this answer");
      console.log("question id : ", this.question["_id"]);
      console.log(
        "we will be commenting on this answer with question id : ",
        this.question["_id"]
      );
      await this.questionStore.SetQuestionID(this.question["_id"]);
    },
    async UpvoteAnswer() {
      console.log("we will be upvoting this answer");
      console.log("question id : ", this.question["_id"]);
      console.log(
        "we will be upvoting this answer with question id : ",
        this.question["_id"]
      );
      await this.questionStore.SetQuestionID(this.question["_id"]);
      await this.questionStore.UpvoteAnswer();
    },
    async HideAnswer() {
      console.log("we will be hiding this answer");
      console.log(
        "we will be hiding this answer with question id : ",
        this.question["_id"]
      );
      await this.questionStore.SetQuestionID(this.question["_id"]);
      await this.questionStore.HideAnswer();
    },
  },
  async mounted() {
    console.log("we have enterd the question view");
    console.log("state question", this.questionStore.question);
    this.question = this.listStore.list.filter(
      (question) => question["_id"] === this.questionStore.question_ID
    )[0];
    console.log("question in question view :", this.question);
    this.answers = this.listStore.list.filter(
      (question) => question["_id"] === this.questionStore.question_ID
    )[0]["answers"];
    console.log("answers in question view :", this.answers);
    this.comments = this.listStore.list.filter(
      (question) => question["_id"] === this.questionStore.question_ID
    )[0]["comments"];
    console.log("comments in question view :", this.comments);
    this.$emit("askView");
    this.colourStore.colourQuestionView();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  overflow-y: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

.MainQuestion {
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 2px solid;
}

.List {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

.QuestionBox {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
