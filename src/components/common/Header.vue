<template>
  <div class="cont" :style="{ color: colourStore.primary, background: colourStore.background }">
    <div class="background"><img :src="colourStore.headerImage" alt="" /></div>
    <div class="Header">
      <div class="HeaderTitle" :style="{ color: colourStore.emphasis_text }">
        {{ headerName }}
      </div>
      <div class="HeaderText" :style="{ color: colourStore.emphasis_text }">
        {{ headerText }}
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
};
</script>

<style scoped>
.cont {
  height: 95.12%;
  width: 100%;
  border-radius: 24px;
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
  display: flex;
  flex-direction: column;
}

.HeaderTitle {
  font-size: 60px;
  font-weight: 500;
}

.HeaderText {
  font-size: 16px;
  font-weight: 500;
  overflow-y: scroll;
}

.HeaderText::-webkit-scrollbar {
  width: 8px;
}

.HeaderText::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 10px;
}

.HeaderText::-webkit-scrollbar-thumb:hover {
  background: #000;
}

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
}
</style>
