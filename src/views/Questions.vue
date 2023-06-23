<template>
  <div class="container">
    <div class="Header">
      <Header
        :headerName="headerName"
        :headerText="headerText"
        :background="background"
        :primaryColor="primaryColor"
      />
    </div>
    <div class="Lister">
      <div
        :key="question['id']"
        v-for="question in questions"
        class="QuestionBox"
      >
        <Question
          @expand="$emit('expand')"
          :showAnswerBox="this.true"
          :question="question"
          :background="background"
          :primaryColor="primaryColor"
          :secondaryColor="secondaryColor"
          :primaryAccent="primaryAccent"
          @comment="$emit('comment')"
          @askView="$emit('askView')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Question from "../components/common/questionBox.vue";
import Header from "../components/common/Header.vue";

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
      headerName: "Questions",
      headerText: "Where all your friend's questions reside",
      questions: [],
      true: true,
      false: false,
    };
  },
  components: {
    Question,
    Header,
  },
  methods: {
    async fetchQuestions() {
      const user_id = this.authStore.user_ID;
      const request = {
        user_ID: user_id,
      };
      const bearer = `Bearer ${this.authStore.accessToken}`;

      console.log("bearer : ", bearer);

      const res = await fetch("api/question/otherQ", {
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
        console.log(data);
        this.listStore.SetList(data);
        return data;
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh();

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch("api/question/otherQ", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
              },
              body: JSON.stringify(request),
            });
            console.log("new request sent");
            const data = await res.json();
            console.log(data);
            this.listStore.SetList(data);
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          alert("not enough permissions");
          await this.authStore.Logout();
        }
      }
    },
  },
  async mounted() {
    await this.fetchQuestions();
    this.questions = this.listStore.list;
    console.log(this.questions);
    this.colourStore.colourQuestions();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Header {
  height: 35.96%;
  width: 84.98%;
}

.Lister {
  height: 64.04%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow-y: scroll;
  overflow-x: hidden;
}

.Lister::-webkit-scrollbar {
  width: 8px;
}

.Lister::-webkit-scrollbar-thumb {
  background: #cc655e;
  border-radius: 10px;
}

.Lister::-webkit-scrollbar-thumb:hover {
  background: #3e2a28;
}

.QuestionBox {
  height: fit-content;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 750px) {
  .Header {
    width: 100%;
    height: 30%;
  }

  .Lister::-webkit-scrollbar {
    width: 4px;
  }
}
</style>
