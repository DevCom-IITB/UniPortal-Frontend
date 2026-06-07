<template>
  <form class="asker" @submit.prevent="decide">
    <h2>{{ dialogTitle }}</h2>

<<<<<<< Updated upstream

  <form class="asker" @submit="OnSubmit" :style="{
    height: selectedImages.length === 0 && messages.length === 0 ? '25vh' : (messages.length > 0 && selectedImages.length > 0 ? '50vh' : (selectedImages.length > 0 || messages.length > 0 ? '38vh' : '30vh'))
  }">
    <div class="name">{{ nameOfPoster }}</div>
    <textarea class="text" :style="{ borderColor: colourStore.grey }" v-model="text" type="text"
      placeholder="Please be considerate of others when typing in your queries"></textarea>
    <div class="preview" v-if="selectedImages.length > 0">
      <div v-for="(image, index) in previewImages" :key="index" class="PreImage">
        <div class="cancel" @click="RemoveImage(index)" />
        <img :src="image" alt="Preview Image">
      </div>
    </div>
    <div class="actions">
      <div class="decision">
        <div class="discard" :style="{ color: colourStore.grey }" @click="$emit('discard')">Discard</div>
        <input class="post" :style="{ background: colourStore.primary }" value="Post" type="submit" @click="decide" />
      </div>
      <div v-if="questionStore.addImage" class="photo" :style="{ background: colourStore.background }"
        @click="AddImages">
        <input type="file" id="fileInput" @change="SelectingFiles" multiple />
        <add />&nbsp;&nbsp;
        <p>Add photo</p>
      </div>
    </div>
    <ul v-if="text.length != 0 && authStore.role == 7669" class="similarQues">
      <p> Click to view similar questions</p>
      <transition-group name="message-transition" tag="div">
        <li class="question" v-for="(msg, index) in messages" :key=index>
          <router-link :to="authStore.vite_base + '/question'" class="questionRoute" @click="SetQuestionView(msg)">
            {{ msg.question }}
          </router-link>
        </li>
      </transition-group>

    </ul>
  </form>

=======
    <div v-if="showIdentityControls" class="form-group compact">
      <label>How do you prefer to identify?</label>
      <div class="segmented-control">
        <button
          v-for="option in identityOptions"
          :key="option"
          type="button"
          :class="{ active: selectedIdentity === option }"
          @click="selectedIdentity = option"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div v-if="showCategoryControls" class="form-group">
      <label>Select a category</label>
      <div class="category-row">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="question-field">
      <textarea
        v-model="text"
        :placeholder="placeholderText"
        @input="onQuestionTextInput"
      ></textarea>
      <button
        v-if="questionStore.addImage"
        class="attachment-button"
        type="button"
        @click="AddImages"
      >
        <span class="attachment-icon"></span>
        <span>Add attachment</span>
      </button>
      <input
        ref="fileInput"
        type="file"
        id="fileInput"
        @change="SelectingFiles"
        multiple
      />
    </div>

    <div
      v-if="questionStore.action == 4 && similarResults.length"
      class="similar-panel"
    >
      <p class="similar-title">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Similar questions already asked — click to view
      </p>
      <button
        v-for="item in similarResults"
        :key="item._id"
        type="button"
        class="similar-item"
        :class="{ 'similar-answered': item.answered }"
        @click="openSimilar(item)"
      >
        <span class="similar-body">{{ truncate(item.body) }}</span>
        <span class="similar-badges">
          <span v-if="item.type === 'infopost'" class="sbadge sbadge-info">Infopost</span>
          <span v-else-if="item.answered" class="sbadge sbadge-ok">✓ Answered</span>
          <span v-else class="sbadge sbadge-open">Open</span>
        </span>
      </button>
    </div>

    <div class="preview" v-if="selectedImages.length > 0">
      <div v-for="(image, index) in previewImages" :key="index" class="PreImage">
        <button class="cancel" type="button" @click="RemoveImage(index)" aria-label="Remove attachment"></button>
        <img :src="image" alt="Preview Image" />
      </div>
    </div>

    <div class="actions">
      <button class="post" type="submit">{{ primaryActionLabel }}</button>
      <button class="discard" type="button" @click="$emit('discard')">Cancel</button>
    </div>
  </form>
