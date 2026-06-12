<template>
  <div class="questions-page">
    <div class="tabs-shell">
      <button class="tab-button" type="button" @click="goToAnnouncements">
        Announcements
        <span v-if="authStore.role !== 7669 && questionStore.announcementsCount > 0" class="count-badge">{{ questionStore.announcementsCount }}</span>
      </button>
      <button class="tab-button active" type="button">
        Questions
        <span v-if="authStore.role !== 7669 && questionStore.pendingCount > 0" class="count-badge unanswered">{{ questionStore.pendingCount }}</span>
      </button>
    </div>

    <div class="category-row">
      <button
        v-for="(category, index) in categories"
        :key="category"
        type="button"
        class="category-pill"
        :class="{ selected: index === selectedCategoryIndex }"
        @click="selectCategory(index)"
      >
        <span>{{ windowWidth < 750 ? `${category} (${getCategoryCount(category)})` : category }}</span>
        <span v-if="index === selectedCategoryIndex" class="close-mark">x</span>
      </button>
    </div>

    <label class="feed-search">
      <span class="search-icon"></span>
      <input
        v-model="searchQuery"
        type="search"
        :placeholder="windowWidth < 750 ? 'Search question' : 'Search'"
        aria-label="Search questions"
      />
    </label>

    <div class="filter-row">
      <button class="sort-by-pill-mobile mobile-only" type="button">
        <span class="sort-lines-icon"></span>
        <span>Sort by</span>
      </button>

      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="filter-pill"
        :class="{ selected: selectedFilters.includes(filter) }"
        @click="toggleFilter(filter)"
      >
        <span>{{ filter }}</span>
        <span v-if="selectedFilters.includes(filter)" class="close-mark">x</span>
      </button>
    </div>

    <div class="question-list">
      <Question
        v-for="question in filteredQuestions"
        :key="question._id || question.id"
        class="QuestionBox"
        @expand="$emit('expand')"
        :showAnswerBox="true"
        :question="question"
        :searchTerm="searchQuery"
        @comment="$emit('comment')"
        @askView="$emit('askView')"
      />
    </div>
  </div>
</template>

<script>
import Question from "../components/common/questionBox.vue";
import Fuse from "fuse.js";

import { useAuthStore } from "../stores/auth";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";
import { useQuestionStore } from "../stores/question";

export default {
  name: "Questions",
  components: {
    Question,
  },
  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    const questionStore = useQuestionStore();
    return { authStore, listStore, colourStore, questionStore };
  },
  data() {
    return {
      questions: [],
      searchQuery: "",
      categories: [
        "Hostel",
        "Admission",
        "Placements",
        "Academics",
        "Campus Life",
        "Clubs",
        "Orientation",
        "Miscellaneous",
      ],
      filters: ["Answered", "Latest", "Most commented", "Most upvoted", "Unanswered"],
      selectedCategoryIndex: null,
      selectedFilters: [],
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    filteredQuestions() {
      let result = [...this.questions];

      const wantsAnswered = this.selectedFilters.includes("Answered");
      const wantsUnanswered = this.selectedFilters.includes("Unanswered");

      if (wantsAnswered && !wantsUnanswered) {
        result = result.filter((q) => q.status === true || (q.answers && q.answers.length > 0));
      } else if (!wantsAnswered && wantsUnanswered) {
        result = result.filter((q) => q.status === false && (!q.answers || q.answers.length === 0));
      }

      if (this.selectedCategoryIndex !== null) {
        const activeCategory = this.categories[this.selectedCategoryIndex];
        const exactMatches = result.filter((q) => q.tag === activeCategory);
        const remaining = result.filter((q) => q.tag !== activeCategory);
        const categoryFuse = new Fuse(remaining, {
          keys: ["body", "title", "subject"],
          threshold: 0.5,
        });
        const fuzzyMatches = categoryFuse.search(activeCategory).map((res) => res.item);
        result = [...exactMatches, ...fuzzyMatches];
      }

      if (this.selectedFilters.includes("Most upvoted")) {
        result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      } else if (this.selectedFilters.includes("Most commented")) {
        result.sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
      } else if (this.selectedFilters.includes("Latest")) {
        result.sort((a, b) => new Date(b.asked_At) - new Date(a.asked_At));
      }

      if (this.searchQuery.trim()) {
        const fuse = new Fuse(result, {
          keys: ["body", "title", "user_Name", "User_name", "subject"],
          threshold: 0.45,
        });
        result = fuse.search(this.searchQuery).map((res) => res.item);
      }

      return result;
    },
  },
  methods: {
    getCategoryLabel(category) { return category; },
    getFilterLabel(filter) { return filter; },
    selectCategory(index) {
      this.selectedCategoryIndex = this.selectedCategoryIndex === index ? null : index;
    },
    toggleFilter(filter) {
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters = this.selectedFilters.filter((item) => item !== filter);
        return;
      }
      this.selectedFilters = [...this.selectedFilters, filter];
    },
    goToAnnouncements() {
      this.$router.push(this.authStore.vite_base + "/");
    },
    async fetchQuestions(tag = null) {
      const user_id = this.authStore.user_ID;
      const requestBody = { user_ID: user_id, type: 'question' };
      if (tag) requestBody.tag = tag;

      const bearer = `Bearer ${this.authStore.accessToken}`;
      const url = `${import.meta.env.VITE_API_BASE}/question/`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: bearer },
        });

        if (res.status === 200) {
          const data = await res.json();
          this.listStore.SetList(data);
          return data;
        } else if (res.status === 403) {
          const refreshRes = await this.authStore.Refresh();
          if (refreshRes && refreshRes.status === 200) {
            const newBearer = `Bearer ${this.authStore.accessToken}`;
            const retryRes = await fetch(url, {
              method: "GET",
              headers: { "Content-Type": "application/json", Authorization: newBearer },
            });
            const data = await retryRes.json();
            this.listStore.SetList(data);
            return data;
          } else {
            await this.authStore.Logout();
          }
        } else {
          await this.authStore.Logout();
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    },
    async handleTagSelected(tag) {
      await this.fetchQuestions(tag);
      this.questions = this.listStore.list || [];
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    getCategoryCount(category) {
      if (!Array.isArray(this.questions)) return 0;
      return this.questions.filter((q) => {
        const tag = q.tag || q.subject || q.category;
        return tag === category;
      }).length;
    },
  },
  async mounted() {
    await Promise.all([
      this.fetchQuestions(),
      this.questionStore.FetchAnnouncementsCount(),
      this.questionStore.FetchUnansweredCount()
    ]);
    this.questions = this.listStore.list || [];
    this.colourStore.colourQuestions();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.questions-page {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #1c1b1f;
  scrollbar-gutter: stable;
}

.questions-page *,
.questions-page *::before,
.questions-page *::after {
  box-sizing: border-box;
}

.tabs-shell {
  width: 280px;
  height: 46px;
  padding: 5px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;
}

.tab-button {
  flex: 1;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #000000;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.tab-button.active {
  background: #ffdf80;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #111111;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  margin-left: 6px;
  vertical-align: middle;
}

.count-badge.unanswered {
  background: #ff4d4d; /* Red for unanswered questions to grab attention */
}

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 64px;
  width: 100%;
}

