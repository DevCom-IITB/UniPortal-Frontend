import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useQuestionStore = defineStore("question", {
    id: "question",
    state: () => ({
        question: {},
        answers: [],
        comments: [],
        question_ID : '',
        answer_ID : '',
        addImage : false,
        ImageLink : '',
        action : 0, // 1 is for answering a question, 2 is for commenting on a question, 3 is for commenting on an answer, 4 is for posting a question, 5 is for posting a infopost
    }),
    actions: {
        async SetQuestion(question){
            console.log('we have entered the set question function in question.js');
            this.question = question;
            this.answers = question['answers'];   
            this.comments = question['comments'];
            console.log("state variables :", this.question, this.answers, this.comments);
        },
        async SetAction(action){
            this.action = action;
            console.log("action : ", this.action);
        },
        async SetAddImage(addImage){
            this.addImage = addImage;
            console.log("addImage : ", this.addImage);
        },
        async SetQuestionID(question_ID){
            this.question_ID = question_ID;
            console.log("question_ID : ", this.question_ID);
        },
        async SetAnswerID(answer_ID){
            this.answer_ID = answer_ID;
            console.log("answer_ID : ", this.answer_ID);
        },
        async SetImageLink(ImageLink){
            this.ImageLink = ImageLink;
            console.log("ImageLink : ", this.ImageLink);
        },
        async PostQuestion(body, images){
            const authStore = useAuthStore();
            console.log('we have entered the post question function in question.js');
            console.log('images : ', images);
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const questionObj = new FormData();
            questionObj.append('user_ID', uid);
            questionObj.append('body', body);
            for(let i = 0; i < images.length; i++){
                questionObj.append('images', images[i]);
                console.log(`image ${i} : `, images[i]);
            }

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('Sending request');
            const res = await fetch(`api/question/post`, {
                method : 'POST',
                headers : {
                    'Authorization' : bearer
                },
                body : questionObj
            })

            if(res.status == 200){
                console.log('successfully added question');
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/post`,{
                            method : 'POST',
                            headers : {
                                'Authorization' : bearer
                            },
                            body : questionObj
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
        },
        async PostInfoPost(body, images){
            console.log('we have entered the post infopost function in question.js');
            const authStore = useAuthStore();
            console.log('images : ', images);
            const infoPostObj = new FormData();
            infoPostObj.append('body', body);
            for(let i = 0; i < images.length; i++){
                infoPostObj.append('images', images[i]);
                console.log(`image ${i} : `, images[i]);
            }
            // const infoPostObj = {
            //     body : body,
            // }
            console.log('infopost object : ', infoPostObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('Sending request');
            const res = await fetch(`api/info/post`, {
                method : 'POST',
                headers : {
                    'Authorization' : bearer
                },
                body : infoPostObj
            })

            if(res.status == 200){
                console.log('successfully added InfoPost');
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/info/post`,{
                            method : 'POST',
                            headers : {
                                'Authorization' : bearer
                            },
                            body : infoPostObj
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
        },
        async AddAnswer(body, images){
            const authStore = useAuthStore();
            console.log('we have entered the add answer function in question.js');

            console.log('images : ', images);
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const answerObj = new FormData();
            answerObj.append('answers[user_ID]', uid);
            answerObj.append('answers[body]', body);

            for(let i = 0; i < images.length; i++){
                answerObj.append('images', images[i]);
                console.log(`image ${i} : `, images[i]);
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
                    'Authorization' : bearer
                },
                body : answerObj
            })

            console.log(res.status);
            console.log(res.json());

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
                        const res = await fetch(`api/question/answerQ/${this.question['_id']}`,{
                            method : 'PATCH',
                            headers : {
                                'Authorization' : bearer
                            },
                            body : answerObj
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
        },
        async AddCommentQuestion(body){
            const authStore = useAuthStore();
            console.log('we have entered the add comment on a question function in question.js');
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const commentObj = {
                comments : {
                    user_ID : uid,
                    body : body,
                }
            }
            console.log('comment object : ', commentObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question['_id']);
            console.log('Sending request');
            const res = await fetch(`api/question/commentQ/${this.question['_id']}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
                body : JSON.stringify(commentObj)
            })

            if(res.status == 200){
                console.log('successfully added comment on question');
                this.answers.push(commentObj['comment']);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/commentQ/${this.question['_id']}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
                            body : JSON.stringify(commentObj)
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
        },
        async AddCommentAnswer(body){
            const authStore = useAuthStore();
            console.log('we have entered the add comment on an answer function in question.js');
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const commentObj = {
                answers : {
                    comments : {
                        user_ID : uid,
                        body : body,
                    }
                }
            }
            console.log('comment object : ', commentObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question['_id']);
            console.log('Sending request');
            const res = await fetch(`api/question/commentA/${this.question_ID}/${this.answer_ID}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
                body : JSON.stringify(commentObj)
            })

            if(res.status == 200){
                console.log('successfully added comment on answer :', this.answer_ID);
                this.answers.push(commentObj['answers']['comments']);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/commentA/${this.question_ID}/${this.answer_ID}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
                            body : JSON.stringify(commentObj)
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
        },
        async UpvoteQuestion(){
            const authStore = useAuthStore();
            console.log('we have entered the upvote a question function in question.js', this.question['_id']);
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const upvoteObj = {
                user_ID : uid,
            }
            console.log('upvote object : ', upvoteObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question['_id']);
            console.log('Sending request');
            const res = await fetch(`api/question/upvoteQ/${this.question['_id']}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
                body : JSON.stringify(upvoteObj)
            })

            if(res.status == 200){
                console.log('successfully upvotes on question :', this.question['_id']);
                this.question['upvotes'] +=1;
                console.log(this.question['upvotes']);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/upvoteQ/${this.question['_id']}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
                            body : JSON.stringify(upvoteObj)
                        })
                        this.question['upvotes']++;
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
                else if(res.status === 401){
                    alert('already upvoted')
                }
                else{
                    alert('not enough permissions')
                    await this.authStore.Logout() 
                }
            }
        },
        async UpvoteAnswer(){
            const authStore = useAuthStore();
            console.log('we have entered the upvote on an answer function in question.js');
            const uid = authStore.user_ID;
            console.log('user id  parent function: ', uid);
            const upvoteObj = {
                user_ID : uid,
            }
            console.log('upvote object : ', upvoteObj);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question_ID);
            console.log('Sending request');
            const res = await fetch(`api/question/upvoteA/${this.question_ID}/${this.answer_ID}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
                body : JSON.stringify(upvoteObj)
            })

            if(res.status == 200){
                console.log('successfully added upvote on answer :', this.answer_ID);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/upvoteA/${this.question_ID}/${this.answer_ID}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
                            body : JSON.stringify(upvoteObj)
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
                else if(res.status === 401){
                    alert('already upvoted')
                }
                else{
                    alert('not enough permissions')
                    await this.authStore.Logout() 
                }
            }
        },
        async HideQuestion(){
            const authStore = useAuthStore();
            console.log('we have entered the hide a question function in question.js', this.question['_id']);

            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question['_id']);
            console.log('Sending request');
            const res = await fetch(`api/question/hideQ/${this.question['_id']}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
            })

            if(res.status == 200){
                console.log('successfully hid the question :', this.question['_id']);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/hideQ/${this.question['_id']}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
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
        },
        async HideAnswer(){
            const authStore = useAuthStore();
            console.log('we have entered the hide an answer function in question.js');
            const accessToken = authStore.accessToken;

            const bearer = `Bearer ${accessToken}`

            console.log('bearer : ', bearer);
            console.log('question id : ', this.question_ID);
            console.log('Sending request');
            const res = await fetch(`api/question/hideA/${this.question_ID}/${this.answer_ID}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : bearer
                },
            })

            if(res.status == 200){
                console.log('successfully hid answer :', this.answer_ID);
            }
            else{
                if(res.status === 403){
                    console.log('refreshing token');
                    const res = await this.authStore.Refresh();
      
                    if(res.status === 200){
                        console.log('refreshed token');
                        const bearer = `Bearer ${this.authStore.accessToken}`
                        console.log('new bearer : ', bearer);
                        const res = await fetch(`api/question/hideA/${this.question_ID}/${this.answer_ID}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Authorization' : bearer
                            },
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
        },
    }
})