>>>>>>> Stashed changes
</template>

<script>
import add from "../icons/add_circle.svg";
import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "../../stores/colour";
let posted = false;

export default {
  name: "askBox",
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  setup() {
    const questionStore = useQuestionStore();
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    const sendQuery = async (query) => {
      try {
        return await questionStore.sendQuery(query.text);
      } catch (error) {
        console.error('Error sending query:', error);
        throw error;
      }
    };
    return { questionStore, authStore, colourStore, sendQuery };
  },
  props: {
    editBody: {
      type: String,
      default: "",
    },
    nameOfPoster: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: "",
      selectedImages: [],
      previewImages: [],
<<<<<<< Updated upstream
      messages: [],
=======
      similarResults: [],
      similarDebounce: null,
      selectedIdentity: "Name",
      identityOptions: ["Name", "Anonymous"],
      selectedCategory: "Hostel",
      categories: ["Hostel", "Admission", "Placements", "Academics", "Campus Life", "Clubs"],
>>>>>>> Stashed changes
    };
  },
  computed: {
    dialogTitle() {
      const action = this.questionStore.action;
      if (action == 1) return "Answer question";
      if (action == 2 || action == 3) return "Add comment";
      if (action == 5) return "Post announcement";
      if (action == 6) return "Edit announcement";
      return "Ask a question";
    },
    placeholderText() {
      const action = this.questionStore.action;
      if (action == 1) return "Write an answer";
      if (action == 2 || action == 3) return "Join the conversation";
      if (action == 5 || action == 6) return "Write an announcement";
      return "Ask a question";
    },
    primaryActionLabel() {
      return this.questionStore.action == 6 ? "Save" : "Post";
    },
    showIdentityControls() {
      return this.questionStore.action == 4;
    },
    showCategoryControls() {
      return this.questionStore.action == 4;
    },
  },
  mounted() {
    if (this.editBody && this.questionStore.action == 6) {
      this.text = this.editBody;
    }
  },
  watch: {
    async text(newText) {
      if (this.authStore.role === 7669) {
        try {
          const messages = await this.sendQuery({ text: newText });
          this.messages = messages.map(item => ({ question: item.question, qid: item.qid }));
        } catch (error) {
          console.error('Error handling sendQuery response:', error);
        }
      }
    },
  },
  methods: {

    async OnSubmit(e) {
      e.preventDefault();
      if (!this.text && !posted) {
        alert("Please enter some text");
        return;
      }

      const newPost = {
        text: this.text,
      };

      this.$emit("post", newPost);
    },
    async decide(event) {
      if (event) event.preventDefault();
      if (!this.text && !posted) {
        alert("Please enter some text");
        return;
      }
      const decision = this.questionStore.action;
      if (decision == 1) {
        console.log(
          "we will be answering the question with id:",
          this.questionStore.question["_id"]
        );
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.AddAnswer(this.text, this.selectedImages);
      } else if (decision == 2) {
        console.log(
          "we will be commenting on the question with id:",
          this.questionStore.question["_id"]
        );
        await this.questionStore.AddCommentQuestion(this.text);
      } else if (decision == 3) {
        console.log(
          "we will be commenting on the answer with id:",
          this.questionStore.answer_ID,
          "with question id : ",
          this.questionStore.question_ID
        );
        await this.questionStore.AddCommentAnswer(this.text);
      } else if (decision == 4) {
        console.log("we will be posting a new question");
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.PostQuestion(this.text, this.selectedImages);
      } else if (decision == 5) {
        console.log("we will be posting info post");
        await this.questionStore.PostInfoPost(this.text, this.selectedImages);
      } else if (decision == 6) {
        console.log(
          "we will be editing the infopost with id : ",
          this.questionStore.info_ID
        );
        await this.questionStore.EditInfoPost(this.text);
      } else if (decision == 7) {
        console.log("we will be posting a new question Anonymously");
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.PostQuestionAnonymously(this.text, this.selectedImages);
        // await this.questionStore.AddCommentComment(this.text)
      }
      else if (decision == 8){
        console.log("we will be editing an answer");
        await this.questionStore.EditAnswer(this.text);
      }

      this.$emit("discard");
    },
    AddImages() {
      this.$refs.fileInput.click();
    },
    SelectingFiles(e) {
      this.selectedImages.push(...Array.from(e.target.files));
      console.log(this.selectedImages);

      Array.from(e.target.files).forEach((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.previewImages.push(reader.result);
          }
        };
        reader.readAsDataURL(image);
      });
      console.log(this.previewImages);
    },
    RemoveImage(index) {
      this.previewImages.splice(index, 1);
      this.selectedImages.splice(index, 1);
    },

