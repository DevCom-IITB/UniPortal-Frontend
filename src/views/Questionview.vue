<template>
<<<<<<< Updated upstream
  <div class="container">
    <div class="MainQuestion" @click="test" :style="{ borderBlockColor: secondaryColor }">
      <Question @expand="$emit('expand')" v-if="question && Object.keys(question).length > 0" :isAnswer="this.false"
        :upvotes="question['upvotes']" :showAnswerBox="this.true" :comments="questionStore.comments"
        :question="question" :background="background" :primaryColor="primaryColor" :secondaryColor="secondaryColor"
        :primaryAccent="primaryAccent" @comment="$emit('comment')" />
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
          @edit="EditAnswer"
        />
=======
  <div class="question-detail">
    <button class="go-back" type="button" @click="goBack">
      <span class="back-chevron"></span>
      <span>Go back</span>
    </button>

    <section class="detail-header">
      <div class="question-meta">
        <span class="avatar">
          <Logo />
        </span>
        <span class="author">{{ userName }}</span>
        <span class="dot"></span>
        <span class="timestamp">{{ displayTimestamp }}</span>
>>>>>>> Stashed changes
      </div>

      <h1>{{ questionTitle }}</h1>

      <div class="pill-row">
        <span class="subject-pill">{{ subjectLabel }}</span>
        <span v-if="!isAnswered" class="status-pill">Unanswered</span>
      </div>

      <div
        class="mentor-actions"
        v-if="AuthStore.role == 5980 || AuthStore.role == 6311"
      >
        <button type="button" @click="AnswerClick">Answer</button>
        <button v-if="AuthStore.role == 5980" type="button" @click="Hide">
          {{ question.hidden ? "Show" : "Hide" }}
        </button>
      </div>
    </section>

    <section v-if="isAnswered" class="answer-section" id="answer-section">
      <h2>Answer by the ISMP</h2>
      <article class="answer-card">
        <div class="answer-author">
          <span class="avatar large">
            <Logo />
          </span>
          <div>
            <strong>ISMP Mentor</strong>
            <span>{{ answerAuthor }}</span>
          </div>
        </div>
        <p>{{ answerBody }}</p>
        <time>{{ answerTimestamp }}</time>
      </article>
    </section>

    <button class="useful-row" type="button" @click="Upvote">
      <span class="useful-count">
        <span class="thumb-icon"></span>
        <span>{{ upvoteCount }}</span>
      </span>
      <span>I found this useful!</span>
    </button>

    <form class="comment-composer" @submit.prevent="submitComment">
      <input
        v-model="commentText"
        type="text"
        placeholder="Join the conversation"
        aria-label="Join the conversation"
      />
      <button type="submit">Post</button>
    </form>

    <section class="comments-section">
      <h2>Comments ({{ commentCount }})</h2>
      <article
        v-for="comment in comments"
        :key="comment._id || comment.id"
        class="comment-item"
      >
        <span class="avatar comment-avatar">
          <Logo />
        </span>
        <div class="comment-content">
          <div class="comment-meta">
            <strong>{{ comment.user_Name || comment.User_name || "Rahul Sharma" }}</strong>
            <span>{{ formatShortDate(comment.asked_At || comment.timestamp) }}</span>
          </div>
          <p>{{ comment.body }}</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import Logo from "../components/icons/Logo.svg";

import { useAuthStore } from '../stores/auth';
import { useQuestionStore } from "../stores/question";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";
import { useAuthStore } from "../stores/auth";

export default {
  name: "Questionview",
  setup() {
    const authStore = useAuthStore();
    const questionStore = useQuestionStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
<<<<<<< Updated upstream
    return { authStore, questionStore, listStore, colourStore };
=======
    const AuthStore = useAuthStore();
    return { questionStore, listStore, colourStore, AuthStore };
  },
  components: {
    Logo,
>>>>>>> Stashed changes
  },
  data() {
    return {
      question: {},
      answers: [],
      comments: [],
      commentText: "",
    };
  },
  computed: {
    isAnswered() {
      return Boolean(this.question.answered || this.answers.length > 0);
    },
    primaryAnswer() {
      return this.answers[0] || {};
    },
    userName() {
      return this.question.user_Name || this.question.User_name || "Rahul Sharma";
    },
    questionTitle() {
      return this.question.title || this.question.body || "What are the best electives for first-year CS students?";
    },
    subjectLabel() {
      const subject = this.question.subject || this.question.category;
      if (!subject || subject === "subject1") return "Campus Life";
      return subject;
    },
    upvoteCount() {
      return this.question.upvotes || 0;
    },
    commentCount() {
      return this.comments.length;
    },
    displayTimestamp() {
      return this.formatShortDate(this.question.asked_At || this.question.timestamp);
    },
    answerAuthor() {
      return this.primaryAnswer.user_Name || this.primaryAnswer.User_name || "Rahul Sharma";
    },
    answerBody() {
      return (
        this.primaryAnswer.body ||
        "The answer will be here. The answer will be here. The answer will be here. The answer will be here."
      );
    },
    answerTimestamp() {
      return this.formatShortDate(this.primaryAnswer.asked_At || this.primaryAnswer.timestamp);
    },
  },
  methods: {
    formatShortDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "12 May 26 07:45pm";
      }
      return date
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "")
        .replace(" am", "am")
        .replace(" pm", "pm");
    },
