<template>
  <div class="main-container">
    <div class="sizer">
    </div>
    <div class="container">
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
      <p>{{ infopost.body }}</p>
    </div>
    <div class="sizer">
    <div
      class="hide"
      v-if="authStore.role == 5980 || authStore.role == 1980"
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
  },
  data() {
    return {
      images: [],
    };
  },
  methods: {
    Expand(image) {
      console.log("link is : ", image);
      this.questionStore.SetImageLink(image);
      console.log("expanding");
      this.$emit("expand");
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
  mounted() {
    console.log("we will be loggin the images");
    this.images = this.infopost.images;
    if (this.images.length > 0) {
      for (let i = 0; i < this.images.length; i++) {
        //D:\SMP\SMP-Portal-Backend\uploads
        console.log(this.images[i]);
        const temp =
          (import.meta.env.VITE_NODE_ENV == "DEV"
            ? "http://localhost:5000/uploads/"
            : "10.198.49.120/uploads/") + this.images[i];
        this.images[i] = temp;
        console.log(this.images[i]);
      }
    } else {
      console.log("no images");
    }
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
  width: 2.2vw;
  align-items: center;
  padding-left: 1px;
  
}
.container {
  /* border: 5px solid red; */
  width: 84.98%;
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

.Images {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
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
</style>
