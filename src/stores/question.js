import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

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
        },
        async AddAnswer(body){
            const authStore = useAuthStore();
            console.log('we have entered the add answer function in question.js');
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const answerObj = {
                answers : {
                    user_ID : uid,
                    body : body,
                }
            }
            console.log('answer object : ', answerObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question['_id']);
            console.log('Sending request');
            const res = await fetch(`api/question/answerQ/${this.question['_id']}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
                body : JSON.stringify(answerObj)
            })

            if(res.status == 200){
                console.log('successfully added answer');
                this.answers.push(answerObj['answers']);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch('api/question/answeredQ',{
                        method : 'GET',
                        headers : {
                            'Content-Type' : 'application/json',
                            'Authorization' : bearer
                        }
                        })
                        console.log('new request sent');
                        const data = await res.json()
                        console.log(data);
                        return data
                    }
                    else{
                        console.log('refresh failed');
                        await this.authStore.Logout()
                    }
                }
                else{
                    alert('not enough permissions')
                    await this.authStore.Logout() 
                }
            }
        }
    },
    getters:{
        async getAccessToken(){
            console.log('we are in the get access token function in question.js');
            const authStore = useAuthStore();
            console.log('access token : ', authStore.accessToken);
            return authStore.accessToken;
        },
        async getUserID(){
            console.log('we are in the get user id function in question.js');
            const authStore = useAuthStore();
            console.log('user id : ', authStore.user_ID);
            return authStore.user_ID;
        }
    }
})