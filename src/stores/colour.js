import { defineStore } from "pinia";
import InfoPost from "@/components/background_images/InfoPot.png";
import Questions from "@/components/background_images/Questions.png";
import MyQuestions from "@/components/background_images/MyQuestions.png";

export const useColourStore = defineStore("colour", {
  id: "colour",
  state: () => ({
    background: "#FFF9E5",
    primary: "#FFDF80",
    unselected: "#FAF4E1",
    emphasis_text: "#211D12",
    light_text: "#52492E",
    grey: "#CCB160",
    active_hovering: "#FFD899",
    sidebar: "#FFEDB2",
    snackColor: "#D9E7CB",
    askPopup: true,
    currentPage: 1,
    headerImage: InfoPost,
  }),
  persist: true,
  actions: {
    async SetSnackColor(color) {
      if(color){
        this.snackColor = '#386A20';
      }
      else{
        this.snackColor = '#CC655E';
      }
    },
    async colourInfopost() {
      this.background = "#FFF9E5";
      this.primary = "#FFDF80";
      this.unselected = "#FAF4E1";
      this.emphasis_text = "#211D12";
      this.light_text = "#52492E";
      this.grey = "#CCB160";
      this.active_hovering = "#FFD899";
      this.sidebar = "#FFEDB2";
      this.askPopup = true;
      this.currentPage = 1;
      this.headerImage = InfoPost;
      console.log("colour set for infopost");
    },
    async colourQuestions() {
      this.sidebar = "#FFE5E5";
      this.primary = "#FFD2D1";
      this.grey = "#CC655E";
      this.unselected = "#FFF4F2";
      this.active_hovering = "#FFA599";
      this.emphasis_text = "#1F1514";
      this.light_text = "#3E2A28";
      this.background = "#FFF3F2";
      this.askPopup = true;
      this.currentPage = 2;
      this.headerImage = Questions;
      console.log("colour set for questions");
    },
    async colourMyQuestions() {
      this.sidebar = "#E5D7FF";
      this.primary = "#D4BDFF";
      this.grey = "#8D87B3";
      this.unselected = "#E8E7F5";
      this.active_hovering = "#C9B4F2";
      this.emphasis_text = "#201E2F";
      this.light_text = "#3E3C5D";
      this.background = "#F6F5FF";
      this.askPopup = true;
      this.currentPage = 3;
      this.headerImage = MyQuestions;
      console.log("colour set for my questions");
    },
    async colourQuestionView() {
      this.sidebar = "#F0F3E8";
      this.primary = "#D9E7CB";
      this.grey = "#386A20";
      this.unselected = "#F0F3E8";
      this.active_hovering = "#D9E7CB";
      this.emphasis_text = "#1C1B1F";
      this.background = "#FDFDF6";
      this.askPopup = false;
      console.log("colour set for question view");
    },
    async colourUnAnswered() {
      this.sidebar = "#FFE5E5";
      this.primary = "#FFD2D1";
      this.grey = "#CC655E";
      this.unselected = "#FFF4F2";
      this.active_hovering = "#FFA599";
      this.emphasis_text = "#1F1514";
      this.light_text = "#3E2A28";
      this.background = "#FFF3F2";
      this.askPopup = true;
      this.currentPage = 2;
      this.headerImage = Questions;
      console.log("colour set for unanswered questions");
    },
    async colourAnswered() {
      this.sidebar = "#E5D7FF";
      this.primary = "#D4BDFF";
      this.grey = "#8D87B3";
      this.unselected = "#E8E7F5";
      this.active_hovering = "#C9B4F2";
      this.emphasis_text = "#201E2F";
      this.light_text = "#3E3C5D";
      this.background = "#F6F5FF";
      this.askPopup = true;
      this.currentPage = 3;
      this.headerImage = MyQuestions;
      console.log("colour set for answered questions");
    },
  },
});
