<template>
  <form class="asker" @submit.prevent="decide">
    <h2>{{ dialogTitle }}</h2>

    <div v-if="isAnnouncementMode" class="form-group">
      <label class="title-label">Title</label>
      <div class="title-field">
        <input
          v-model="announcementTitle"
          type="text"
          placeholder="Add the title"
          class="title-input"
        />
      </div>
    </div>

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
        v-if="questionStore.addImage && questionStore.action !== 8"
        class="attachment-button"
        type="button"
        @click="AddImages"
      >
        <svg v-if="isAnnouncementMode" class="attachment-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
        </svg>
        <span v-else class="attachment-icon"></span>
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
</template>

<script>
import add from "../icons/add_circle.svg";
import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "../../stores/colour";
import { useListStore } from "@/stores/list";
import Fuse from "fuse.js";
let posted = false;

export default {
  name: "askBox",
  setup() {
    const questionStore = useQuestionStore();
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    const listStore = useListStore();
    const sendQuery = async (query) => {
      try {
        return await questionStore.sendQuery(query.text);
      } catch (error) {
        console.error('Error sending query:', error);
        throw error;
      }
    };
    return { questionStore, authStore, colourStore, listStore, sendQuery };
  },
  props: {
    editBody: {
      type: String,
      default: "",
    },
    editTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: "",
      announcementTitle: "",
      selectedImages: [],
      previewImages: [],
      similarResults: [],
      selectedIdentity: "Name",
      identityOptions: ["Name", "Anonymous"],
      selectedCategory: "Hostel",
      categories: ["Hostel", "Admission", "Placements", "Academics", "Campus Life", "Clubs", "Orientation", "Miscellaneous"],
    };
  },
  computed: {
    dialogTitle() {
      const action = this.questionStore.action;
      if (action == 1) return "Answer question";
      if (action == 2 || action == 3) return "Add comment";
      if (action == 5) return "Create an announcement";
      if (action == 6) return "Edit announcement";
      return "Ask a question";
    },
    isAnnouncementMode() {
      return this.questionStore.action == 5 || this.questionStore.action == 6;
    },
    placeholderText() {
      const action = this.questionStore.action;
      if (action == 1) return "Write an answer";
      if (action == 2 || action == 3) return "Join the conversation";
      if (action == 5 || action == 6) return "Create announcement";
      return "Ask a question";
    },
    primaryActionLabel() {
      if (this.questionStore.action == 6 || this.questionStore.action == 8) return "Save";
      return "Post";
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
      this.announcementTitle = this.editTitle;
    } else if (this.questionStore.action == 8) {
      const q = this.questionStore.question;
      if (q && q.answers && q.answers.length > 0) {
        this.text = q.answers[0].body || "";
      }
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
      this.onQuestionTextInput();
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
        if (this.selectedIdentity === "Anonymous") {
          await this.questionStore.PostQuestionAnonymously(this.text, this.selectedImages, this.selectedCategory);
        } else {
          await this.questionStore.PostQuestion(this.text, this.selectedImages, this.selectedCategory);
        }
      } else if (decision == 5) {
        console.log("we will be posting info post");
        await this.questionStore.PostInfoPost(this.announcementTitle, this.text, this.selectedImages);
      } else if (decision == 6) {
        console.log(
          "we will be editing the infopost with id : ",
          this.questionStore.info_ID
        );
        await this.questionStore.EditInfoPost(this.announcementTitle, this.text);
      } else if (decision == 7) {
        console.log("we will be posting a new question Anonymously");
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.PostQuestionAnonymously(this.text, this.selectedImages, this.selectedCategory);
      } else if (decision == 8){
        console.log("we will be editing an answer");
        await this.questionStore.EditAnswer(this.text);
      }

      this.$emit("discard");
    },
    AddImages() {
      this.$refs.fileInput.click();
    },
    SelectingFiles(e) {
      if(e.target.files.length === 0) return;

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      const filesToAdd = [];
      Array.from(e.target.files).forEach((file) => {
        if (!allowedTypes.includes(file.type)) {
          alert(`File "${file.name}" is not a supported image format. Please upload JPEG, PNG, or GIF.`);
          return;
        }
        if (file.size > maxSize) {
          alert(`File "${file.name}" exceeds the maximum size of 10MB.`);
          return;
        }
        filesToAdd.push(file);
      });

      if (filesToAdd.length === 0) {
        e.target.value = null;
        return;
      }

      this.selectedImages.push(...filesToAdd);
      console.log(this.selectedImages);

      filesToAdd.forEach((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.previewImages.push(reader.result);
          }
        };
        reader.readAsDataURL(image);
      });
      console.log(this.previewImages);
      e.target.value = null;
    },
    RemoveImage(index) {
      this.previewImages.splice(index, 1);
      this.selectedImages.splice(index, 1);
    },
    onQuestionTextInput() {
      const q = this.text.trim();
      console.log("Searching for:", q, "List size:", this.listStore.list ? this.listStore.list.length : 0);
      
      if (q.length < 2) {
        this.similarResults = [];
        console.log("Query too short, clearing results.");
        return;
      }

      // Client-side fuzzy search using Fuse.js
      const options = {
        keys: ["body", "title", "subject"],
        threshold: 0.2,
        ignoreLocation: true,
        distance: 100,
      };

      const fuse = new Fuse(this.listStore.list || [], options);
      const results = fuse.search(q);
      console.log("Fuse search results:", results);
      
      this.similarResults = results.slice(0, 5).map(res => {
        const item = res.item;
        return {
          ...item,
          answered: Boolean(item.status || (item.answers && item.answers.length > 0))
        };
      });
      console.log("Final similarResults:", this.similarResults);
    },
    truncate(text, max = 100) {
      if (!text) return "";
      return text.length > max ? `${text.slice(0, max)}...` : text;
    },
    async openSimilar(item) {
      const id = item._id || item.id;
      console.log("Navigating to similar question. ID:", id, "Item:", item);
      
      if (!id) {
        console.error("No ID found for item:", item);
        return;
      }

      if (item.type === "infopost") {
        this.$emit("discard");
        this.$router.push({ name: "Infopost" });
        return;
      }

      const full = await this.questionStore.FetchQuestionById(id);
      if (!full) {
        console.error("Failed to fetch full question details for id:", id);
        return;
      }

      this.listStore.UpsertQuestion(full);
      await this.questionStore.SetQuestion(full);
      await this.questionStore.SetQuestionID(id);
      this.$emit("discard");
      
      console.log("Pushing to router named Questionview with params:", { id: id });
      this.$router.push({ name: "Questionview", params: { id: id } })
        .then(() => console.log("Navigation successful"))
        .catch(err => console.error("Navigation failed:", err));
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
  align-items: flex-start;
  color: #1c1b1f;
}

h2 {
  margin: 0 0 38px;
  font-size: 28px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0;
}

.form-group {
  width: 100%;
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
  position: relative;
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
  position: relative;
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
  width: 6px;
  height: 1.5px;
  left: 2.5px;
  top: 5px;
}

.attachment-icon::after {
  width: 1.5px;
  height: 6px;
  left: 5px;
  top: 2.5px;
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
  position: relative;
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

.discard {
  border: 1.5px solid #c98e00;
  background: #ffffff;
  color: #1c1b1f;
}

.title-label {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  color: #1c1b1f;
}

.title-field {
  width: 100%;
  height: 50px;
  border-radius: 22px;
  background: #eeeeee;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.title-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 500;
}

.title-input::placeholder {
  color: #b1b1b1;
}

.attachment-icon-svg {
  color: #1c1b1f;
  flex-shrink: 0;
}

@media only screen and (max-width: 750px) {
  .asker {
    min-height: auto;
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