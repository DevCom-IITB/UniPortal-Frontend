<template>
  <div class="upvotebox">
    <button
      class="btn"
      :style="{
        color: colourStore.emphasis_text,
        background: colourStore.background,
      }"
    >
      <div class="icon"><Upvote1 /></div>
      <p v-if="windowWidth <= 750">&nbsp;(</p>
      <p>{{ upvotes }}</p>
      <p v-if="windowWidth <= 750">)</p>
    </button>
  </div>
</template>

<script>
import Upvote from "../icons/expand_more.svg";
import Upvote1 from "../icons/upvote.svg";
import { useColourStore } from "../../stores/colour";
export default {
  name: "upvote",
  components: {
    Upvote,
    Upvote1,
  },
  setup() {
    const colourStore = useColourStore();
    return { colourStore };
  },
  props: {
    upvotes: {
      type: Number,
      required: true,
    },
    windowWidth: {
      type: Number,
      required: true,
    },
  },
  methods: {
    Upvote() {
      console.log("upvoted");
    },
  },
};
</script>
<style scoped>

.btn {
  border: none;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  padding: 7px 7px 7px 7px;
}

p {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
}

.icon {
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1150px) {
  .btn {
    padding: 5px 5px 5px 5px;
    margin-left: 1px;
  }
  p {
    font-size: 14px;
  }
}

@media only screen and (max-width: 950px) {
  .btn {
    padding: 5px 3px 5px 3px;
    margin-left: 1px;
  }
  p {
    font-size: 12px;
  }
}

@media only screen and (max-width: 750px) {
  .btn {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 5px 10px 5px 10px;
  }
  p {
    font-size: 10px;
  }
}
</style>
