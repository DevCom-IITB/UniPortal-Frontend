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
          :style="{ background: selectedTag === tag ? colourStore.primary : colourStore.background, color: 'black'  }">
          {{ tag }}
        </button>
        <br>
        <div class="language-dropdown" v-if="lang === '1'">
          <select v-model="selectedLanguage" @change="handleLanguageChange"
            :style="{ 
              background: colourStore.background,
              color: black,
              border: '2px solid black',
              'border-radius':'10px',
              margin:'3px' ,
              height: '26px',
            }">
            <option value="en">English</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="mr">Marathi (मराठी)</option>
            <option value="kn">Kannada (ಕನ್ನಡ)</option>
            <option value="ta">Tamil (தமிழ்)</option>
            <option value="te">Telugu (తెలుగు)</option>
            <option value="ml">Malayalam (മലയാളം)</option>
            <option value="bn">Bengali (বাংলা)</option>
            <option value="gu">Gujarati (ગુજરાતી)</option>
            <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="or">Odia (ଓଡ଼ିଆ)</option>
            <option value="as">Assamese (অসমীয়া)</option>
            <option value="ne">Nepali (नेपाली)</option>
            <option value="ur">Urdu (اردو)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useColourStore } from "@/stores/colour";
import { ref } from "vue";
// import dropDown from "./DropDownButton.vue";

export default {
  name: "Header",
  setup(props, { emit }) {
    const colourStore = useColourStore();
    const selectedTag = ref(null); // Use ref for reactive selected tag
    const selectedLanguage = ref('en');

    const selectTag = (tag) => {
      selectedTag.value = tag;
      emit('tag-selected', tag); // Emit an event if needed
    };

    const handleLanguageChange = () => {
      emit('language-selected', selectedLanguage.value);
    };

    return {
      colourStore,
      selectedTag,
      selectTag,
      selectedLanguage,
      handleLanguageChange,
    };
  },
  props: {
    headerName: String,
    headerText: String,
    tags: Array,
    lang: String,
  },
  components: {
    // Button,
  }
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

.SelectedLang {
  font-weight: bold;
}

.DropDown {
  padding: 5px 17px;
  border: 2px solid black;
  border-radius: 20px;
  cursor: pointer;
  background: inherit;
  color: black;
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

  .language-dropdown {
  margin-left: 20px;
  min-width: 180px;
}

.language-dropdown select {
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 1em;
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
  .language-dropdown {
    margin-left: 5px;
    min-width: 140px;
  }
  .language-dropdown select {
    padding: 5px 8px;
    font-size: 12px;
  }
}
</style>
