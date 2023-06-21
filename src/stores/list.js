import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
    id: 'list',
    state: () => ({
        list : []
    }),
    persist : true,
    actions: {
        async SetList(list) {
            this.list = list;
            console.log("List was set : ",this.list);
        },
        async AddCommentQuestion(qid, comment) {
            console.log('adding comment to question in list : ', qid);
            this.list.filter((item) => item['_id'] === qid)[0].comments.push(comment);
        },
        async AddCommentAnswer(qid, aid, comment) {
            console.log('adding comment to answer in list : ', qid, aid);
            this.list.filter((item) => item['_id'] === qid)[0].answers.filter((item) => item['_id'] === aid)[0].comments.push(comment);
        },
        async UpvoteQuestion(qid, val) {
            console.log('upvoting question in list : ', qid, "by", val);
            this.list.filter((item) => item['_id'] === qid)[0].upvotes += val;
        },
        async UpvoteAnswer(qid, aid, val) {
            console.log('upvoting answer in list : ', qid, aid, "by", val);
            this.list.filter((item) => item['_id'] === qid)[0].answers.filter((item) => item['_id'] === aid)[0].upvotes += val;
        },
        async SetHideQuestion(qid) {
            console.log('hiding question in list : ', qid);
            this.list.filter((item) => item['_id'] === qid)[0].hidden = !this.list.filter((item) => item['_id'] === qid)[0].hidden;
        },
        async SetHideAnswer(qid, aid) {
            console.log('hiding answer in list : ', qid, aid);
            this.list.filter((item) => item['_id'] === qid)[0].answers.filter((item) => item['_id'] === aid)[0].hidden = !this.list.filter((item) => item['_id'] === qid)[0].answers.filter((item) => item['_id'] === aid)[0].hidden; 
        },
        async SetHideQuestionComment(qid, cid) {
            console.log('hiding comment in list : ', qid, cid);
            this.list.filter((item) => item['_id'] === qid)[0].comments.filter((item) => item['_id'] === cid)[0].hidden = !this.list.filter((item) => item['_id'] === qid)[0].comments.filter((item) => item['_id'] === cid)[0].hidden; 
        }
    }
})