<template>
  <div class="question-shell">
    <div class="delete-modal-overlay" v-if="showDeleteModal" @click.self="showDeleteModal = false">
      <div class="delete-modal">
        <h3>Are you sure you want to<br/>delete this answer?</h3>
        <div class="modal-actions">
          <button class="btn-delete-confirm" type="button" @click.stop="confirmDelete">Delete</button>
          <button class="btn-cancel" type="button" @click.stop="showDeleteModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <article class="question-card" :class="{ answered: isAnswered }">
      <button class="question-content" type="button" @click="openQuestion">
        <div class="question-main">
          <div class="question-meta-row">
            <div class="question-meta">
              <span class="avatar">
                <Logo />
              </span>
              <span class="author">{{ userName }}</span>
              <span class="dot"></span>
              <span class="timestamp">{{ displayTimestamp }}</span>
            </div>
            
            <span class="status-pill mobile-only" :class="{ resolved: isAnswered }">
              {{ isAnswered ? "Answered" : "Unanswered" }}
            </span>
          </div>

          <h2 class="question-title" aria-live="polite">
            <template v-for="(part, index) in titleParts" :key="index">
              <mark v-if="part.match">{{ part.text }}</mark>
              <span v-else>{{ part.text }}</span>
            </template>
          </h2>
        </div>

        <div class="question-side desktop-only">
          <span class="subject-pill">{{ subjectLabel }}</span>
          <span class="comment-pill">
            <span class="comment-icon"></span>
            <span>({{ commentCount }})</span>
          </span>
          <span class="status-pill" :class="{ resolved: isAnswered }">
            {{ isAnswered ? "Answered" : "Unanswered" }}
          </span>
          <button v-if="(AuthStore.role == 5980 || AuthStore.role == 6311) && !isAnswered" class="answer-pill-yellow" type="button" @click.stop="toggleInlineAnswer(false)">
            Answer
          </button>
        </div>
      </button>

      <div v-if="isAnswering" class="inline-answer-container" @click.stop>
        <div class="inline-input-wrapper">
          <textarea v-model="inlineAnswerBody" placeholder="Answer a question" class="inline-textarea"></textarea>
          <div class="inline-input-bottom">
            <button class="add-attachment-btn" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              Add attachment
            </button>
          </div>
        </div>
        <div class="inline-answer-actions">
          <button class="btn-send" type="button" @click="submitInlineAnswer">
            Send 
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
          <button class="btn-cancel" type="button" @click="cancelInlineAnswer">Cancel</button>
        </div>
      </div>

      <!-- Mobile bottom action row inside the card -->
      <div class="mobile-action-row mobile-only">
        <button class="mobile-action-pill upvote-pill" type="button" @click.stop="Upvote">
          <svg class="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path v-if="!isUpvoted" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            <path v-else d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
          </svg>
          <span>{{ upvoteCount }}</span>
        </button>
        <span class="mobile-action-pill subject-pill">{{ subjectLabel }}</span>
        <button class="mobile-action-pill comment-pill" type="button" @click.stop="CommentClick">
          <svg class="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>({{ commentCount }})</span>
        </button>
      </div>

      <div v-if="isAnswered" class="answer-preview-wrapper">
        <div class="answer-preview">
          <div class="answer-preview-text">
            <span>Answer from SMP</span>
            <p>{{ answerPreview }}</p>
          </div>
          <div class="answer-actions" v-if="(AuthStore.role == 5980 || AuthStore.role == 6311)">
            <button type="button" @click.stop="toggleInlineAnswer(true)" class="icon-btn" aria-label="Edit Answer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button type="button" @click.stop="deleteAnswer" class="icon-btn" aria-label="Delete Answer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- <div v-if="AuthStore.role == 5980" class="moderation-actions">
        <button type="button" @click.stop="Hide">
          {{ question.hidden ? "Show" : "Hide" }}
        </button>
        <button type="button" @click.stop="AnswerClick">Answer</button>
      </div> -->

      <div v-if="showComments" class="comment-boxes">
        <div
          :key="comment._id || comment.id"
          v-for="comment in commentsList"
          class="comment-box"
        >
          <viewcomments :comment="comment" />
        </div>
      </div>
    </article>

    <button class="upvote-stack desktop-only" type="button" @click="Upvote" aria-label="Upvote question" :title="isUpvoted ? 'Remove upvote' : 'Upvote'">
      <svg class="desktop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="!isUpvoted" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
        <path v-else d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
      </svg>
      <span>{{ upvoteCount }}</span>
    </button>
  </div>
</template>

