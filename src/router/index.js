import { createRouter, createWebHistory } from "vue-router";
import MyQuestions from "../views/MyQuestions.vue";
import Questions from "../views/Questions.vue";
import UnAnswered from "../views/UnAnswered.vue";
import Answered from "../views/Answered.vue";
import Infopost from "../views/Infopost.vue";
import Questionview from "../views/Questionview.vue";

const routes = [
  {
    path: import.meta.env.VITE_BASE + "/",
    name: "Infopost",
    component: Infopost,
  },

  {
    path: import.meta.env.VITE_BASE + "/myquestions",
    name: "MyQuestions",
    component: MyQuestions,
  },

  {
    path: import.meta.env.VITE_BASE + "/questions",
    name: "Questions",
    component: Questions,
  },

  {
    path: import.meta.env.VITE_BASE + "/unanswered",
    name: "UnAnswered",
    component: UnAnswered,
  },

  {
    path: import.meta.env.VITE_BASE + "/answered",
    name: "Answered",
    component: Answered,
  },

  {
    path: import.meta.env.VITE_BASE + "/question",
    name: "Questionview",
    component: Questionview,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
