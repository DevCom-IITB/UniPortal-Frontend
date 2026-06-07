<template>
<<<<<<< Updated upstream
  <div class="cont" :style="{ color: colourStore.primary, background: colourStore.background }">
    <div class="background"><img :src="colourStore.headerImage" alt="" /></div>
    <div class="Header">
      <div class="HeaderTitle" :style="{ color: colourStore.emphasis_text }">
        {{ headerName }}
      </div>
      <div class="HeaderText" :style="{ color: colourStore.emphasis_text }">
        {{ headerText }}
=======
  <div class="announcements-container">
    <div class="announcements-header">
      <span class="title">Announcements ></span>
    </div>
    <div class="cards-wrapper">
      <div class="announcement-card" v-for="i in 2" :key="i">
        <h3 class="card-title">What are the best electives for first-year CS students?</h3>
        <p class="card-text">
          Hey Bruins! I'm here to answer all your questions about moving to Westwood. - Chad Johnson, Student Mentor
        </p>
        <div class="card-footer">
          <span class="time-ago">15 mins ago</span>
          <button class="view-more">View more</button>
        </div>
>>>>>>> Stashed changes
      </div>
      <div class="Tags">
        <button v-for="tag in tags" :key="tag" @click="selectTag(tag)"
          :class="{ TagButton: true, SelectedTag: selectedTag === tag }"
          :style="{ background: selectedTag === tag ? colourStore.primary : colourStore.background, color: 'black' }">
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< Updated upstream
import { useColourStore } from "@/stores/colour";
import { ref } from "vue";

export default {
  name: "Header",
  setup(props, { emit }) {
    const colourStore = useColourStore();
    const selectedTag = ref(null); // Use ref for reactive selected tag

    const selectTag = (tag) => {
      selectedTag.value = tag;
      emit('tag-selected', tag); // Emit an event if needed
    };

    return {
      colourStore,
      selectedTag,
      selectTag,
    };
  },
  props: {
    headerName: String,
    headerText: String,
    tags: Array,
  },
=======
export default {
  name: "Header",
>>>>>>> Stashed changes
};
</script>

<style scoped>
.announcements-container {
  width: 100%;
  background: #faeebb;
  border-radius: 24px;
<<<<<<< Updated upstream
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

.background img {
  width: auto;
  height: 100%;
}

.Header {
  width: 92.19%;
  height: 74.36%;
=======
  padding: 24px;
>>>>>>> Stashed changes
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 24px;
}

.announcements-header {
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.cards-wrapper {
  display: flex;
  gap: 20px;
  overflow-x: auto;
}

.announcement-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  min-width: 350px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #111;
  line-height: 1.3;
}

<<<<<<< Updated upstream
.Tags {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.TagButton {
  padding: 5px 17px;
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  background: inherit;
  color: black;
}

.SelectedTag {
  font-weight: bold;
}

/* Adjustments for responsiveness */
@media only screen and (max-width: 1250px) {
  .HeaderTitle {
    font-size: 48px;
  }

  .HeaderText {
    font-size: 14px;
  }

  .Tags {
    margin-top: 10px;
    gap: 10px;
    /* Reduce gap for smaller screens */
  }

  .TagButton {
    padding: 5px 10px;
    /* Further adjust padding for smaller screens */
  }
}

@media only screen and (max-width: 950px) {
  .Header {
    height: 82%;
  }

  .HeaderTitle {
    font-size: 42px;
  }

  .HeaderText {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .Tags {
    margin-top: 3px;
    gap: 5px;
    /* Reduce gap for smaller screens */
  }

  .TagButton {
    padding: 5px 10px;
    /* Further adjust padding for smaller screens */
  }
=======
.card-text {
  font-size: 14px;
  color: #555;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-ago {
  font-size: 12px;
  color: #999;
}

.view-more {
  background: #faeebb;
  border: none;
  border-radius: 100px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
>>>>>>> Stashed changes
}
</style>
