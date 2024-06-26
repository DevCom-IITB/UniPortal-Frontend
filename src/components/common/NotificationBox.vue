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
            <button class="close-btn" @click="close" :style="{ background : colourStore.primary}">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useColourStore } from '@/stores/colour';

export default {
  name: 'NotificationBox',
  props: ['notifP'],
  setup() {
    const colourStore = useColourStore();

    // Example data for demonstration
    const title = "Orientation";
    const subtitle = "Sent on a Tuesday";
    const body = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    return {
      colourStore,
      title,
      subtitle,
      body
    };
  },
  methods: {
    close() {
      this.$emit('closeNwindow');
    },
    save() {
      this.$emit('saveNwindow');
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
    }
  }
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




</style>
