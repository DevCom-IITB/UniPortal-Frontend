import { defineStore } from "pinia";

export const useListStore = defineStore("list", {
  id: "list",
  state: () => ({
    list: [],
  }),
  persist: true,
  actions: {
    async SetList(list) {
      this.list = list;
      console.log("List was set : ", this.list);
    },
    async UpsertQuestion(question) {
      const idx = this.list.findIndex(q => q._id === question._id);
      if (idx !== -1) {
        this.list[idx] = question;
      } else {
        this.list.unshift(question);
      }
    },
    async AddCommentQuestion(qid, comment) {
      console.log("adding comment to question in list : ", qid);
      this.list.filter((item) => item["_id"] === qid)[0].comments.push(comment);
    },
    async AddCommentAnswer(qid, aid, comment) {
      console.log("adding comment to answer in list : ", qid, aid);
      this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0]
        .comments.push(comment);
    },
    async UpvoteQuestion(qid, val) {
      console.log("upvoting question in list : ", qid, "by", val);
      this.list.filter((item) => item["_id"] === qid)[0].upvotes += val;
    },
    async UpvoteAnswer(qid, aid, val) {
      console.log("upvoting answer in list : ", qid, aid, "by", val);
      this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0].upvotes += val;
    },
    async SetHideQuestion(qid) {
      console.log("hiding question in list : ", qid);
      this.list.filter((item) => item["_id"] === qid)[0].hidden =
        !this.list.filter((item) => item["_id"] === qid)[0].hidden;
    },
    async SetHideAnswer(qid, aid) {
      console.log("hiding answer in list : ", qid, aid);
      this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0].hidden = !this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0].hidden;
    },
    async SetHideQuestionComment(qid, cid) {
      console.log("hiding comment in list : ", qid, cid);
      this.list
        .filter((item) => item["_id"] === qid)[0]
        .comments.filter((item) => item["_id"] === cid)[0].hidden = !this.list
        .filter((item) => item["_id"] === qid)[0]
        .comments.filter((item) => item["_id"] === cid)[0].hidden;
    },
    async SetHideAnswerComment(qid, aid, cid) {
      console.log("hiding answer comment in list : ", qid, aid, cid);
      this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0]
        .comments.filter((item) => item["_id"] === cid)[0].hidden = !this.list
        .filter((item) => item["_id"] === qid)[0]
        .answers.filter((item) => item["_id"] === aid)[0]
        .comments.filter((item) => item["_id"] === cid)[0].hidden;
    },
    async SetHideInfoPost(id) {
      console.log("hiding infopost in list : ", id);
      this.list.filter((item) => item["_id"] === id)[0].hidden =
        !this.list.filter((item) => item["_id"] === id)[0].hidden;
    },
    async SetEditInfoPost(id, body) {
      console.log("editing infopost in list : ", id);
      this.list.filter((item) => item["_id"] === id)[0].body = body;
    },
    async SetEditAnswer(qid, aid, body) {
  console.log("editing answer in list :", qid, aid);
  const q = this.list.find(item => item._id === qid);
  if (!q) return;

  const answer = q.answers.find(a => a._id === aid);
  if (answer) answer.body = body;
}
  },
});
