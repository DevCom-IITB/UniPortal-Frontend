<template>
  <div class="questions-page">
    <div class="tabs-shell">
      <button class="tab-button" type="button" @click="goToAnnouncements">Announcements</button>
      <button class="tab-button active" type="button">Questions</button>
    </div>

    <div class="search-container">
      <QuestionSearch />
    </div>

    <div class="filter-row">
      <button type="button" class="filter-pill selected">My questions</button>
      <button type="button" class="filter-pill">Latest</button>
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
import QuestionSearch from "../components/common/QuestionSearch.vue";
import Fuse from "fuse.js";

import { useAuthStore } from "../stores/auth";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";

export default {
  name: "MyQuestions",
  components: {
    Question,
    QuestionSearch,
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
    };
  },
  computed: {
    filteredQuestions() {
      if (!this.searchQuery.trim()) {
        return this.questions;
      }
      const fuse = new Fuse(this.questions, {
        keys: ["body", "title", "subject"],
        threshold: 0.45,
      });
      return fuse.search(this.searchQuery).map((result) => result.item);
    },
  },
  methods: {
    goToAnnouncements() {
      this.$router.push(this.authStore.vite_base + "/");
    },
    async fetchQuestions() {
      const user_id = this.authStore.user_ID;
      console.log("user id : ", user_id);
      const request = {
        user_ID: user_id,
      };

      console.log("body : ", request);

      const bearer = `Bearer ${this.authStore.accessToken}`;
      console.log("bearer : ", bearer);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/myQ`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify(request),
        });

        console.log("request sent");

        if (res.status === 200) {
          console.log("received response");
          const data = await res.json();
          this.listStore.SetList(data);
          return data;
        } else if (res.status === 403) {
          console.log("refreshing token");
          const refreshRes = await this.authStore.Refresh();

          if (refreshRes && refreshRes.status === 200) {
            console.log("refreshed token");
            const newBearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", newBearer);
            
            const retryRes = await fetch(`${import.meta.env.VITE_API_BASE}/question/myQ`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: newBearer,
              },
              body: JSON.stringify(request),
            });
            
            console.log("new request sent");
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
        console.error("Error fetching my questions:", error);
      }
    },
  },
  async mounted() {
    await this.colourStore.colourMyQuestions();
    await this.fetchQuestions();
    this.questions = this.listStore.list || [];
    console.log(this.questions);
  },
};
</script>

<style scoped>
.questions-page {
  width: 100%;
  min-height: 100%;
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

.feed-search {
  position: relative;
  width: 100%;
  height: 54px;
  margin-top: 72px;
  border-radius: 999px;
  background: #eeeeee;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
}

.search-icon {
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #9b9b9b;
  border-radius: 50%;
  flex-shrink: 0;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 2px;
  background: #9b9b9b;
  right: -6px;
  bottom: 1px;
  transform: rotate(45deg);
  border-radius: 999px;
}

.feed-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
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
  border: none;
  border-radius: 999px;
  background: #ededed;
  padding: 0 14px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #000000;
}

.filter-pill.selected {
  background: #ffdf80;
  box-shadow: inset 0 0 0 1px #c98e00;
}

.question-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-bottom: 28px;
}

@media only screen and (max-width: 750px) {
  .tabs-shell {
    width: 100%;
    max-width: 320px;
  }

  .feed-search {
    margin-top: 28px;
  }
}
</style>