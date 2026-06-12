<template>
  <article class="announcement-card">
    <div class="announcement-meta">
      <span>ISMP Mentor</span>
      <span class="dot"></span>
      <span>{{ timestamp }}</span>
    </div>

    <h2>{{ announcementTitle }}</h2>

    <div class="announcement-body">
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
    </div>

    <div class="Images" v-if="images.length">
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

    <div
      class="mentor-actions"
      v-if="authStore.role == 5980 || authStore.role == 1980"
    >
      <button type="button" @click="Hide">
        <eye v-if="!infopost.hidden" class="icon" />
        <closed_eye v-if="infopost.hidden" class="icon" />
        <span>{{ infopost.hidden ? "Show" : "Hide" }}</span>
      </button>
      <button type="button" @click="Edit">
        <edit class="icon" />
        <span>Edit</span>
      </button>
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
    async Edit() {
      console.log("editing");
      await this.questionStore.SetInfoID(this.infopost._id || this.infopost.id);
      await this.questionStore.SetAction(6);
      console.log("emitting edit :", this.infopost);
      this.$emit("edit", this.infopost);
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
    const rawImages = this.infopost.images || this.infopost.imgs || [];
    this.images = rawImages.map((image) => {
      if (typeof image !== "string") return image;
      if (image.startsWith("http") || image.startsWith(".") || image.startsWith("/")) {
        return image;
      }
      return (
        (import.meta.env.VITE_NODE_ENV == "DEV"
          ? "http://localhost:5000/uploads/"
          : "https://gymkhana.iitb.ac.in/newbee/uploads/") + image
      );
    });
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
  margin-bottom: 6px;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  color: #1c1b1f;
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

.mentor-actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}

.mentor-actions button {
  border: 1px solid #1c1b1f;
  border-radius: 999px;
  background: transparent;
  min-height: 30px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
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