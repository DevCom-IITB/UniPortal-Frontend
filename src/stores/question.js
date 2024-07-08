import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useListStore } from "./list";
import { useColourStore } from "./colour";

export const useQuestionStore = defineStore("question", {
  id: "question",
  state: () => ({
    question: {},
    answers: [],
    comments: [],
    question_ID: "",
    answer_ID: "",
    comment_ID: "",
    info_ID: "",
    addImage: false,
    ImageLink: "",
    showSnackbar: false,
    snackMessage: "",
    action: 0, // 1 is for answering a question, 2 is for commenting on a question, 3 is for commenting on an answer, 4 is for posting a question with student's original identity, 5 is for posting a infopost, 6 is for editing an infopost, 7 for posting a question anonymously by a student
  }),
  persist: true,
  actions: {
    async sendQuery(query) {
      try {
        const authStore = useAuthStore();
        const accessToken = authStore.accessToken;
        const bearer = `Bearer ${accessToken}`;

        const requestData = typeof query === 'string' ? query : query.toString();

        const response = await fetch('http://localhost:5001/newbee/nlp/recommend', {
          method: 'POST',
          headers: {
            Authorization: bearer,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Recommendation response:', data);
          return data.map(item => ({ question: item.question, qid: item.qid }));
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending query:', error);
      }
    },

    async SetQuestion(question) {
      console.log("we have entered the set question function in question.js");
      this.question = question;
      this.answers = question["answers"];
      this.comments = question["comments"];
      console.log(
        "state variables :",
        this.question,
        this.answers,
        this.comments
      );
    },
    async SetAction(action) {
      this.action = action;
      console.log("action : ", this.action);
    },
    async SetAddImage(addImage) {
      this.addImage = addImage;
      console.log("addImage : ", this.addImage);
    },
    async SetQuestionID(question_ID) {
      this.question_ID = question_ID;
      console.log("question_ID : ", this.question_ID);
    },
    async SetAnswerID(answer_ID) {
      this.answer_ID = answer_ID;
      console.log("answer_ID : ", this.answer_ID);
    },
    async SetCommentID(comment_ID) {
      console.log("setting comment id"), (this.comment_ID = comment_ID);
      console.log("comment_ID : ", this.comment_ID);
    },
    async SetInfoID(info_ID) {
      this.info_ID = info_ID;
      console.log("info_ID : ", this.info_ID);
    },
    async SetImageLink(ImageLink) {
      this.ImageLink = ImageLink;
      console.log("ImageLink : ", this.ImageLink);
    },
    async SetShowSnackBar(showSnackbar) {
      this.showSnackbar = showSnackbar;
      console.log("showSnackbar : ", this.showSnackbar);
    },
    async SetSnackMessage(snackMessage) {
      this.snackMessage = snackMessage;
      console.log("snackMessage : ", this.snackMessage);
    },
    async PostQuestion(body, images) {
      const authStore = useAuthStore();
      const colourStore = useColourStore();
      console.log("we have entered the post question function in question.js");
      console.log("images : ", images);
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const questionObj = new FormData();
      questionObj.append("user_ID", uid);
      questionObj.append("body", body);
      questionObj.append("is_Anonymous", false);
      for (let i = 0; i < images.length; i++) {
        questionObj.append("images", images[i]);
        console.log(`image ${i} : `, images[i]);
      }

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/post`, {
        method: "POST",
        headers: {
          Authorization: bearer,
        },
        body: questionObj,
      })
      // message for adding question
      this.showSnackbar = true;
      console.log("snackbar");

      if (res.status == 200) {
        console.log("successfully added question");
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        await colourStore.SetSnackColor(true);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;


          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/post`, {
              method: "POST",
              headers: {
                Authorization: bearer,
              },
              body: questionObj,
            })
            // message for adding question
            colourStore.SetSnackColor(true);
            this.showSnackbar = true;
            console.log("snackbar");
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          colourStore.SetSnackColor(false);
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async PostInfoPost(body, images) {
      const colourStore = useColourStore();
      console.log("we have entered the post infopost function in question.js");
      const authStore = useAuthStore();
      console.log("images : ", images);
      const infoPostObj = new FormData();
      infoPostObj.append("body", body);
      for (let i = 0; i < images.length; i++) {
        infoPostObj.append("images", images[i]);
        console.log(`image ${i} : `, images[i]);
      }
      // const infoPostObj = {
      //     body : body,
      // }
      console.log("infopost object : ", infoPostObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/post`, {
        method: "POST",
        headers: {
          Authorization: bearer,
        },
        body: infoPostObj,
      })
      // message for adding InfoPost
      this.showSnackbar = true;
      console.log("snackbar");
      if (res.status == 200) {
        console.log("successfully added InfoPost");
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        await colourStore.SetSnackColor(true);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/post`, {
              method: "POST",
              headers: {
                Authorization: bearer,
              },
              body: infoPostObj,
            })
            // message for adding InfoPost
            this.showSnackbar = true;
            colourStore.SetSnackColor(true);
            console.log("snackbar");
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          colourStore.SetSnackColor(false);
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async AddAnswer(body, images) {
      const authStore = useAuthStore();
      const colourStore = useColourStore();
      console.log("we have entered the add answer function in question.js");

      console.log("images : ", images);
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const answerObj = new FormData();
      answerObj.append("answers[user_ID]", uid);
      answerObj.append("answers[body]", body);

      for (let i = 0; i < images.length; i++) {
        answerObj.append("images", images[i]);
        console.log(`image ${i} : `, images[i]);
      }

      console.log("answer object : ", answerObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question["_id"]);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/answerQ/${this.question["_id"]}`, {
        method: "PATCH",
        headers: {
          Authorization: bearer,
        },
        body: answerObj,
      })
      // message for adding answer
      this.showSnackbar = true;
      console.log("snackbar");

      if (res.status == 200) {
        console.log("successfully added answer");
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        await colourStore.SetSnackColor(true);
        window.location.href = import.meta.env.VITE_BASE + "/answered";
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/answerQ/${this.question["_id"]}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: bearer,
                },
                body: answerObj,
              }
            )
            // message for adding answer
            this.showSnackbar = true;
            colourStore.SetSnackColor(true);
            console.log("snackbar");
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            window.location.href = import.meta.env.VITE_BASE + "/answered";
            window.onload = function () {
              window.location.href = import.meta.env.VITE_BASE + "/question";
            };
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async AddCommentQuestion(body) {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the add comment on a question function in question.js"
      );
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const commentObj = {
        comments: {
          user_ID: uid,
          body: body,
        },
      };
      console.log("comment object : ", commentObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question["_id"]);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/commentQ/${this.question["_id"]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(commentObj),
      });
      // message for adding comment on question
      this.showSnackbar = true;
      console.log("snackbar");

      if (res.status == 200) {
        console.log("successfully added comment on question");
        const data = await res.json();
        colourStore.SetSnackColor(true);
        console.log('data :', data);
        this.snackMessage = data.message;
        const comment = {
          asked_At: new Date(),
          hidden: false,
          body: body,
          user_Name: authStore.name,
          _id: "0",
        };
        await listStore.AddCommentQuestion(this.question["_id"], comment);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/commentQ/${this.question["_id"]}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
                body: JSON.stringify(commentObj),
              }
            )
            // message for adding comment on question
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            const comment = {
              asked_At: new Date(),
              hidden: false,
              body: body,
              user_Name: authStore.name,
              _id: "0",
            }
            this.showSnackbar = true;
            await listStore.AddCommentQuestion(this.question["_id"], comment);
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async AddCommentAnswer(body) {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the add comment on an answer function in question.js"
      );
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const commentObj = {
        answers: {
          comments: {
            user_ID: uid,
            body: body,
          },
        },
      };
      console.log("comment object : ", commentObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question["_id"]);
      console.log("Sending request");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/commentA/${this.question_ID}/${this.answer_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify(commentObj),
        }
      )
      // message for adding comment on answer
      this.showSnackbar = true;
      console.log("snackbar");


      if (res.status == 200) {
        console.log("successfully added comment on answer :", this.answer_ID);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        const comment = {
          asked_At: new Date(),
          hidden: false,
          body: body,
          user_Name: authStore.name,
          _id: "0",
        };
        await listStore.AddCommentAnswer(
          this.question_ID,
          this.answer_ID,
          comment
        );
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/commentA/${this.question_ID}/${this.answer_ID}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
                body: JSON.stringify(commentObj),
              }
            )
            // message for adding comment on answer
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            const comment = {
              asked_At: new Date(),
              hidden: false,
              body: body,
              user_Name: authStore.name,
              _id: "0",
            };
            await listStore.AddCommentAnswer(
              this.question_ID,
              this.answer_ID,
              comment
            );
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async UpvoteQuestion() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the upvote a question function in question.js",
        this.question["_id"]
      );
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const upvoteObj = {
        user_ID: uid,
      };
      console.log("upvote object : ", upvoteObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question["_id"]);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/upvoteQ/${this.question["_id"]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(upvoteObj),
      })
      // message for upvoting a question
      this.showSnackbar = true;
      console.log("snackbar");

      if (res.status == 200) {
        console.log("successfully upvotes on question :", this.question["_id"]);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        const val = data["val"];
        listStore.UpvoteQuestion(this.question["_id"], val);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/upvoteQ/${this.question["_id"]}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
                body: JSON.stringify(upvoteObj),
              }
            )
            // message for upvoting a question
            this.showSnackbar = true;
            this.question["upvotes"]++;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async UpvoteAnswer() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the upvote on an answer function in question.js"
      );
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const upvoteObj = {
        user_ID: uid,
      };
      console.log("upvote object : ", upvoteObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question_ID);
      console.log("Sending request");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/upvoteA/${this.question_ID}/${this.answer_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify(upvoteObj),
        }
      )
      // message for upvoting an answer
      this.showSnackbar = true;

      if (res.status == 200) {
        console.log("successfully added upvote on answer :", this.answer_ID);
        const data = await res.json();
        console.log("data : ", data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        const val = data["val"];
        listStore.UpvoteAnswer(this.question_ID, this.answer_ID, val);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/upvoteA/${this.question_ID}/${this.answer_ID}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
                body: JSON.stringify(upvoteObj),
              }
            )
            // message for upvoting an answer
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
    async HideQuestion() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the hide a question function in question.js",
        this.question["_id"]
      );

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question["_id"]);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/hideQ/${this.question["_id"]}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      })
      // message for hiding a question
      this.showSnackbar = true;

      if (res.status == 200) {
        console.log("successfully hid the question :", this.question["_id"]);
        await listStore.SetHideQuestion(this.question["_id"]);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/hideQ/${this.question["_id"]}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
              }
            )
            // message for hiding a question
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetHideQuestion(this.question["_id"]);
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          colourStore.SetSnackColor(false);
          await this.authStore.Logout();
        }
      }
    },
    async HideAnswer() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log("we have entered the hide an answer function in question.js");
      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question_ID);
      console.log("Sending request");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/hideA/${this.question_ID}/${this.answer_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      )
      // message for hiding an answer
      this.showSnackbar = true;

      const answer = this.question["answers"].find(
        (answer) => answer["_id"] === this.answer_ID
      );

      console.log("answer : ", answer);

      if (res.status == 200) {
        console.log("successfully hid answer :", this.answer_ID);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        await listStore.SetHideAnswer(this.question_ID, this.answer_ID);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/hideA/${this.question_ID}/${this.answer_ID}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
              }
            )
            // message for hiding an answer
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetHideAnswer(this.question_ID, this.answer_ID);
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },

    async HideQuestionComment() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log("we have entered the hide a comment function in question.js");
      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question_ID);
      console.log("Sending request");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/hideC/${this.question_ID}/${this.comment_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      )
      // message for hiding a comment
      this.showSnackbar = true;

      const comment = this.question["comments"].find(
        (comment) => comment["_id"] === this.comment_ID
      );

      console.log("comment : ", comment);

      if (res.status == 200) {
        console.log("successfully hid comment :", this.comment_ID);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        await listStore.SetHideQuestionComment(
          this.question_ID,
          this.comment_ID
        );
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/hideC/${this.question_ID}/${this.comment_ID}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
              }
            )
            // message for hiding a comment
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetHideQuestionComment(
              this.question_ID,
              this.comment_ID
            );
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          colourStore.SetSnackColor(false);
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },

    async HideAnswerComment() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the hide a comment for answer function in question.js"
      );
      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("question id : ", this.question_ID);
      console.log("Sending request");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/question/hideAC/${this.question_ID}/${this.answer_ID}/${this.comment_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      )
      // message for hiding a comment
      this.showSnackbar = true;

      if (res.status == 200) {
        console.log("successfully hid comment :", this.comment_ID);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        await listStore.SetHideAnswerComment(
          this.question_ID,
          this.answer_ID,
          this.comment_ID
        );
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(
              `${import.meta.env.VITE_API_BASE}/question/hideAC/${this.question_ID}/${this.answer_ID}/${this.comment_ID}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: bearer,
                },
              }
            )
            // message for hiding a comment
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetHideAnswerComment(
              this.question_ID,
              this.answer_ID,
              this.comment_ID
            );
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          colourStore.SetSnackColor(false);
          await this.authStore.Logout();
        }
      }
    },

    async HideInfoPost() {
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      console.log(
        "we have entered the hide a infopost function in question.js",
        this.info_ID
      );

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/hide/${this.info_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      })
      // message for hiding a comment
      this.showSnackbar = true;

      if (res.status == 200) {
        console.log("successfully hid the info post :", this.info_ID);
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        await listStore.SetHideInfoPost(this.info_ID);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/hide/${this.info_ID}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
              },
            })
            // message for hiding a comment
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetHideInfoPost(this.info_ID);
            return data;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          colourStore.SetSnackColor(false);
          await this.authStore.Logout();
        }
      }
    },
    async EditInfoPost(body) {
      console.log("we have entered the post infopost function in question.js");
      const authStore = useAuthStore();
      const listStore = useListStore();
      const colourStore = useColourStore();
      const infoPostObj = {
        body: body,
      };
      console.log("infopost object : ", infoPostObj);

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/edit/${this.info_ID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(infoPostObj),
      })
      // message for hiding a comment
      this.showSnackbar = true;

      if (res.status == 200) {
        console.log("successfully edited InfoPost");
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        colourStore.SetSnackColor(true);
        listStore.SetEditInfoPost(this.info_ID, body);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          // message for refreshing token
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;

          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/info/edit/${this.info_ID}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
              },
              body: JSON.stringify(infoPostObj),
            })
            // message for hiding a comment
            this.showSnackbar = true;
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
            colourStore.SetSnackColor(true);
            await listStore.SetEditInfoPost(this.info_ID, body);
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          colourStore.SetSnackColor(false);
          await this.authStore.Logout();
        }
      }
    },
    async PostQuestionAnonymously(body, images) {
      const authStore = useAuthStore();
      const colourStore = useColourStore();
      console.log("we have entered the post question function in question.js");
      console.log("images : ", images);
      const uid = authStore.user_ID;
      console.log("user id  parent function: ", uid);
      const questionObj = new FormData();
      questionObj.append("user_ID", uid);
      questionObj.append("body", body);
      questionObj.append("is_Anonymous", true);
      for (let i = 0; i < images.length; i++) {
        questionObj.append("images", images[i]);
        console.log(`image ${i} : `, images[i]);
      }

      const accessToken = authStore.accessToken;

      const bearer = `Bearer ${accessToken}`;

      console.log("bearer : ", bearer);
      console.log("Sending request");
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/post`, {
        method: "POST",
        headers: {
          Authorization: bearer,
        },
        body: questionObj,
      })
      // message for adding question
      this.showSnackbar = true;
      console.log("snackbar");

      if (res.status == 200) {
        console.log("successfully added question");
        const data = await res.json();
        console.log('data :', data);
        this.snackMessage = data.message;
        await colourStore.SetSnackColor(true);
      } else {
        if (res.status === 403) {
          console.log("refreshing token");
          const res = await this.authStore.Refresh()
          this.showSnackbar = true;
          console.log("snackbar");
          const data = await res.json();
          console.log('data :', data);
          this.snackMessage = data.message;


          if (res.status === 200) {
            console.log("refreshed token");
            const bearer = `Bearer ${this.authStore.accessToken}`;
            console.log("new bearer : ", bearer);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/question/post`, {
              method: "POST",
              headers: {
                Authorization: bearer,
              },
              body: questionObj,
            })
            // message for adding question
            colourStore.SetSnackColor(true);
            this.showSnackbar = true;
            console.log("snackbar");
            console.log("new request sent");
            const data = await res.json();
            console.log('data :', data);
            this.snackMessage = data.message;
          } else {
            console.log("refresh failed");
            await this.authStore.Logout();
          }
        } else {
          colourStore.SetSnackColor(false);
          this.showSnackbar = true;
          console.log("snackbar");
          this.snackMessage = "not enough permissions";
          await this.authStore.Logout();
        }
      }
    },
  },
});
