<template>
  <div class="announcements-page">
    <div class="tabs-shell">
      <button class="tab-button active" type="button">
        Announcements
      </button>

      <button
        class="tab-button"
        type="button"
        @click="goToQuestions"
      >
        Questions
      </button>
    </div>

    <label class="feed-search">
      <span class="search-icon"></span>

      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search"
        aria-label="Search announcements"
      />
    </label>

    <button class="sort-pill" type="button">
      <span>Sort by</span>
      <span class="sort-icon"></span>
    </button>

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
import Fuse from "fuse.js";

import { useAuthStore } from "../stores/auth";
import { useListStore } from "../stores/list";
import { useColourStore } from "../stores/colour";

export default {
  name: "Infopost",

  components: {
    InfoBox,
  },

  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();

    return {
      authStore,
      listStore,
      colourStore,
    };
  },

  data() {
    return {
      infoposts: [],
      searchQuery: "",
    };
  },

  computed: {
    filteredInfoposts() {
      if (!this.searchQuery.trim()) {
        return this.infoposts;
      }

      const fuse = new Fuse(this.infoposts, {
        keys: ["body", "title", "user_Name", "User_name"],
        threshold: 0.45,
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
  },

  async mounted() {
    await this.fetchInfoPosts();

    this.infoposts = this.listStore.list;

    console.log(this.infoposts);

    await this.colourStore.colourInfopost();
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

.feed-search {
  width: 100%;
  height: 54px;
  margin-top: 46px;
  border-radius: 999px;
  background: #eeeeee;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 22px;
  position: relative;
}

.search-icon {
  width: 19px;
  height: 19px;
  border: 2px solid #9b9b9b;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
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

.sort-pill {
  width: fit-content;
  height: 30px;
  margin-top: 9px;
  border: none;
  border-radius: 999px;
  background: #faeebb;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
}

.sort-icon {
  width: 16px;
  height: 12px;
  position: relative;
}

.sort-icon::before,
.sort-icon::after {
  content: "";
  position: absolute;
  left: 0;
  height: 1.8px;
  background: #1c1b1f;
  border-radius: 99px;
}

.sort-icon::before {
  top: 3px;
  width: 14px;
}

.sort-icon::after {
  bottom: 3px;
  width: 8px;
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
  .tabs-shell {
    width: 100%;
    max-width: 320px;
  }

  .feed-search {
    margin-top: 28px;
    height: 48px;
    padding: 0 18px;
  }
}
</style>