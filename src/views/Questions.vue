<template>
<<<<<<< Updated upstream
  <div class="container">
    <div class="Header">
      <Header :headerName="headerName" :headerText="headerText" :tags="tags" @tag-selected="handleTagSelected" />
    </div>
    <div class="Lister" @scroll="storePosition($event)">
      <div :key="question['id']" v-for="question in questions" class="QuestionBox">
        <Question @expand="$emit('expand')" :showAnswerBox="true" :question="question" :background="background"
          :primaryColor="primaryColor" :secondaryColor="secondaryColor" :primaryAccent="primaryAccent"
          @comment="$emit('comment')" @askView="$emit('askView')" />
      </div>
=======
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
>>>>>>> Stashed changes
    </div>
  </div>
</template>

<script>
<<<<<<< Updated upstream
import Question from '../components/common/questionBox.vue';
import Header from '../components/common/Header.vue';
=======
import Question from "../components/common/questionBox.vue";
import Fuse from "fuse.js";
>>>>>>> Stashed changes

import { useAuthStore } from "../stores/auth";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";

export default {
  name: "Questions",
  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    return { authStore, listStore, colourStore };
  },
  data() {
    return {
      questions: [],
<<<<<<< Updated upstream
      tags: ['All', 'SMA', 'Immunization', 'Documents', 'Orientation'], // example tags
      scrollPositionY: 0,
    };
  },
=======
      searchQuery: "",
      categories: [
        "Category (25)",
        "Category (25)",
        "Category (25)",
        "Category (25)",
        "Category (25)",
        "Category (25)",
      ],
      filters: ["Answered", "Latest", "Most commented", "Most upvoted", "Unanswered"],
      selectedCategoryIndex: 2,
      selectedFilters: ["Answered", "Latest"],
    };
  },
  computed: {
    filteredQuestions() {
      if (!this.searchQuery.trim()) {
        return this.questions;
      }
      const fuse = new Fuse(this.questions, {
        keys: ["body", "title", "user_Name", "User_name", "subject"],
        threshold: 0.45,
      });
      return fuse.search(this.searchQuery).map((result) => result.item);
    },
  },
>>>>>>> Stashed changes
  components: {
    Question,
  },
  methods: {
<<<<<<< Updated upstream
    storePosition(event) {
      this.scrollPositionY = event.target.scrollTop;
      localStorage.setItem('scrollPosition', this.scrollPositionY);
    },
    scrollToPosition() {
      this.$nextTick(() => {
        const listerDiv = this.$el.querySelector('.Lister');
        if (listerDiv) {
          const storedPosition = localStorage.getItem('scrollPosition');
          if (storedPosition) {
            listerDiv.scrollTop = parseInt(storedPosition, 10);
          }
        } else {
          console.error('Element with class "Lister" not found.');
        }
      });
    },
    async fetchQuestions(tag = '') {
=======
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
    async fetchQuestions() {
>>>>>>> Stashed changes
      const user_id = this.authStore.user_ID;
      const request = {
        user_ID: user_id,
      };
      const bearer = `Bearer ${this.authStore.accessToken}`;

<<<<<<< Updated upstream
      let url = `${import.meta.env.VITE_API_BASE}/question/otherQ`;
      let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
        body: JSON.stringify(request),
      };

      // Adjust URL and options based on tag selection
      if (tag && tag !== 'All') {
        url = `${import.meta.env.VITE_API_BASE}/taggedQ`;
        options = {
          method: 'POST',
=======
      console.log("bearer : ", bearer);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/otherQ`,
        {
          method: "PUT",
>>>>>>> Stashed changes
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({ type: 'question', tag }),
        };
      }

      console.log('bearer:', bearer);
      console.log('fetching questions with URL:', url);

      const res = await fetch(url, options);

      console.log("request sent");

      if (res.status === 200) {
        console.log("received response");
        const data = await res.json();
        console.log(data);
        this.listStore.SetList(data);
        return data;
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh();

          if (res.status === 200) {
<<<<<<< Updated upstream
            console.log('refreshed token');
            const newBearer = `Bearer ${this.authStore.accessToken}`;
            console.log('new bearer:', newBearer);
            options.headers.Authorization = newBearer;
            const newRes = await fetch(url, options);
            console.log('new request sent');
            const newData = await newRes.json();
            console.log(newData);
            this.listStore.SetList(newData);
            return newData;
=======
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/otherQ`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
                body: JSON.stringify(request),
              }
            );
            console.log("new request sent");
            const data = await res.json();
            console.log(data);
            this.listStore.SetList(data);
            return data;
>>>>>>> Stashed changes
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          await this.authStore.Logout();
        }
      }
    },
    async handleTagSelected(tag) {
      console.log('Selected tag:', tag);
      await this.fetchQuestions(tag);
      this.questions = this.listStore.list;
      console.log(this.questions);
    },
  },
  async mounted() {
    await this.fetchQuestions();
    this.questions = this.listStore.list;
    console.log(this.questions);
    this.colourStore.colourQuestions();
    this.scrollToPosition();
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

<<<<<<< Updated upstream
=======
@media only screen and (max-width: 900px) {
  .category-row {
    padding-right: 0;
    margin-top: 24px;
  }
}

>>>>>>> Stashed changes
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
