<template>


  <form class="asker" @submit="OnSubmit" :style="{
    height: selectedImages.length === 0 && messages.length === 0 ? '25vh' : (messages.length > 0 && selectedImages.length > 0 ? '50vh' : (selectedImages.length > 0 || messages.length > 0 ? '38vh' : '30vh'))
  }">
    <div class="name">{{ nameOfPoster }}</div>
    <textarea class="text" :style="{ borderColor: colourStore.grey }" v-model="text" type="text"
      placeholder="Please be considerate of others when typing in your queries"></textarea>
    <div class="preview" v-if="selectedImages.length > 0">
      <div v-for="(image, index) in previewImages" :key="index" class="PreImage">
        <div class="cancel" @click="RemoveImage(index)" />
        <img :src="image" alt="Preview Image">
      </div>
    </div>
    <div class="actions">
      <div class="decision">
        <div class="discard" :style="{ color: colourStore.grey }" @click="$emit('discard')">Discard</div>
        <input class="post" :style="{ background: colourStore.primary }" value="Post" type="submit" @click="decide" />
      </div>
      <div v-if="questionStore.addImage" class="photo" :style="{ background: colourStore.background }"
        @click="AddImages">
        <input type="file" id="fileInput" @change="SelectingFiles" multiple />
        <add />&nbsp;&nbsp;
        <p>Add photo</p>
      </div>
    </div>
    <ul v-if="text.length != 0 && authStore.role == 7669" class="similarQues">
      <p> Click to view similar questions</p>
      <transition-group name="message-transition" tag="div">
        <li class="question" v-for="(msg, index) in messages" :key=index>
          <router-link :to="authStore.vite_base + '/question'" class="questionRoute" @click="SetQuestionView(msg)">
            {{ msg.question }}
          </router-link>
        </li>
      </transition-group>

    </ul>
  </form>

</template>

<script>
import add from "../icons/add_circle.svg";
import { useQuestionStore } from "@/stores/question";
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "../../stores/colour";
let posted = false;

export default {
  name: "askBox",

  setup() {
    const questionStore = useQuestionStore();
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    return { questionStore, authStore, colourStore };
  },
  props: {
    editBody: {
      type: String,
      default: "",
    },
    nameOfPoster: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: "",
      selectedImages: [],
      previewImages: [],
      messages: [],
    };
  },
  mounted() {
    if (this.editBody && this.questionStore.action == 6) {
      this.text = this.editBody;
    }
  },
  created() {
    if (this.authStore.role === 7669) {
      this.connectWebSocket();
    }
  },
  watch: {
    text(newText) {
      if (this.authStore.role === 7669) {
        this.sendQuery(newText);
      }
    }
  },
  methods: {
    async OnSubmit(e) {
      e.preventDefault();
      if (!this.text && !posted) {
        alert("Please enter some text");
        return;
      }

      const newPost = {
        text: this.text,
      };

      this.$emit("post", newPost);
    },
    async decide(event) {
      console.log(event);
      if (!this.text && !posted) {
        alert("Please enter some text");
        return;
      }
      const decision = this.questionStore.action;
      if (decision == 1) {
        console.log(
          "we will be answering the question with id:",
          this.questionStore.question["_id"]
        );
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.AddAnswer(this.text, this.selectedImages);
      } else if (decision == 2) {
        console.log(
          "we will be commenting on the question with id:",
          this.questionStore.question["_id"]
        );
        await this.questionStore.AddCommentQuestion(this.text);
      } else if (decision == 3) {
        console.log(
          "we will be commenting on the answer with id:",
          this.questionStore.answer_ID,
          "with question id : ",
          this.questionStore.question_ID
        );
        await this.questionStore.AddCommentAnswer(this.text);
      } else if (decision == 4) {
        console.log("we will be posting a new question");
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.PostQuestion(this.text, this.selectedImages);
        // await this.questionStore.AddCommentComment(this.text)
      } else if (decision == 5) {
        console.log("we will be posting info post");
        await this.questionStore.PostInfoPost(this.text, this.selectedImages);
      } else if (decision == 6) {
        console.log(
          "we will be editing the infopost with id : ",
          this.questionStore.info_ID
        );
        await this.questionStore.EditInfoPost(this.text);
      } else if (decision == 7) {
        console.log("we will be posting a new question Anonymously");
        console.log("selected images are : ", this.selectedImages);
        await this.questionStore.PostQuestionAnonymously(this.text, this.selectedImages);
        // await this.questionStore.AddCommentComment(this.text)
      }

      this.$emit("discard");
    },
    AddImages() {
      document.getElementById("fileInput").click();
    },
    SelectingFiles(e) {
      this.selectedImages.push(...Array.from(e.target.files)); //Array.from() converts the filelist to an array
      console.log(this.selectedImages);

      Array.from(e.target.files).forEach((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.previewImages.push(reader.result);
          }
        };
        reader.readAsDataURL(image);
      });
      console.log(this.previewImages);
      // this.questionStore.AddImages(this.selectedImages);
    },
    RemoveImage(index) {
      this.previewImages.splice(index, 1);
      this.selectedImages.splice(index, 1);
    },
    connectWebSocket() {
      this.socket = new WebSocket('ws://127.0.0.1:3001/newbee/ws');

      this.socket.addEventListener('open', (event) => {
        console.log('Connected to WebSocket server');
      });
      this.socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(typeof (parsedData))
        this.messages.push(...parsedData)
        console.log('Received message from WebSocket server:', this.messages);
      };
      this.socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event)
      })
    },
    sendQuery(query) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket is open. Ready state : ", this.socket.readyState)
        this.socket.send(query);
        this.messages = [];
      } else {
        console.error('WebSocket is not open. Ready state:', this.socket.readyState);
      }
    },
    async SetQuestionView(question) {
      await this.questionStore.SetQuestionID(question['qid']);
      this.$emit('discard');
    },
  },
  components: {
    add,
  },
  emits: ["discard"],
};
</script>

<style scoped>
.asker {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin: 8px 0;
  min-height: 210px;
}

.name {
  width: 100%;
  height: 20px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  /* border: 1px solid; */
}

.text {
  width: 100%;
  height: 80px;
  max-height: 80px;
  border: 1px solid;
  border-radius: 10px;
  padding: 8px 8px;
  resize: none;
  margin: 8px 0;
}

.preview {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.PreImage {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 8px;
  background: #f0f2f5;
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-start;
}

.cancel {
  position: fixed;
  z-index: 1;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: #60b926;
  margin-top: 5px;
  margin-right: 5px;
}


.cancel:hover {
  background: #ff7c7c;
}

.PreImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: end;
  margin: 8px 0;
}

.photo {
  height: 100%;
  border-radius: 50px;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

p {
  font-size: 16px;
  font-weight: 600;
}

input[type="file"] {
  display: none;
}

.decision {
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.discard {
  padding-left: 16px;
  padding-right: 16px;
  margin-right: 8px;
  border: 1px solid;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.post {
  padding-left: 16px;
  padding-right: 16px;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.similarQues {
  list-style: none;
  width: 100%;
  margin: 0;
  padding-left: 8px;
  overflow-y: auto;
  transition: height 0.3s ease;
}

.question {
  margin: 8px 0;
}

.question a {
  text-decoration: none;
  color: #000;
}

.message-transition-enter-active,
.message-transition-leave-active {
  transition: all 0.2s ease;
}

@media only screen and (max-width: 750px) {
  .asker {
    justify-content: space-between;
    height: fit-content;
  }

  .name {
    height: 6%;
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 16px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .text {
    height: 100px;
  }

  .actions {
    height: 30px;
  }
}
</style>