.category-pill,
.filter-pill {
  height: 36px;
  border: none;
  border-radius: 999px;
  background: #faeebb;
  color: #000000;
  font-family: Inter, sans-serif;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  white-space: nowrap;
}

.category-pill {
  padding: 0 20px;
}

.category-pill.selected,
.filter-pill.selected {
  background: #ffdf80;
  box-shadow: inset 0 0 0 1px #c98e00;
}

.close-mark {
  font-size: 14px;
  line-height: 1;
  font-weight: 800;
}

/* FIXED & OPTIMIZED: Strict width boundaries with a sleek, compact container layout */
.feed-search {
  display: flex;
  align-items: center;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 100% !important;
  height: 54px; /* Reduced from 90px to a cleaner profile */
  margin-top: 20px;
  border-radius: 999px;
  background: #eeeeee;
  gap: 14px; 
  padding: 0 24px; /* Streamlined horizontal padding */
  flex-shrink: 0;
}

/* Clear upscale profile for higher resolution rendering */
.search-icon {
  position: relative;
  width: 24px;
  height: 24px;
  border: 2.5px solid #8e8e8e;
  border-radius: 50%;
  flex-shrink: 0;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 9px;
  height: 2.5px;
  background: #8e8e8e;
  right: -6px;
  bottom: 0px;
  transform: rotate(45deg);
  border-radius: 999px;
}

.feed-search input {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px; 
  font-weight: 600; 
  font-family: Inter, sans-serif;
  color: #1c1b1f;
}

.feed-search input::placeholder {
  color: #8e8e8e;
  font-weight: 500;
  opacity: 1;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  width: 100%;
}

.filter-pill {
  height: 28px;
  padding: 0 14px;
  background: #ededed;
  font-size: 13px;
}

.question-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-bottom: 28px;
}

.QuestionBox {
  width: 100%;
}

@media only screen and (max-width: 900px) {
  .category-row {
    margin-top: 24px;
  }
}

.mobile-only {
  display: none !important;
}

@media only screen and (max-width: 750px) {
  .mobile-only {
    display: inline-flex !important;
  }

  .questions-page {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .tabs-shell {
    order: 1;
    width: 100%;
    max-width: 320px;
    align-self: center;
  }

  .feed-search {
    order: 2;
    height: 48px;
    padding: 0 20px;
    margin-top: 18px;
  }

  .search-icon {
    width: 20px;
    height: 20px;
    border-width: 2px;
  }

  .search-icon::after {
    width: 7px;
    height: 2px;
    right: -4px;
  }

  .feed-search input {
    font-size: 16px;
  }

  .filter-row {
    order: 3;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
    width: 100%;
  }

  .filter-pill {
    font-size: 12px;
    height: 28px;
    padding: 0 14px;
  }

  .sort-by-pill-mobile {
    height: 28px;
    padding: 0 14px;
    border: none;
    border-radius: 999px;
    background: #ededed;
    color: #1c1b1f;
    font-family: Inter, sans-serif;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    cursor: pointer;
  }

  .sort-lines-icon {
    position: relative;
    width: 14px;
    height: 9px;
    display: inline-block;
  }

  .sort-lines-icon::before,
  .sort-lines-icon::after {
    content: "";
    position: absolute;
    left: 0;
    height: 1.5px;
    background: #1c1b1f;
    border-radius: 99px;
  }

  .sort-lines-icon::before {
    top: 0;
    width: 12px;
    box-shadow: 0 3.75px 0 #1c1b1f;
  }

  .sort-lines-icon::after {
    bottom: 0;
    width: 7px;
  }

  .category-row {
    order: 4;
    gap: 8px;
    margin-top: 18px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .category-pill {
    height: 32px;
    padding: 0 14px;
    font-size: 12px;
  }

  .question-list {
    order: 5;
    margin-top: 18px;
  }
}
</style>