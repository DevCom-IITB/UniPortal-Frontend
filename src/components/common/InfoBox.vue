<template>
  <div class="main-container">
    <div class="sizer" v-if="windowWidth > 750">
    </div>
    <div class="main-content">
      <div class="container">
        <div class="timestamp">{{ timestamp }}</div>
        <div class="Images" v-if="infopost.images">
          <div
            v-for="image in images"
            v-bind:key="image.id"
            class="img"
            @click="Expand(image)"
          >
            <img :src="image" />
          </div>
        </div>
        <div class="body-content">
          <Markdown :source="infopost.body" />
          <div v-if="infopost['tag']!=null" class="tag">{{infopost['tag']}}</div>
        </div>
      </div> 
      <div class="sizer" v-if="windowWidth <=750">
        <div
          class="hide"
          v-if="(authStore.role == 5980 || authStore.role == 1980)"
          @click="Hide"      
        >
          <eye v-if="!infopost['hidden']" class="icon" /><closed_eye
            v-if="infopost['hidden']"
            class="icon"
          />
        </div>
        <div
          class="edit"
          v-if="authStore.role == 5980 || authStore.role == 1980"
          @click="Edit"
        >
          <edit />
        </div>
      </div>
    </div>
    <div class="sizer" v-if="windowWidth > 750">
      <div
        class="hide"
        v-if="(authStore.role == 5980 || authStore.role == 1980)"
        @click="Hide"      
      >
        <eye v-if="!infopost['hidden']" class="icon" /><closed_eye
          v-if="infopost['hidden']"
          class="icon"
        />
      </div>
      <div
        class="edit"
        v-if="authStore.role == 5980 || authStore.role == 1980"
        @click="Edit"
      >
        <edit />
      </div>
    </div>
    
  </div>
</template>

<script>
import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import eye from "../icons/visibility.svg";
import closed_eye from "../icons/visibility_off.svg";
import edit from "../icons/edit2.svg";
import Markdown from "vue3-markdown-it";

export default {
  name: "InfoBox",
  setup() {
    const questionStore = useQuestionStore();
    const authStore = useAuthStore();
    return { questionStore, authStore };
  },
  props: {
    infopost: Object,
  },
  components: {
    eye,
    closed_eye,
    edit,
    Markdown,
  },
  data() {
    return {
      images: [],
      windowWidth: window.innerWidth,
      timestamp: "",
    };
  },
  methods: {
    Expand(image) {
      console.log("link is : ", image);
      this.questionStore.SetImageLink(image);
      console.log("expanding");
      this.$emit("expand");
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Hide() {
      console.log("hiding");
      await this.questionStore.SetInfoID(this.infopost["_id"]);
      await this.questionStore.HideInfoPost();
      this.$emit("hide");
    },
    async Edit() {
      console.log("editing");
      await this.questionStore.SetInfoID(this.infopost["_id"]);
      await this.questionStore.SetAction(6);
      console.log("emitting edit :", this.infopost["body"]);
      this.$emit("edit", this.infopost["body"]);
    },
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    console.log("we will be loggin the images");
    this.images = this.infopost.images;
    if (this.images.length > 0) {
      for (let i = 0; i < this.images.length; i++) {
        //D:\SMP\SMP-Portal-Backend\uploads
        console.log(this.images[i]);
        const temp =
          (import.meta.env.VITE_NODE_ENV == "DEV"
            ? "http://localhost:5000/uploads/"
            : "https://gymkhana.iitb.ac.in/newbee/uploads/") + this.images[i];
        this.images[i] = temp;
        console.log(this.images[i]);
      }
    } else {
      console.log("no images");
    }
    const date = new Date(this.infopost["asked_At"]);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    this.timestamp = date.toLocaleString(undefined, options);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: start;
}

.sizer {
  width: 2vw;
  align-items: center;
}

.edit{
  width: 2vw;
  align-items: center;
  padding-left: 5px;
  cursor: pointer;
}

.main-content{
  width: 84.98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.container {
  /* border: 5px solid red; */
  width: 100%;
  height: 100%;
  background: #fff9e5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 24px;
  
}

p {
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  white-space: pre-wrap;
}

.body-content{
  display: flex;
}

.tag{
  width: 100px;
  height: 20px;
  background-color: #FFEDB2;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.timestamp{
  font-size: x-small;
  font-weight: 400;
  color: #ccb160;
}

.Images {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-top: 8px;
}

.img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid;
  margin-right: 8px;
  background: #f0f2f5;
  overflow: hidden;
  /* box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3); */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.expandImg {
  position: absolute;
  width: 500px;
  height: 400px;
  background: #fff9e5;
  z-index: 3;
}

.hide {
  width: 2vw;
  cursor: pointer;
  
}



@media only screen and (max-width: 1150px) {
  p {
    font-size: 12px;
  }
}

@media only screen and (max-width : 750px){

  .main-content{
    width: 100%;
  }

  .container{
    width: 100%;
  }

  .sizer{
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .hide{
    width: 8vw;
    margin-left: 8px;
  }

  .edit{
    width: 8vw;
  }
}
</style>
