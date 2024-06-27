<template>
  <div class="main-container">
    <div class="container">
      <div class="content">
        <div class="inner-container">
          <div class="titles">
            <div class="title">Notification</div>
            <div class="subtitle" :style="{ color: colourStore.grey }">Sent at {{ formatDate(notifP.sent_At) }}</div>
          </div>
          <div class="body" :style="{ color : colourStore.grey }">
            <div class="scrollable-content">
              {{ notifP.content }} 
            </div>
          </div>
          <div class="actions">
            <button class="close-btn" @click="close" :style="{ borderColor : colourStore.grey, color : colourStore.grey}">Close</button>
          

    
            <button class="open-btn" @click="open" :style="{ background : colourStore.primary}">Open</button> 



        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useColourStore } from '@/stores/colour';
import { useAuthStore } from '../../stores/auth';
import { useListStore } from '../../stores/list';
import { useQuestionStore } from '../../stores/question';

export default {
  name: 'NotificationBox',
  props: ['notifP'],
  data(){
    return {
      questions: [],
      question: null
    };
  },
  setup() {
    const colourStore = useColourStore();
    const authStore = useAuthStore()
    const listStore = useListStore()
    const QuestionStore = useQuestionStore()

    // Example data for demonstration
    const title = "Orientation";
    const subtitle = "Sent on a Tuesday";
    const body = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;


    return {
      colourStore,
      title,
      subtitle,
      body,
      authStore,
      listStore,
      QuestionStore
    };
  },
  methods: {
    close() {
      this.$emit('closeNwindow');
    },
    open() {
    if (this.notifP.isquestion){
      window.location.href = this.authStore.vite_base + '/question'
      this.fetchQuestions();
      this.questions = this.listStore.list;
      console.log(this.questions);
      this.colourStore.colourMyQuestions();
      this.question = this.findQuestionById(this.notifP._id)
      this.SetQuestionView()
        this.$emit('openNwindow');
    }
    else {
      window.location.href = this.authStore.vite_base + '/';
    }
    },
    findQuestionById(questionId){
      return this.questions.find(question => question._id === questionId);
    },
    formatDate(dateString) {
      // Parse the date string
      const date = new Date(dateString);

      // Increment the date by one day
      date.setDate(date.getDate() + 1);

      // Format the date
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const timeOptions = {
        hour: 'numeric',
        minute: '2-digit'
      };
      const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

      // Construct the final formatted string
      const formattedDateTime = `${formattedDate} at ${formattedTime.toLowerCase()}`;

      return formattedDateTime;
    },
    async fetchQuestions() {
      const user_id = this.authStore.user_ID;
      console.log('user id : ', user_id);
      const request = {
        user_ID: user_id,
      };

      console.log('body : ', request);

      const bearer = `Bearer ${this.authStore.accessToken}`;

      console.log('bearer : ', bearer);

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/myQ`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
        body: JSON.stringify(request),
      });

      console.log('request sent');

      if (res.status === 200) {
        console.log('received response');
        const data = await res.json();
        console.log(data);
        this.listStore.SetList(data);
        // this.questions = data;
        return data;
      } else {
        if (res.status === 403) {
          console.log('refreshing token');
          const res = await this.authStore.Refresh();

          if (res.status === 200) {
            console.log('refreshed token');
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log('new bearer : ', bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/myQ`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: bearer,
                },
                body: JSON.stringify(request),
              }
            );
            console.log('new request sent');
            const data = await res.json();
            console.log(data);
            this.listStore.SetList(data);
            // this.questions = data;
            return data;
          } else {
            console.log('refresh failed');
            await this.authStore.Logout();
          }
        } else {
          await this.authStore.Logout();
        }
      }
    },
    async SetQuestionView() {
      await this.QuestionStore.SetQuestion(this.question);
      await this.QuestionStore.SetQuestionID(this.question['_id']);
    },
  },
};
</script>




<style scoped>
.main-container {
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.content {
  border-radius: 18px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: white; 
}

.inner-container {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
}

.titles {
  margin-bottom: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-size: 13px;
}

.body {
  width: 100%;
  height: 20%;
  max-height: 200px; 
  overflow-y: auto;
  margin-top: 16px;
  padding: 8px;
  border: 1px solid; 
  border-radius: 8px;
}

.scrollable-content {
  color: black;
}

.actions {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  margin: 0 8px;
  background-color: white;
  /* position: fixed;
  z-index: 1;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: #60b926;
  margin-top: 5px;
  margin-right: 5px; */
}

.close-btn {
  border: 1px solid;
}


</style>
