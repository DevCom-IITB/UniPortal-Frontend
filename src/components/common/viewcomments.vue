<template>
  <div class="question">
    <div class="top">
      <div class="stamps">
        <div class="name">
          {{ comment["user_Name"] }}
        </div>

        <div class="timestamp">{{ timestamp }}</div>
      </div>
      <div class="Hide" @click="HideComment">
        <eye
          v-if="AuthStore.role == 5980 && !comment['hidden']"
          class="icon"
        /><closed_eye
          v-if="AuthStore.role == 5980 && comment['hidden']"
          class="icon"
        />
      </div>
    </div>
    <div class="qtext">
      {{ isTranslated ? translatedText : comment["body"] }}
    </div>
    <div
      class="translate-btn"
      @click.prevent="translateText"
      :style="{ color: colourStore.grey, cursor: 'pointer', fontSize: '10px', marginTop: '4px' }"
    >
      <span v-if="isTranslating">Translating...</span>
      <span v-else>{{ isTranslated ? 'Show Original' : 'Translate' }}</span>
    </div>
  </div>
</template>

<script>
import eye from "../icons/visibility.svg";
import closed_eye from "../icons/visibility_off.svg";
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "../../stores/colour";
import { useQuestionStore } from "@/stores/question";

export default {
  name: "viewcomments",
  props: {
    comment: Object,
    isAnswer: Boolean,
  },
  setup() {
    const AuthStore = useAuthStore();
    const colourStore = useColourStore();
    const QuestionStore = useQuestionStore();
    return { AuthStore, colourStore, QuestionStore };
  },
  components: {
    eye,
    closed_eye,
  },
  data() {
    return {
      timestamp: "",
      isTranslated: false,
      isTranslating: false,
      translatedText: '',
    };
  },
  methods: {
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: this.comment['body'],
            target_lang: 'en'
          })
        });
        const data = await response.json();
        this.translatedText = data.translated_text || 'Error translating text';
        this.isTranslated = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.isTranslating = false;
      }
    },
    async HideComment() {
      if (this.isAnswer) {
        console.log("we will be hiding a comment");
        await this.QuestionStore.SetCommentID(this.comment["_id"]);
        await this.QuestionStore.HideAnswerComment();
      } else {
        console.log("we will be hiding a comment");
        await this.QuestionStore.SetCommentID(this.comment["_id"]);
        await this.QuestionStore.HideQuestionComment();
      }
    },
  },
  mounted() {
    const date = new Date(this.comment["asked_At"]);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    this.timestamp = date.toLocaleString(undefined, options);
  },
};
</script>

<style scoped>
.question {
  padding: 6px 12px;
  width: 100%;
}

.top {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.stamps {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  margin-right: 16px;
  font-size: 16px;
  font-weight: 600;
}

.timestamp {
  font-size: 10px;
}

.timetext {
  text-align: center;
  margin-top: 4px;
  background-color: transparent;
}

.qtext {
  align-items: center;
}

.Hide {
  width: 2vw;
  cursor: pointer;
}

@media only screen and (max-width: 1150px) {
  .name {
    font-size: 12px;
  }
  .timestamp {
    font-size: 8px;
  }
  .qtext {
    font-size: 10px;
  }
}

@media only screen and (max-width: 750px) {
  .Hide {
    width: 4vw;
  }
}
</style>
