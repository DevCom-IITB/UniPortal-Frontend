<template>
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
export default {
  name: "Header",
};
</script>

<style scoped>
.announcements-container {
  width: 100%;
  background: #faeebb;
  border-radius: 24px;
  padding: 24px;
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
}
</style>