<<<<<<< Updated upstream
    async SetQuestionView(question) {
      await this.questionStore.SetQuestionID(question['qid']);
      this.$emit('discard');
=======
      const q = this.text.trim();
      if (q.length < 3) {
        this.similarResults = [];
        return;
      }

      this.similarDebounce = setTimeout(async () => {
        this.similarResults = await this.questionStore.SearchQuestions(q, 5);
      }, 350);
    },
    truncate(text, max = 100) {
      if (!text) return "";
      return text.length > max ? `${text.slice(0, max)}...` : text;
    },
    async openSimilar(item) {
      if (item.type === "infopost") {
        this.$emit("discard");
        this.$router.push(this.authStore.vite_base + "/");
        return;
      }

      const full = await this.questionStore.FetchQuestionById(item._id);
      if (!full) return;

      this.listStore.UpsertQuestion(full);
      await this.questionStore.SetQuestion(full);
      await this.questionStore.SetQuestionID(full._id);
      this.$emit("discard");
      this.$router.push(this.authStore.vite_base + "/question");
>>>>>>> Stashed changes
    },
  },
  components: {
    add,
  },
  emits: ["discard", "post"],
};
</script>

<style scoped>
.asker {
  width: 100%;
  min-height: 488px;
  display: flex;
  flex-direction: column;
<<<<<<< Updated upstream
  justify-content: space-between;
  align-items: start;
  margin: 8px 0;
  min-height: 210px;
=======
  align-items: flex-start;
  color: #1c1b1f;
>>>>>>> Stashed changes
}

h2 {
  margin: 0 0 38px;
  font-size: 28px;
  line-height: 1;
  font-weight: 600;
<<<<<<< Updated upstream
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  /* border: 1px solid; */
=======
  letter-spacing: 0;
>>>>>>> Stashed changes
}

.form-group {
  width: 100%;
<<<<<<< Updated upstream
  height: 80px;
  max-height: 80px;
  border: 1px solid;
  border-radius: 10px;
  padding: 8px 8px;
  resize: none;
  margin: 8px 0;
=======
  margin-bottom: 21px;
}

.form-group.compact {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
}

.segmented-control {
  width: 170px;
  height: 36px;
  border-radius: 999px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  padding: 3px;
}

.segmented-control button,
.category-row button {
  border: none;
  background: transparent;
  color: #000000;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.segmented-control button {
  flex: 1;
  height: 30px;
  border-radius: 999px;
}

.segmented-control button.active {
  background: #ffdf80;
}

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-row button {
  height: 30px;
  padding: 0 13px;
  border: 1px solid #1c1b1f;
  border-radius: 999px;
}

.category-row button.active {
  background: #ffdf80;
  border-color: #ffdf80;
}

