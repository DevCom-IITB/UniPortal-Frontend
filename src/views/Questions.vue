<template>
  <div class="questions-page">
    <div class="tabs-shell">
      <button class="tab-button" type="button" @click="goToAnnouncements">Announcements</button>
      <button class="tab-button active" type="button">Questions</button>
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
        <span>{{ category }}</span>
        <span v-if="index === selectedCategoryIndex" class="close-mark">x</span>
      </button>
    </div>

    <label class="feed-search">
      <span class="search-icon"></span>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search"
        aria-label="Search questions"
      />
    </label>

    <div class="filter-row">
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

export default {
  name: "Questions",
  components: {
    Question,
  },
  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    return { authStore, listStore, colourStore };
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
      ],
      filters: ["Answered", "Latest", "Most commented", "Most upvoted", "Unanswered"],
      selectedCategoryIndex: null,
      selectedFilters: ["Answered", "Latest"],
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
        
        // Exact tag matches
        const exactMatches = result.filter((q) => q.tag === activeCategory);
        
        // Fuzzy search for remaining items
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
    selectCategory(index) {
      if (this.selectedCategoryIndex === index) {
        this.selectedCategoryIndex = null;
      } else {
        this.selectedCategoryIndex = index;
      }
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
      const requestBody = {
        user_ID: user_id,
        type: 'question',
      };
      
      if (tag) {
        requestBody.tag = tag;
      }

      const bearer = `Bearer ${this.authStore.accessToken}`;
      const url = `${import.meta.env.VITE_API_BASE}/question/`;

      console.log('fetching questions with URL:', url);

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          this.listStore.SetList(data);
          return data;
        } else if (res.status === 403) {
          console.log("refreshing token");
          const refreshRes = await this.authStore.Refresh();

          if (refreshRes && refreshRes.status === 200) {
            const newBearer = `Bearer ${this.authStore.accessToken}`;
            const retryRes = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: newBearer,
              },
            });
            const data = await retryRes.json();
            this.listStore.SetList(data);
            return data;
          } else {
            console.log("refresh failed");
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
      console.log('Selected tag:', tag);
      await this.fetchQuestions(tag);
      this.questions = this.listStore.list || [];
    },
  },
  async mounted() {
    await this.fetchQuestions();
    this.questions = this.listStore.list || [];
    this.colourStore.colourQuestions();
    if (typeof this.scrollToPosition === "function") {
      this.scrollToPosition();
    }
  },
};
</script>

<style scoped>
.questions-page {
  width: 100%;
  min-height: 100%;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  color: #1c1b1f;
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

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 64px;
  padding-right: 260px;
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

.feed-search {
  position: relative;
  width: 100%;
  height: 42px;
  margin-top: 20px;
  border-radius: 999px;
  background: #eeeeee;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
}

.search-icon {
  position: relative;
  width: 15px;
  height: 15px;
  border: 1.7px solid #9b9b9b;
  border-radius: 50%;
  flex-shrink: 0;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 6px;
  height: 1.7px;
  background: #9b9b9b;
  right: -4px;
  bottom: 0;
  transform: rotate(45deg);
  border-radius: 999px;
}

.feed-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 11px;
  font-weight: 500;
  font-family: Inter, sans-serif;
  color: #1c1b1f;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
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
    padding-right: 0;
    margin-top: 24px;
  }
}

@media only screen and (max-width: 750px) {
  .questions-page {
    padding-bottom: 20px;
  }

  .tabs-shell {
    width: 100%;
    max-width: 320px;
  }

  .category-row {
    gap: 8px;
  }

  .category-pill {
    height: 32px;
    padding: 0 14px;
    font-size: 12px;
  }

  .filter-pill {
    font-size: 12px;
  }
}
</style>