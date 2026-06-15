<template>
  <div v-if="loading" class="loading-screen" style="text-align:center; padding: 40px; font-size: 18px; color:#555;">Loading question...</div>
  <div v-else class="question-detail">
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

    <button class="useful-row" type="button" @click="UpvoteToggle">
      <span class="useful-count">
        <span class="thumb-icon-svg">
          <Upvote1 v-if="isUpvoted" />
          <Upvote v-else />
        </span>
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
import Upvote from "../components/icons/upvote.svg";
import Upvote1 from "../components/icons/expand_more.svg";

import { useAuthStore } from '../stores/auth';
import { useQuestionStore } from "../stores/question";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";

export default {
  name: "Questionview",
  setup() {
    const authStore = useAuthStore();
    const questionStore = useQuestionStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    const AuthStore = useAuthStore();
    return { questionStore, listStore, colourStore, AuthStore };
  },
  components: { Logo, Upvote, Upvote1 },
  watch: {
    '$route.params.id': function (newId) {
      if (newId) {
        this.loadQuestion(newId);
      }
    }
  },
  data() {
    return {
      question: {},
      answers: [],
      comments: [],
      commentText: "",
      loading: true,
      isUpvoted: false,
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
      if (this.question.is_Anonymous) return "Anonymous";
      return this.question.user_Name || this.question.User_name || "Anonymous";
    },
    questionTitle() {
      return this.question.title || this.question.body || "";
    },
    subjectLabel() {
      const subject = this.question.tag || this.question.subject || this.question.category;
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
      return this.primaryAnswer.user_Name || this.primaryAnswer.User_name || "ISMP Mentor";
    },
    answerBody() {
      return this.primaryAnswer.body || "The answer will be here.";
    },
    answerTimestamp() {
      return this.formatShortDate(this.primaryAnswer.asked_At || this.primaryAnswer.timestamp);
    },
  },
  methods: {
    loadQuestion(id) {
      // Try the store first (set before navigation by questionBox)
      let q = this.questionStore.question;

      // If the store question doesn't match the route id, search the list
      if (!q || !q._id || String(q._id) !== String(id)) {
        const fromList = this.listStore.list.find(
          (item) => String(item._id || item.id) === String(id)
        );
        if (fromList) {
          q = fromList;
          this.questionStore.SetQuestion(fromList);
          this.questionStore.SetQuestionID(fromList._id);
        }
      }

      if (q && q._id) {
        this.question = q;
        this.answers = Array.isArray(q.answers) ? q.answers : [];
        this.comments = Array.isArray(q.comments) ? q.comments : [];
      }
      this.loading = false;
    },
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
    goBack() {
      this.$router.back();
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
    async UpvoteToggle() {
      await this.ensureQuestionSelected();
      await this.questionStore.UpvoteQuestion();
      this.isUpvoted = !this.isUpvoted;
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
  mounted() {
    const routeId = this.$route.params.id;
    if (routeId) {
      this.loadQuestion(routeId);
    } else {
      // Fallback: no route id, read directly from store
      const q = this.questionStore.question || {};
      this.question = q;
      this.answers = Array.isArray(q.answers) ? q.answers : [];
      this.comments = Array.isArray(q.comments) ? q.comments : [];
      this.loading = false;
    }
    this.$emit("askView");
    this.colourStore.colourQuestionView();
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

.thumb-icon-svg {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-icon-svg svg {
  width: 16px;
  height: 16px;
  color: #1c1b1f;
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