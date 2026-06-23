<template>
  <article class="announcement-card" :class="{ 'editing-mode': isEditing }">
    <div class="delete-modal-overlay" v-if="showDeleteModal" @click.self="showDeleteModal = false">
      <div class="delete-modal">
        <h3>Are you sure you want to<br/>delete this announcement</h3>
        <div class="modal-actions">
          <button class="btn-delete-confirm" @click="confirmDelete">Delete</button>
          <button class="btn-cancel" @click="showDeleteModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <div class="header-row">
      <div class="announcement-meta">
        <span>ISMP Mentor</span>
        <span class="dot"></span>
        <span>{{ timestamp }}</span>
      </div>
      <div class="admin-actions" v-if="authStore.role == 5980 || authStore.role == 6311">
        <button class="action-btn circle-btn" :class="{ active: isEditing }" @click="toggleEdit">
          <edit class="icon" />
        </button>
        <button class="action-btn circle-btn" @click="showDeleteModal = true">
          <svg class="icon trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>

    <h2>{{ announcementTitle }}</h2>

    <div class="announcement-body">
      <template v-if="!isEditing">
        <div ref="markdownWrapper" class="markdown-wrapper collapsed">
          <div class="arrow-container" v-if="announcementBody.includes('\n')">
            <rightArrow 
              class="arrow" 
              :class="{ rotated: isRotated }" 
              @click="toggleRotation" 
            />
          </div>
          <Markdown :source="getMarkdownContent()" />
        </div>
      </template>
      <template v-else>
        <textarea class="edit-textarea" v-model="editBody" placeholder="Edit announcement text..."></textarea>
        <button class="add-attachment-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
          Add attachment
        </button>
      </template>
    </div>

    <div class="Images" v-if="images.length && !isEditing">
      <button
        v-for="image in images"
        :key="image"
        class="img"
        type="button"
        @click="Expand(image)"
      >
        <img :src="image" alt="" />
      </button>
    </div>
    
    <div class="edit-actions" v-if="isEditing">
      <button class="btn-send" @click="saveEdit">
        Send 
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
      <button class="btn-cancel" @click="cancelEdit">Cancel</button>
    </div>


  </article>
</template>

<script>
import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import eye from "../icons/visibility.svg";
import closed_eye from "../icons/visibility_off.svg";
import edit from "../icons/edit2.svg";
import rightArrow from "../icons/right-arrow.svg";
import Markdown from "vue3-markdown-it";