.question-field {
  width: 100%;
  height: 166px;
  border-radius: 22px;
  background: #eeeeee;
  padding: 17px 16px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

textarea {
  width: 100%;
  flex: 1;
  border: none;
  resize: none;
  outline: none;
  background: transparent;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 500;
}

textarea::placeholder {
  color: #b1b1b1;
}

input[type="file"] {
  display: none;
}

.attachment-button {
  width: fit-content;
  height: 32px;
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: #ffffff;
  padding: 0 13px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.attachment-icon {
  width: 14px;
  height: 14px;
  border: 1.5px solid #1c1b1f;
  border-radius: 50%;
}

.attachment-icon::before,
.attachment-icon::after {
  content: "";
  position: absolute;
  background: #1c1b1f;
  border-radius: 999px;
}

.attachment-icon::before {
  width: 8px;
  height: 1.5px;
  left: 3px;
  top: 6px;
}

.attachment-icon::after {
  width: 1.5px;
  height: 8px;
  left: 6px;
  top: 3px;
}

.similar-panel {
  width: 100%;
  margin-top: 12px;
  padding: 10px 12px;
  border: 1px solid #e3d6a6;
  border-radius: 14px;
  max-height: 180px;
  overflow-y: auto;
  background: #fffdf5;
}

.similar-title {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  color: #9e6c00;
  display: flex;
  align-items: center;
}

.similar-item {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 8px 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  border-radius: 6px;
  transition: background 0.12s;
}

.similar-item:hover {
  background: #fff8e1;
}

.similar-item.similar-answered {
  border-left: 3px solid #3aaa5c;
  padding-left: 9px;
}

.similar-item:last-child {
  border-bottom: none;
}

.similar-body {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.similar-badges {
  flex-shrink: 0;
}

.sbadge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.sbadge-ok {
  background: #e6f7ec;
  color: #1d7a3f;
  border: 1px solid #b3e6c7;
}

.sbadge-info {
  background: #fff7e0;
  color: #9e6c00;
  border: 1px solid #ffe09a;
}

.sbadge-open {
  background: #ffeef2;
  color: #d63864;
  border: 1px solid #ffb8cb;
>>>>>>> Stashed changes
}

.preview {
  width: 100%;
  min-height: 92px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.PreImage {
  width: 88px;
  height: 88px;
  border-radius: 10px;
  background: #f0f2f5;
  overflow: hidden;
}

.cancel {
  position: absolute;
  z-index: 1;
  right: 5px;
  top: 5px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: #ffdf80;
  cursor: pointer;
}

.cancel::before,
.cancel::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  width: 8px;
  height: 1.5px;
  background: #1c1b1f;
}

.cancel::before {
  transform: rotate(45deg);
}

.cancel::after {
  transform: rotate(-45deg);
}

.PreImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions {
  width: 100%;
  margin-top: auto;
  padding-top: 44px;
  display: flex;
<<<<<<< Updated upstream
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: end;
  margin: 8px 0;
}

.photo {
  height: 100%;
  border-radius: 50px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  justify-content: center;
=======
>>>>>>> Stashed changes
  align-items: center;
  gap: 14px;
}

.post,
.discard {
  width: 222px;
  height: 50px;
  border-radius: 999px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.post {
  border: none;
  background: #ffdf80;
  color: #1c1b1f;
}

<<<<<<< Updated upstream
.similarQues {
  list-style: none;
  width: 100%;
  margin: 0;
  padding-left: 8px;
  overflow-y: auto;
  transition: height 0.3s ease;
}

.question {
  margin: 8px 0;
}

.question a {
  text-decoration: none;
  color: #000;
}

.message-transition-enter-active,
.message-transition-leave-active {
  transition: all 0.2s ease;
=======
.discard {
  border: 1.5px solid #c98e00;
  background: #ffffff;
  color: #1c1b1f;
>>>>>>> Stashed changes
}

@media only screen and (max-width: 750px) {
  .asker {
<<<<<<< Updated upstream
    justify-content: space-between;
    height: fit-content;
=======
    min-height: auto;
>>>>>>> Stashed changes
  }

  h2 {
    margin-bottom: 28px;
    font-size: 24px;
  }

  .question-field {
    height: 150px;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
    padding-top: 28px;
  }

  .post,
  .discard {
    width: 100%;
  }
}
</style>
