<template>
  <div
    class="cont"
    :style="{ color: colourStore.primary, background: colourStore.background }"
  >
    <!-- <InfoPost class="background" /> -->
    <div class="background"><img :src="colourStore.headerImage" alt="" /></div>
    <div class="Header">
      <div class="HeaderTitle" :style="{ color: colourStore.emphasis_text }">
        {{ headerName }}
      </div>
      <div class="HeaderText" :style="{ color: colourStore.emphasis_text }">
        {{ headerText }}
      </div>
    </div>
    <!-- <div class="HeaderImage"><img src="..\background_images\yellow_illustration.jpg" alt=""></div> -->
  </div>
</template>

<script>
import { useColourStore } from "@/stores/colour";
export default {
  name: "Header",
  setup() {
    const colourStore = useColourStore();
    return { colourStore };
  },
  props: {
    headerName: String,
    headerText: String,
  },
  components: {},
};
</script>

<style scoped>
.cont {
  height: 95.12%;
  width: 100%;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
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

/* .HeaderImage{
    width: 100%;
    height: 100%;
    position: absolute;
}

img{
    width: 100%;
    filter: saturate(80%);
} */

@media only screen and (max-width: 1150px) {
  .HeaderTitle {
    font-size: 48px;
  }

  .HeaderText {
    font-size: 14px;
  }
}

@media only screen and (max-width: 950px) {
  .HeaderTitle {
    font-size: 42px;
  }

  .HeaderText {
    font-size: 12px;
  }
}
</style>