<<<<<<< Updated upstream
    async fetchQuestions() {
      const user_id = this.authStore.user_ID;
      const request = {
        user_ID: user_id,
      };
      const bearer = `Bearer ${this.authStore.accessToken}`;

      let url = `${import.meta.env.VITE_API_BASE}/question/otherQ`;
      let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
        body: JSON.stringify(request),
      };

      console.log('bearer:', bearer);
      console.log('fetching questions with URL:', url);

      const res = await fetch(url, options);

      console.log('request sent');

      if (res.status === 200) {
        console.log('received response');
        const data = await res.json();
        console.log(data);
        this.listStore.SetList(data);
        return data;
      } else {
        if (res.status === 403) {
          console.log('refreshing token');
          const res = await this.authStore.Refresh();

          if (res.status === 200) {
            console.log('refreshed token');
            const newBearer = `Bearer ${this.authStore.accessToken}`;
            console.log('new bearer:', newBearer);
            options.headers.Authorization = newBearer;
            const newRes = await fetch(url, options);
            console.log('new request sent');
            const newData = await newRes.json();
            console.log(newData);
            this.listStore.SetList(newData);
            return newData;
          } else {
            console.log('refresh failed');
            await this.authStore.Logout();
          }
        } else {
          await this.authStore.Logout();
        }
      }
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
=======
    goBack() {
      this.$router.back();
>>>>>>> Stashed changes
    },
    async ensureQuestionSelected() {
      await this.questionStore.SetQuestion(this.question);
      await this.questionStore.SetQuestionID(this.question._id || this.question.id);
    },
    async submitComment() {
      const text = this.commentText.trim();
      if (!text) return;
      await this.ensureQuestionSelected();
      await this.questionStore.AddCommentQuestion(text);
      this.commentText = "";
      this.comments = Array.isArray(this.question.comments) ? this.question.comments : this.comments;
    },
    async AnswerClick() {
      await this.ensureQuestionSelected();
      await this.questionStore.SetAction(1);
      await this.questionStore.SetAddImage(true);
      this.$emit("comment");
    },
    async Upvote() {
      await this.ensureQuestionSelected();
      await this.questionStore.UpvoteQuestion();
    },
    async Hide() {
      await this.ensureQuestionSelected();
      await this.questionStore.HideQuestion();
    },
    async EditAnswer(answer) {
      console.log('editing info');
      console.log(answer);
      this.$emit('edit', answer);
    },
  },
  async mounted() {
<<<<<<< Updated upstream
    await this.fetchQuestions();
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
=======
    const selectedId = this.questionStore.question_ID;
    const selectedFromList = this.listStore.list.find(
      (question) => String(question._id || question.id) === String(selectedId)
    );
    this.question = selectedFromList || this.questionStore.question || {};
    this.answers = Array.isArray(this.question.answers) ? this.question.answers : [];
    this.comments = Array.isArray(this.question.comments) ? this.question.comments : [];
>>>>>>> Stashed changes
    this.$emit("askView");
    this.colourStore.colourQuestionView();

    // If navigated from a search result that is answered, scroll to answer
    if (this.$route && this.$route.hash === "#answer") {
      this.$nextTick(() => {
        const el = document.getElementById("answer-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  },
};
</script>

<style scoped>
.question-detail {
  width: 100%;
  min-height: 100%;
  padding: 12px 0 42px;
  color: #1c1b1f;
}

.go-back {
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 1;
  font-weight: 800;
  cursor: pointer;
}

.go-back span:last-child {
  font-weight: 800;
}

.back-chevron {
  width: 18px;
  height: 18px;
  border-left: 3px solid #1c1b1f;
  border-bottom: 3px solid #1c1b1f;
  transform: rotate(45deg);
}

.detail-header {
  margin-top: 58px;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 7px;
}

.avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #214b43;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar svg {
  width: 10px;
  height: 10px;
  filter: invert(82%) sepia(81%) saturate(473%) hue-rotate(350deg) brightness(101%) contrast(101%);
}

.avatar.large {
  width: 34px;
  height: 34px;
}

.avatar.large svg {
  width: 22px;
  height: 22px;
}

.author {
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1c1b1f;
}

.timestamp {
  font-size: 10px;
  line-height: 1;
  font-weight: 400;
  color: #777777;
}

h1 {
  margin: 0;
  max-width: calc(100% - 260px);
  font-size: 28px;
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: 0;
  color: #1c1b1f;
}

.pill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 17px;
}

.subject-pill,
.status-pill {
  min-height: 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
}

.subject-pill {
  border: 1px solid #1c1b1f;
  background: #ffffff;
  min-width: 102px;
  padding: 0 16px;
}

.status-pill {
  min-width: 108px;
  padding: 0 16px;
  background: #ffd9e2;
  color: #ff2a83;
}

.mentor-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.mentor-actions button {
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: transparent;
  min-height: 30px;
  padding: 0 14px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.answer-section {
  margin-top: 58px;
}

.answer-section h2,
.comments-section h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
  color: #1c1b1f;
}

.answer-card {
  width: 100%;
  min-height: 70px;
  margin-top: 17px;
  border: 1px solid #c9c9c9;
  border-radius: 20px;
  background: #fffdf5;
  padding: 13px 16px;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}

.answer-author {
  display: flex;
  align-items: center;
  gap: 9px;
}

.answer-author div {
  display: flex;
  flex-direction: column;
}

.answer-author strong {
  font-size: 11px;
  line-height: 1.15;
  font-weight: 800;
}

.answer-author span {
  font-size: 10px;
  line-height: 1.15;
  font-weight: 500;
}

.answer-card p {
  margin: 0;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 500;
}

.answer-card time {
  font-size: 10px;
  line-height: 1;
  font-weight: 400;
  color: #777777;
}

.useful-row {
  margin-top: 42px;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 18px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
}

.useful-row > span:last-child {
  font-weight: 600;
}

.useful-count {
  min-width: 58px;
  height: 32px;
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
}

.thumb-icon {
  width: 18px;
  height: 18px;
}

.thumb-icon::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 2px;
  width: 7px;
  height: 12px;
  border: 1.7px solid #1c1b1f;
  border-left: none;
  border-radius: 2px 5px 5px 2px;
  transform: rotate(18deg);
}

.thumb-icon::after {
  content: "";
  position: absolute;
  left: 3px;
  bottom: 3px;
  width: 6px;
  height: 8px;
  border: 1.7px solid #1c1b1f;
  border-radius: 2px;
  background: #ffffff;
}

.comment-composer {
  width: 100%;
  margin-top: 54px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 112px;
  gap: 12px;
}

.comment-composer input {
  height: 50px;
  border: none;
  border-radius: 999px;
  background: #eeeeee;
  padding: 0 18px;
  outline: none;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #1c1b1f;
}

.comment-composer button {
  height: 50px;
  border: none;
  border-radius: 999px;
  background: #ffdf80;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.comments-section {
  margin-top: 24px;
}

.comment-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 11px;
  margin-top: 18px;
}

.comment-avatar {
  width: 34px;
  height: 34px;
}

.comment-avatar svg {
  width: 22px;
  height: 22px;
}

.comment-meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.comment-meta strong {
  font-size: 11px;
  line-height: 1;
  font-weight: 700;
}

.comment-meta span {
  margin-top: 2px;
  font-size: 10px;
  line-height: 1;
  font-weight: 400;
  color: #777777;
}

.comment-content p {
  margin: 0;
  font-size: 12px;
  line-height: 1.35;
  font-weight: 500;
}

@media only screen and (max-width: 900px) {
  h1 {
    max-width: 100%;
    font-size: 24px;
  }

  .answer-card {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .comment-composer {
    grid-template-columns: 1fr;
  }
}

@media only screen and (max-width: 750px) {
  .question-detail {
    padding-top: 0;
  }

  .detail-header {
    margin-top: 34px;
  }

  .answer-section {
    margin-top: 36px;
  }

  .useful-row {
    margin-top: 32px;
    font-size: 15px;
  }

  .comment-composer {
    margin-top: 34px;
  }
}
</style>
