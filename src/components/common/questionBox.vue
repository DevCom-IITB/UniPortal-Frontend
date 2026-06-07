<template>
  <div class="question-shell">
    <article class="question-card" :class="{ answered: isAnswered }">
      <button class="question-content" type="button" @click="openQuestion">
        <div class="question-main">
          <div class="question-meta">
            <span class="avatar">
              <Logo />
            </span>
            <span class="author">{{ userName }}</span>
            <span class="dot"></span>
            <span class="timestamp">{{ displayTimestamp }}</span>
          </div>

          <h2 class="question-title">
            <template v-for="(part, index) in titleParts" :key="index">
              <mark v-if="part.match">{{ part.text }}</mark>
              <span v-else>{{ part.text }}</span>
            </template>
          </h2>
        </div>

        <div class="question-side">
          <span class="subject-pill">{{ subjectLabel }}</span>
          <span class="comment-pill">
            <span class="comment-icon"></span>
            <span>({{ commentCount }})</span>
          </span>
          <span class="status-pill" :class="{ resolved: isAnswered }">
            {{ isAnswered ? "Answered" : "Unanswered" }}
          </span>
        </div>
      </button>

      <div v-if="isAnswered" class="answer-preview">
        <span>Answer from SMP</span>
        <p>{{ answerPreview }}</p>
      </div>

<<<<<<< Updated upstream
      <div class="QuestionBox">
        <div class="content" :style="{ background: colourStore.background }">
          <router-link
            :to="AuthStore.vite_base + '/question'"
            class="questionRoute"
            @comment="$emit('comment')"
            @click="SetQuestionView"
            @expand="$emit('expand')"
          >
            <div class="inner-container">
              <div class="stamps">
                <div class="info">
                  <div
                    class="name"
                    :style="{ color: colourStore.emphasis_text }"
                  >
                    {{ showName }}
                  </div>
                  <div class="timestamp" :style="{ color: colourStore.grey }">
                    {{ timestamp }}
                  </div>
                  <div
                    class="attached"
                    v-if="images.length > 0"
                    :style="{ color: colourStore.grey }"
                  >
                    &nbsp;&nbsp;Images Attached
                  </div>
                </div>
                <div
                  v-if="question.answers.length > 0"
                  class="verified"
                  :style="{ color: colourStore.grey }"
                >
                  <verified class="icon" />&nbsp;
                  <p>Answered</p>
                </div>
              </div>
              <div class="text" :style="{ color: colourStore.emphasis_text }">
                {{ question['body'] }}
              </div>
            </div>
          </router-link>
        </div>
        <div class="box-footer">
          <div
            class="Upvote"
            @click="Upvote"
            v-if="
              windowWidth <= 750 &&
              (AuthStore.role == 7669 || AuthStore.role == 1980)
            "
          >
            <upvote
              :upvotes="question.upvotes"
              :windowWidth="windowWidth"
            />
          </div>
          <div
            v-if="
              showAnswerBox &&
              (AuthStore.role == 5980 || AuthStore.role == 6311)
            "
            @click="AnswerClick"
            class="answer"
            :style="{
              color: colourStore.emphasis_text,
              background: colourStore.background,
            }"
          >
            <forum class="icon" />&nbsp;
            <p>Answer</p>
          </div>
          <router-link
            :to="AuthStore.vite_base + '/question'"
            @click="SetQuestionView"
            class="expand-route"
            @expand="$emit('expand')">
            <div
              v-if="
                showAnswerBox &&
                (AuthStore.role == 7669 || AuthStore.role == 1980)
              "
              class="expand"
              :style="{
                color: colourStore.emphasis_text,
                background: colourStore.background,
              }"
            >
              <open class="icon" />&nbsp;
              <p>Answers</p>
            </div>
          </router-link>
          <div class="Hide" v-if="windowWidth <= 750 && AuthStore.role == 5980" >
            <eye
              v-if="AuthStore.role == 5980 && !question['hidden']"
              class="icon"
              :svgColor="secondaryColor"
              @click="Hide"
            /><closed_eye
              v-if="AuthStore.role == 5980 && question['hidden']"
              class="icon"
              :svgColor="secondaryColor"
              @click="Hide"
            />
          </div>
          <div class="alert" v-if="question['hidden']">
            <alert
              v-if="
                question['hidden'] &&
                AuthStore.role == 7669 &&
                windowWidth <= 750
              "
              @click="alertClick"
            />
          </div>
          <div class="comments">
            <button
              class="view-comments"
              @click="viewComments"
              :style="{ color: colourStore.emphasis_text }"
            >
              {{ commentbtn_text }} ({{ question.comments.length }})
            </button>
            <button
              class="comment"
              @click="CommentClick"
              :style="{
                color: colourStore.emphasis_text,
                background: colourStore.background,
              }"
            >
              <Uparrow class="icon" />&nbsp;
              <p>Comment</p>
            </button>
          </div>
        </div>
=======
      <div v-if="AuthStore.role == 5980" class="moderation-actions">
        <button type="button" @click.stop="Hide">
          {{ question.hidden ? "Show" : "Hide" }}
        </button>
        <button type="button" @click.stop="AnswerClick">Answer</button>
>>>>>>> Stashed changes
      </div>

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

    <button class="upvote-stack" type="button" @click="Upvote" aria-label="Upvote question">
      <span class="thumb-icon"></span>
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
<<<<<<< Updated upstream
      showName:'',
=======
      isTranslated: false,
      isTranslating: false,
      translatedText: "",
>>>>>>> Stashed changes
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
      return this.question.user_Name || this.question.User_name || "Rahul Sharma";
    },
    questionText() {
      return this.isTranslated
        ? this.translatedText
        : this.question.title || this.question.body || "";
    },
    subjectLabel() {
      const subject = this.question.subject || this.question.category;
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
    async CommentClick() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetAction(2);
      await this.QuestionStore.SetAddImage(false);
      this.$emit("comment");
    },
    async Upvote() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.UpvoteQuestion();
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
      this.$router.push(this.AuthStore.vite_base + "/question");
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
<<<<<<< Updated upstream
    const date = new Date(this.question['asked_At']);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    this.timestamp = date.toLocaleString(undefined, options);
    this.images = this.question.images;
    if(this.question['is_Anonymous'] == true){
        if(this.AuthStore.role == 5980 || this.AuthStore.role == 6311){
          this.showName = this.question['user_Name'];
          console.log(this.AuthStore.role)
          console.log(this.AuthStore.name)
        }
        else{
          this.showName = "Anonymous"
        }
      }
      else{
        this.showName = this.question['user_Name'];
      }
=======
    this.images = this.question.images || [];
>>>>>>> Stashed changes
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
  min-width: 66px;
  gap: 8px;
  padding: 0 13px;
}

.comment-icon {
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

.answer-preview {
  margin-top: 16px;
  min-height: 54px;
  border: 1px solid #c9c9c9;
  border-radius: 22px;
  background: #ffffff;
  padding: 10px 16px;
}

.answer-preview span {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  line-height: 1;
  font-weight: 400;
  color: #9b9b9b;
}

.answer-preview p {
  margin: 0;
  font-size: 12px;
  line-height: 1.25;
  font-weight: 500;
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

.moderation-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
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
  .question-shell {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .question-card {
    padding: 13px;
  }

  .question-title {
    font-size: 15px;
  }

  .upvote-stack {
    width: auto;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 8px;
  }

  .thumb-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