export default {
  name: "InfoBox",
  setup() {
    const questionStore = useQuestionStore();
    const authStore = useAuthStore();
    return { questionStore, authStore };
  },
  props: {
    infopost: Object,
  },
  components: {
    rightArrow,
    eye,
    closed_eye,
    edit,
    Markdown,
  },
  data() {
    return {
      images: [],
      windowWidth: window.innerWidth,
      timestamp: "",
      isRotated: false,
      isEditing: false,
      showDeleteModal: false,
      editBody: "",
    };
  },
  computed: {
    announcementTitle() {
      return this.infopost.title || "Announcement title";
    },
    announcementBody() {
      return this.infopost.body || "";
    },
  },
  methods: {
    Expand(image) {
      console.log("link is : ", image);
      this.questionStore.SetImageLink(image);
      console.log("expanding");
      this.$emit("expand");
    },
    toggleRotation() {
      this.isRotated = !this.isRotated;
      const markdownWrapper = this.$refs.markdownWrapper;
      if (this.isRotated) {
        markdownWrapper.classList.remove('collapsed');
        markdownWrapper.classList.add('expanded');
      } else {
        markdownWrapper.classList.remove('expanded');
        markdownWrapper.classList.add('collapsed');
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Hide() {
      console.log("hiding");
      await this.questionStore.SetInfoID(this.infopost._id || this.infopost.id);
      await this.questionStore.HideInfoPost();
      this.$emit("hide");
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.editBody = this.infopost.body;
      }
    },
    cancelEdit() {
      this.isEditing = false;
    },
    async saveEdit() {
      await this.questionStore.SetInfoID(this.infopost._id || this.infopost.id);
      await this.questionStore.EditInfoPost(this.infopost.title, this.editBody);
      this.infopost.body = this.editBody;
      this.isEditing = false;
    },
    async confirmDelete() {
      await this.questionStore.SetInfoID(this.infopost._id || this.infopost.id);
      await this.questionStore.DeleteInfoPost();
      this.showDeleteModal = false;
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
    getMarkdownContent() {
      if (!this.isRotated && this.infopost.body) {
        const firstLineIndex = this.infopost.body.indexOf("\n");
        return firstLineIndex !== -1 ? this.infopost.body.substring(0, firstLineIndex) : this.infopost.body;
      }
      return this.infopost.body;
    },
  },
  mounted() {
  this.$nextTick(() => {
    window.addEventListener("resize", this.onResize);
  });
  console.log("we will be loggin the images");
  this.images = this.infopost.images;
  if (this.images.length > 0) {
    for (let i = 0; i < this.images.length; i++) {
      const temp =
        (import.meta.env.VITE_NODE_ENV == "DEV"
          ? import.meta.env.VITE_API_BASE + "/uploads/"
          : "https://gymkhana.iitb.ac.in/newbee/api/uploads/") + this.images[i];
      this.images[i] = temp;
    }
  }
  this.timestamp = this.formatShortDate(this.infopost.asked_At);
},
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.announcement-card {
  width: 100%;
  min-height: 160px;
  background: #fffdf5;
  border: 1px solid #e8dba9;
  border-radius: 18px;
  padding: 19px 17px 18px;
  display: flex;
  flex-direction: column;
  color: #1c1b1f;
}

.announcement-meta {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  color: #1c1b1f;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.admin-actions {
  display: flex;
  gap: 8px;
}

.circle-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #1c1b1f;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.circle-btn.active {
  background: #ffdf80;
}

.circle-btn:hover {
  background: #f0f0f0;
}

.circle-btn.active:hover {
  background: #e6c873;
}

.announcement-meta span {
  font-weight: 500;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #1c1b1f;
}

h2 {
  margin: 0 0 16px;
  font-size: 18px;
  line-height: 1.15;
  font-weight: 800;
  color: #1c1b1f;
}

.announcement-body {
  width: 100%;
  min-height: 72px;
  border: 1px solid #c9c9c9;
  border-radius: 24px;
  background: #ffffff;
  padding: 14px 17px;
  overflow: hidden;
}

.announcement-body :deep(p) {
  margin: 0;
  font-size: 13px;
  line-height: 1.18;
  font-weight: 400;
  color: #1c1b1f;
}

.edit-textarea {
  width: 100%;
  min-height: 60px;
  border: none;
  background: transparent;
  resize: vertical;
  font-family: inherit;
  font-size: 13px;
  color: #1c1b1f;
  outline: none;
  margin-bottom: 8px;
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

.edit-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn-send {
  background: #ffdf80;
  border: 1px solid transparent;
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
  background: transparent;
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #1c1b1f;
  cursor: pointer;
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

.Images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.img {
  width: 88px;
  height: 88px;
  border: 1px solid #d8d8d8;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: #f0f2f5;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
}

.markdown-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow: hidden;
  transition: max-height 0.8s ease-in-out, padding 0.3s ease-in-out;
}

.markdown-wrapper.collapsed .arrow-container {
  align-items: center;
}

.markdown-wrapper.expanded .arrow-container {
  align-items: flex-start;
}

.arrow {
  transform: rotate(90deg);
  width: 0.8rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  margin-right: 0.5rem;
  margin-top: 2px;
}

.arrow.rotated {
  transform: rotate(-90deg);
}

.markdown-wrapper.collapsed {
  max-height: 10rem;
  padding-bottom: 0;
}

.markdown-wrapper.expanded {
  max-height: 1000rem;
  padding-bottom: 16px;
}

.icon {
  width: 14px;
  height: 14px;
}

@media only screen and (max-width: 750px) {
  .announcement-card {
    border-radius: 16px;
    border: 1px solid #faeebb;
    background: #fffdf5;
    padding: 16px;
  }

  .announcement-body {
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    padding: 12px 14px;
  }
}
</style>
