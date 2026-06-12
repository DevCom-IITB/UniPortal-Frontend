<template>
  <div class="announcements-page">
    <div class="tabs-shell">
      <button class="tab-button active" type="button">
        Announcements
        <span v-if="authStore.role !== 7669 && infoposts.length > 0" class="count-badge">{{ infoposts.length }}</span>
      </button>

      <button
        class="tab-button"
        type="button"
        @click="goToQuestions"
      >
        Questions
        <span v-if="authStore.role !== 7669 && questionStore.pendingCount > 0" class="count-badge unanswered">{{ questionStore.pendingCount }}</span>
      </button>
    </div>

    <div class="search-container">
      <QuestionSearch />
    </div>

    <div class="announcement-list">
      <InfoBox
        v-for="infopost in filteredInfoposts"
        :key="infopost._id || infopost.id"
        class="InfoPostBox"
        :infopost="infopost"
        @expand="$emit('expand')"
        @edit="EditInfo"
      />
    </div>
  </div>
</template>

<script>
import InfoBox from "../components/common/InfoBox.vue";
import QuestionSearch from "../components/common/QuestionSearch.vue";
import Fuse from "fuse.js";

import { useAuthStore } from "../stores/auth";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";
import { useQuestionStore } from "../stores/question";

export default {
  name: "Infopost",

  components: {
    InfoBox,
    QuestionSearch,
  },

  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    const questionStore = useQuestionStore();

    return {
      authStore,
      listStore,
      colourStore,
      questionStore,
    };
  },

  data() {
    return {
      infoposts: [],
      searchQuery: "",
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    filteredInfoposts() {
      if (!this.searchQuery.trim()) {
        return this.infoposts;
      }

      const fuse = new Fuse(this.infoposts, {
        keys: ["body", "title", "user_Name", "User_name"],
        threshold: 0.2,
      });

      return fuse.search(this.searchQuery).map((result) => result.item);
    },
  },

  methods: {
    goToQuestions() {
      this.$router.push(this.authStore.vite_base + "/questions");
    },

    async fetchInfoPosts() {
      try {
        const bearer = `Bearer ${this.authStore.accessToken}`;
        const role = this.authStore.role;

        const get =
          role == 5980 || role == 1980 ? "get" : "getStu";

        console.log("bearer : ", bearer);
        console.log("fetching info posts");

        let res = await fetch(
          `${import.meta.env.VITE_API_BASE}/info/${get}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: bearer,
            },
          }
        );

        console.log("response : ", res);
        console.log("request sent");

        if (res.status === 200) {
          console.log("received response");

          const data = await res.json();

          console.log(data);

          this.listStore.SetList(data);

          return data;
        }

        if (res.status === 403) {
          console.log("refreshing token");

          const refreshRes = await this.authStore.Refresh();

          if (refreshRes.status === 200) {
            console.log("refreshed token");

            const newBearer = `Bearer ${this.authStore.accessToken}`;

            console.log("new bearer : ", newBearer);

            res = await fetch(
              `${import.meta.env.VITE_API_BASE}/info/${get}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: newBearer,
                },
              }
            );

            console.log("new request sent");

            const data = await res.json();

            console.log(data);

            this.listStore.SetList(data);

            return data;
          }

          console.log("refresh failed");

          await this.authStore.Logout();

          return;
        }

        await this.authStore.Logout();
      } catch (error) {
        console.error("Error fetching info posts:", error);
      }
    },

    async EditInfo(infopost) {
      console.log("editing info");
      console.log(infopost);

      this.$emit("edit", infopost);
    },

    async handleTagSelected(tag) {
      console.log("Selected tag:", tag);

      await this.fetchInfoPosts(tag);

      this.infoposts = this.listStore.list;

      console.log(this.infoposts);
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  async mounted() {
    await Promise.all([
      this.fetchInfoPosts(),
      this.questionStore.FetchUnansweredCount()
    ]);

    this.infoposts = this.listStore.list;
    this.questionStore.announcementsCount = this.infoposts.length;

    console.log(this.infoposts);

    await this.colourStore.colourInfopost();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.announcements-page {
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
  background: #ff4d4d;
}

.search-container {
  width: 100%;
  margin-top: 46px;
}

.announcement-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-top: 22px;
  padding-bottom: 30px;
}

.InfoPostBox {
  width: 100%;
}

@media only screen and (max-width: 750px) {
  .announcements-page {
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

  .search-container {
    order: 2;
    width: 100%;
    margin-top: 18px;
  }

  .announcement-list {
    order: 4;
    margin-top: 18px;
    gap: 16px;
  }
}
</style>