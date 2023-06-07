import { defineStore } from "pinia";

export const useQuestionStore = defineStore("question", {
    id: "question",
    state: () => ({
        question: {},
        answers: [],
        comments: [],
    }),
    actions: {
        async SetQuestion(question){
            console.log('we have entered the set question function in question.js');
            this.question = question;
            this.answers = question['answers'];   
            this.comments = question['comments'];
            console.log("state variables :", this.question, this.answers, this.comments);
        }
    }
})