<script>
import upvote from "../common/upvote.vue";
import viewcomments from "../common/viewcomments.vue";
import verified from "../icons/new_releases.svg";
import Uparrow from "../icons/add_comment.svg";
import eye from "../icons/visibility.svg";
import closed_eye from "../icons/visibility_off.svg";
import forum from "../icons/send.svg";
import alert from "../icons/Alert.svg";
import open from "../icons/open_in_new.svg";
import Logo from "../icons/Logo.svg";

import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";

export default {
  name: "Question",
  components: {
    upvote,
    verified,
    Uparrow,
    eye,
    alert,
    closed_eye,
    viewcomments,
    forum,
    open,
    Logo,
  },
  setup() {
    const QuestionStore = useQuestionStore();
    const AuthStore = useAuthStore();
    const colourStore = useColourStore();
    return {
      QuestionStore,
      AuthStore,
      colourStore,
    };
  },
  data() {
    return {
      showComments: false,
      commentbtn_text: "View Comments",
      windowWidth: window.innerWidth,
      images: [],
      isTranslated: false,
      isTranslating: false,
      translatedText: "",
      isUpvoted: false,
      isAnswering: false,
      isEditingAnswer: false,
      inlineAnswerBody: "",
      showDeleteModal: false,
    };
  },
  computed: {
    answersList() {
      return Array.isArray(this.question.answers) ? this.question.answers : [];
    },
    commentsList() {
      return Array.isArray(this.question.comments) ? this.question.comments : [];
    },
    isAnswered() {
      return Boolean(this.question.answered || this.answersList.length > 0);
    },
    userName() {
      if (this.question.is_Anonymous) return "Anonymous";
      return this.question.user_Name || this.question.User_name || "Rahul Sharma";
    },
    questionText() {
      return this.isTranslated
        ? this.translatedText
        : this.question.title || this.question.body || "";
    },
    subjectLabel() {
      const subject = this.question.tag || this.question.subject || this.question.category;
      if (!subject || subject === "subject1") return "Campus Life";
      return subject;
    },
    commentCount() {
      return this.commentsList.length;
    },
    upvoteCount() {
      return this.question.upvotes || 0;
    },
    answerPreview() {
      const answer = this.answersList[0];
      return answer && answer.body
        ? answer.body
        : "The answer will be here. The answer will be here. The answer will be here.";
    },
    displayTimestamp() {
      return this.formatShortDate(this.question.asked_At || this.question.timestamp);
    },
    titleParts() {
      return this.makeHighlightParts(this.questionText, this.searchTerm);
    },
  },
  methods: {
    makeHighlightParts(text, term) {
      const source = text || "";
      const needle = (term || "").trim().toLowerCase();
      if (!needle) return [{ text: source, match: false }];

      const parts = [];
      const lower = source.toLowerCase();
      let cursor = 0;
      let index = lower.indexOf(needle);

      while (index !== -1) {
        if (index > cursor) {
          parts.push({ text: source.slice(cursor, index), match: false });
        }
        parts.push({
          text: source.slice(index, index + needle.length),
          match: true,
        });
        cursor = index + needle.length;
        index = lower.indexOf(needle, cursor);
      }

      if (cursor < source.length) {
        parts.push({ text: source.slice(cursor), match: false });
      }

      return parts.length ? parts : [{ text: source, match: false }];
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
    async translateText() {
      if (this.isTranslated) {
        this.isTranslated = false;
        return;
      }

      if (this.translatedText) {
        this.isTranslated = true;
        return;
      }

      this.isTranslating = true;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/translate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: this.question.body,
            target_lang: "en",
          }),
        });
        const data = await response.json();
        this.translatedText = data.translated_text || "Error translating text";
        this.isTranslated = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.isTranslating = false;
      }
    },
    async viewComments() {
      this.showComments = !this.showComments;
      this.commentbtn_text =
        this.commentbtn_text === "View Comments" ? "Hide Comments" : "View Comments";
      await this.QuestionStore.SetQuestionID(this.question._id || this.question.id);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async AnswerClick() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetAction(1);
      await this.QuestionStore.SetAddImage(true);
      this.$emit("comment");
    },
    async deleteAnswer() {
      this.showDeleteModal = true;
    },
    async EditAnswerClick() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetAction(8);
      await this.QuestionStore.SetAddImage(false);
      this.$emit("comment");
    },
    toggleInlineAnswer(isEdit = false) {
      this.isAnswering = true;
      this.isEditingAnswer = isEdit;
      if (isEdit && this.question.answers && this.question.answers.length > 0) {
        this.inlineAnswerBody = this.question.answers[0].body || "";
      } else {
        this.inlineAnswerBody = "";
      }
    },
    cancelInlineAnswer() {
      this.isAnswering = false;
      this.inlineAnswerBody = "";
    },
    async submitInlineAnswer() {
      if (!this.inlineAnswerBody.trim()) return;
      await this.QuestionStore.SetQuestion(this.question);
      
      if (this.isEditingAnswer) {
        if (this.question.answers && this.question.answers.length > 0) {
           await this.QuestionStore.SetAnswerID(this.question.answers[0]._id || this.question.answers[0].id);
        }
        await this.QuestionStore.EditAnswer(this.inlineAnswerBody);
      } else {
        await this.QuestionStore.AddAnswer(this.inlineAnswerBody, []);
      }
      
      this.isAnswering = false;
      this.inlineAnswerBody = "";
    },
    async CommentClick() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetAction(2);
      await this.QuestionStore.SetAddImage(false);
      this.$emit("comment");
    },
    async Upvote() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.UpvoteQuestion();
      this.isUpvoted = !this.isUpvoted;
    },
    async confirmDelete() {
      if (this.question.answers && this.question.answers.length > 0) {
        await this.QuestionStore.SetQuestion(this.question);
        await this.QuestionStore.SetQuestionID(this.question._id || this.question.id);
        await this.QuestionStore.SetAnswerID(this.question.answers[0]._id || this.question.answers[0].id);
        await this.QuestionStore.DeleteAnswer();
      }
      this.showDeleteModal = false;
    },
    async Hide() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.HideQuestion();
    },
    async SetQuestionView() {
      console.log(this.question);
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetQuestionID(this.question._id || this.question.id);
    },
    async openQuestion() {
      await this.SetQuestionView();
      const qId = this.question._id || this.question.id;
      this.$router.push(this.AuthStore.vite_base + "/question/" + qId);
    },
    async alertClick() {
      await this.QuestionStore.SetShowSnackBar(true);
      await this.colourStore.SetSnackColor(false);
      await this.QuestionStore.SetSnackMessage(
        "This query may have already been answered in an InfoPost or on the Questions page. Please have a careful look!"
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.images = this.question.images || [];
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    showAnswerBox: {
      type: Boolean,
      required: true,
    },
    searchTerm: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.question-shell {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  gap: 18px;
  align-items: center;
}

.question-card {
  width: 100%;
  min-height: 78px;
  background: #fffdf5;
  border: 1px solid #e8dba9;
  border-radius: 12px;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.question-card.answered {
  min-height: 154px;
}

.question-content {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  text-align: left;
  cursor: pointer;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
}

.question-main {
  min-width: 0;
}

.question-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
  white-space: nowrap;
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

.author {
  font-size: 11px;
  line-height: 1;
  font-weight: 800;
  color: #1c1b1f;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1c1b1f;
  flex-shrink: 0;
}

.timestamp {
  font-size: 10px;
  line-height: 1;
  font-weight: 400;
  color: #777777;
}

.admin-actions {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}

.circle-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #1c1b1f;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.circle-btn:hover {
  background: #f0f0f0;
}

.circle-btn .icon {
  width: 12px;
  height: 12px;
}

.question-title {
  margin: 0;
  color: #1c1b1f;
  font-size: 17px;
  line-height: 1.18;
  font-weight: 800;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.question-title span,
.question-title mark {
  font-weight: 800;
}

.question-title mark {
  padding: 0 2px;
  background: #ffdf40;
  color: #1c1b1f;
}

.question-side {
  display: flex;
  align-items: center;
  gap: 14px;
}

.subject-pill,
.comment-pill,
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

.subject-pill,
.comment-pill {
  border: 1px solid #1c1b1f;
  background: #fffdf5;
  color: #1c1b1f;
}

.subject-pill {
  min-width: 102px;
  padding: 0 16px;
}

.comment-pill {
  position: relative;
  min-width: 66px;
  gap: 8px;
  padding: 0 13px;
}

.comment-icon {
  position: relative;
  width: 14px;
  height: 10px;
  border: 1.5px solid #1c1b1f;
  border-radius: 4px;
}

.comment-icon::after {
  content: "";
  position: absolute;
  left: 3px;
  bottom: -4px;
  width: 5px;
  height: 5px;
  border-left: 1.5px solid #1c1b1f;
  border-bottom: 1.5px solid #1c1b1f;
  transform: skewY(-28deg);
}

.status-pill {
  min-width: 104px;
  padding: 0 16px;
  background: #ffd9e2;
  color: #ff2a83;
}

.status-pill.resolved {
  background: #c9f5d8;
  color: #0ca44f;
}

.answer-preview-wrapper {
  margin-top: 16px;
}

.answer-preview {
  min-height: 54px;
  border: 1px solid #c9c9c9;
  border-radius: 22px;
  background: #ffffff;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answer-preview-text {
  flex-grow: 1;
  padding-right: 12px;
}

.answer-preview-text span {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 1;
  font-weight: 400;
  color: #9b9b9b;
}

.answer-preview-text p {
  margin: 0;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 500;
  color: #1c1b1f;
}

.answer-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.answer-actions .icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #1c1b1f;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1c1b1f;
}

.upvote-stack {
  width: 34px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
}

.upvote-stack span:last-child {
  font-size: 12px;
  line-height: 1;
  font-weight: 600;
}

.thumb-icon {
  position: relative;
  width: 28px;
  height: 28px;
  border: 1.5px solid #1c1b1f;
  border-radius: 50%;
  background: #fff6c9;
}

.thumb-icon::before {
  content: "";
  position: absolute;
  left: 11px;
  top: 7px;
  width: 8px;
  height: 13px;
  border: 1.7px solid #1c1b1f;
  border-left: none;
  border-radius: 2px 5px 5px 2px;
  transform: rotate(18deg);
}

.thumb-icon::after {
  content: "";
  position: absolute;
  left: 7px;
  bottom: 7px;
  width: 6px;
  height: 8px;
  border: 1.7px solid #1c1b1f;
  border-radius: 2px;
  background: #fff6c9;
}

.desktop-icon {
  width: 24px;
  height: 24px;
  color: #1c1b1f;
  margin-bottom: 2px;
}

.answer-pill-yellow {
  min-height: 28px;
  border-radius: 999px;
  background: #ffdf80;
  color: #1c1b1f;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  border: none;
  padding: 0 16px;
  cursor: pointer;
}

.moderation-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.inline-answer-container {
  padding: 12px 0 0 0;
}

.inline-input-wrapper {
  border: 1px solid #c9c9c9;
  border-radius: 12px;
  background: #ffffff;
  padding: 12px;
  margin-bottom: 12px;
}

.inline-textarea {
  width: 100%;
  min-height: 40px;
  border: none;
  background: transparent;
  resize: vertical;
  font-family: inherit;
  font-size: 13px;
  color: #1c1b1f;
  outline: none;
}

.inline-input-bottom {
  margin-top: 8px;
}

.add-attachment-btn {
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: transparent;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.inline-answer-actions {
  display: flex;
  gap: 12px;
}

.btn-send {
  background: #ffdf80;
  border: 1px solid #c9c9c9;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-cancel {
  background: #ffffff;
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
}

.moderation-actions button {
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: transparent;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.comment-boxes {
  margin-top: 12px;
  border-top: 1px solid #eee2b6;
  padding-top: 8px;
}

.mobile-only {
  display: none !important;
}

@media only screen and (max-width: 980px) {
  .question-content {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .question-side {
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media only screen and (max-width: 750px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  span.mobile-only {
    display: inline-flex !important;
  }

  .question-shell {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .question-card {
    border-radius: 16px;
    border: 1px solid #faeebb;
    background: #fffdf5;
    padding: 16px;
  }

  .question-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  }

  .status-pill.mobile-only {
    display: inline-flex !important;
    min-height: auto;
    height: 22px;
    padding: 0 10px;
    font-size: 11px;
    border-radius: 99px;
    font-weight: 700;
  }

  .question-title {
    font-size: 16px;
    line-height: 1.25;
    margin-top: 4px;
  }

  .mobile-action-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
    width: 100%;
  }

  .mobile-action-pill {
    height: 30px;
    border: 1px solid #e8dba9;
    border-radius: 99px;
    background: #ffffff;
    color: #1c1b1f;
    font-family: Inter, sans-serif;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    gap: 6px;
    cursor: pointer;
    box-shadow: none;
  }

  .mobile-action-pill.subject-pill {
    cursor: default;
    background: #ffffff;
    border-color: #e8dba9;
  }

  .mobile-icon {
    width: 13px;
    height: 13px;
    color: #1c1b1f;
  }

  .answer-preview {
    margin-top: 12px;
    border: 1px solid #e8e8e8;
    border-radius: 16px;
    background: #ffffff;
    padding: 12px 14px;
  }
}

.delete-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-modal {
  background: white;
  border-radius: 24px;
  padding: 32px 40px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.delete-modal h3 {
  font-size: 22px;
  font-weight: 500;
  color: #1c1b1f;
  margin-bottom: 24px;
  line-height: 1.3;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-delete-confirm {
  background: #ffdf80;
  border: none;
  border-radius: 999px;
  padding: 10px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
}

.modal-actions .btn-cancel {
  border: 1px solid #1c1b1f;
  background: transparent;
  border-radius: 999px;
  padding: 10px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
}
</style>