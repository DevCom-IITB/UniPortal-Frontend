<template>
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
    </div>
  </div>
</template>

<script>
import Question from '../components/common/questionBox.vue';
import Header from '../components/common/Header.vue';

import { useAuthStore } from '../stores/auth';
import { useListStore } from '../stores/list';
import { useColourStore } from '../stores/colour';

export default {
  name: 'Questions',
  setup() {
    const authStore = useAuthStore();
    const listStore = useListStore();
    const colourStore = useColourStore();
    return { authStore, listStore, colourStore };
  },
  data() {
    return {
      headerName: 'Questions',
      headerText: "Where all your friend's questions reside",
      questions: [],
      tags: ['All', 'SMA', 'Immunization', 'Documents', 'Orientation'], // example tags
      scrollPositionY: 0,
    };
  },
  components: {
    Question,
    Header,
  },
  methods: {
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
      const user_id = this.authStore.user_ID;
      const request = {
        user_ID: user_id,
      };
      const bearer = `Bearer ${this.authStore.accessToken}`;

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
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
          },
          body: JSON.stringify({ type: 'question', tag }),
        };
      }

      console.log('bearer:', bearer);
      console.log('fetching questions with URL:', url);

      const res = await fetch(url, options);

      console.log('request sent');

      if (res.status === 200) {
        console.log('received response');
        const data = await res.json();
        console.log(data);
        this.listStore.SetList(data);
        return data;
      } else {
        if (res.status === 403) {
          console.log('refreshing token');
          const res = await this.authStore.Refresh();

          if (res.status === 200) {
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
          } else {
            console.log('refresh failed');
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
