<template>
    
    <div class="main-container">
        <div class="container">
            <div class="Upvote" @click="Upvote" v-if="windowWidth > 750">
                <upvote :background="primaryAccent" :primaryColor1="primaryColor" :upvotes="upvotes"/>
            </div>
            
            <div class="QuestionBox">
                <div class="content" :style="{ background : background}">                                           
                    <div class="inner-container">
                        <div class="stamps">
                            <div class="info">
                                <div class="name" :style="{ color : primaryColor }">{{ question["user_Name"] }}</div>
                                <div class="timestamp" :style="{ color : secondaryColor }">{{ question['asked_At'] }}</div>
                            </div>
                            <div v-if="question.verified" class="verified" :style="{ color : secondaryColor }"><verified class="icon"/>&nbsp;<p>Verified Answer</p></div>
                        </div>
                        <div class="images" v-if="question.images">
                            <div v-for="image in images" class="img" @click="Expand(image)"><img :src=image></div>
                        </div>
                        <div class="text" :style="{ color : primaryColor }">{{ question["body"] }}</div>
                    </div>
                </div>
                <div class="box-footer">
                    <div class="Upvote" @click="test" v-if="windowWidth <= 750"><upvote :background="primaryAccent" :primaryColor1="primaryColor" :upvotes="upvotes" :windowWidth="windowWidth"/></div>
                    <div v-if="showAnswerBox && windowWidth > 750 && (AuthStore.role == 5980 || AuthStore.role ==6311)" @click="AnswerClick" class="answer" :style="{ color : primaryColor, background : background}"><forum class="icon"/>&nbsp;<p>Answer</p></div>
                    <div class="comments">
                        <button class="view-comments" @click="viewComments" :style="{ color : primaryColor }">{{commentbtn_text}}</button>
                        <button class="comment" @click="CommentClick" :style="{ color : primaryColor, background : background}"><Uparrow class="icon" />&nbsp;<p>Comment</p></button>
                    </div> 
                </div>
            </div>
            
        
            <div class="Hide" v-if="windowWidth > 750" @click="Hide" ><eye v-if="(AuthStore.role == 5980 || AuthStore.role ==6311) && !question['hidden']" class="icon" :svgColor="secondaryColor"/><closed_eye v-if="(AuthStore.role == 5980 || AuthStore.role ==6311) && question['hidden']" class="icon" :svgColor="secondaryColor"/></div>
        </div>
        <div v-if="showComments" class="comment-boxes">
            <div class="Lister">
                <div :key="comment['id']" v-for="comment in comments" class="comment-box">
                    <viewcomments :comment="comment" :secondaryColor="secondaryColor"/>
                </div>
            </div>
        </div>
    </div>
    
        

</template>


<script>
import upvote from '../common/upvote.vue'

import viewcomments from '../common/viewcomments.vue'
import Delete from '../common/Delete.vue'
import comment from '../common/comment.vue'
import verified from '../icons/new_releases.svg'
import Uparrow from '../icons/arrow_circle_up.svg'
import eye from '../icons/visibility.svg'
import closed_eye from '../icons/visibility_off.svg'
import forum from '../icons/forum.svg'

import { useQuestionStore } from '@/stores/question'
import { useAuthStore } from '@/stores/auth'

export default {
    name: 'Question',
    setup(){
        const questionStore = useQuestionStore()
        const AuthStore = useAuthStore()
        return {
            questionStore,
            AuthStore
        }
    },
    components: {
        upvote,
        Delete,
        comment,
        verified,
        Uparrow,
        eye,
        closed_eye,
        viewcomments,
        forum
    },
    data () {
        return {
            showComments: false,
            commentbtn_text:'View Comments',
            background : this.background,
            primaryColor1 : this.primaryColor,
            secondaryColor : this.secondaryColor,
            primaryAccent : this.primaryAccent,
            windowWidth: window.innerWidth,
            images : [],
            // timestamp : this.question['asked_At'],
        }
    },
    methods: {
        viewComments(){
            console.log(this.comments);
            this.showComments = !this.showComments,
            this.commentbtn_text = this.commentbtn_text === 'View Comments' ? 'Hide Comments' : 'View Comments';
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        async AnswerClick(){
            console.log("we we will be answering a question from inside a question view");
            this.questionStore.SetQuestion(this.question);
            this.questionStore.SetAction(1)
            this.questionStore.SetAddImage(true);
            this.$emit('comment');
        },
        async CommentClick(){
            if(!this.isAnswer){
                console.log("we will be commenting on a question from inside a question view");
                await this.questionStore.SetQuestion(this.question);
                await this.questionStore.SetAction(2)
                this.$emit('comment');
            }
            else{
                console.log("we will be commenting on an answer from inside a question view");
                await this.questionStore.SetAction(3);
                await this.questionStore.SetAnswerID(this.question['_id'])
                this.$emit('comment');
                this.$emit('answer_id', this.question['_id']);
            }
            await this.questionStore.SetAddImage(false);
        },
        async Upvote(){
            if(!this.isAnswer){
                console.log("we will be upvoting a question from inside a question view");
                await this.questionStore.SetQuestion(this.question);
                await this.questionStore.UpvoteQuestion();
            }
            else{
                console.log("we will be upvoting an answer from inside a question view");
                await this.questionStore.SetAnswerID(this.question['_id'])
                this.$emit('upvote');
            }
        },
        async Hide(){
            if(!this.isAnswer){
                console.log("we will be hiding a question from inside a question view");
                await this.questionStore.SetQuestion(this.question);
                await this.questionStore.HideQuestion();
            }
            else{
                console.log("we will be hiding an answer from inside a question view");
                await this.questionStore.SetAnswerID(this.question['_id'])
                this.$emit('hide');
            }
        },
        Expand(image){
            console.log('link is : ', image);
            this.questionStore.SetImageLink(image)
            console.log("expanding");
            this.$emit('expand');
        }
    },
    async mounted(){
        console.log('question in questionBoxMax', this.question);
        console.log('question content:', this.question.body);
        this.images = this.question.images;
        console.log('images in questionBoxMax', this.images);
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
    props: {    
        question: {
            type: Object,
            required: true
        },
        background: {
            type: String,
            required: true
        },
        primaryColor: {
            type: String,
            required: true
        },
        secondaryColor: {
            type: String,
            required: true
        },
        primaryAccent: {
            type: String,
            required: true
        },
        comments: {
            type: Array,
            required: true
        },
        upvotes: {
            type: Number,
            required: true
        },
        showAnswerBox: {
            type: Boolean,
            required: true
        },
        isAnswer:{
            type: Boolean,
            required: true
        }
    }
        
       
        
                
}
    </script>


<style scoped>
.main-container{
    width: 61.53vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: fit-content;
}



.Upvote{
    width: 3.98%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.QuestionBox{
    width: 85.38%;
    height: fit-content;
    margin-left: 1.1vw;
    margin-right: 1.35vw;
    
    /* overflow: auto; */
    /* border: 1px solid #000000; */
}

.content{
    border-radius: 18px;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 12px 16px 12px 16px;
}

.questionRoute{
    text-decoration: none;
    width: 100%;   
}

.route {
    text-decoration: none;
    width: 100%;
    
}
.inner-container{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}


.stamps{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.info{
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.name{
    margin-right:16px ;
    font-size: 16px;
    font-weight: 600;
}

.timestamp{
    font-size: 10px;
}

.verified{
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 6px;
    padding-left: 8px;
    padding-right: 8px;
    padding: auto;
}

.icon{
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.images{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
}

.img{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px solid ;
    margin-right: 8px;
    background : #F0F2F5;
    overflow: hidden;
    /* box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3); */
} 

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text{
    width: fit-content;
    height: fit-content;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    overflow: hidden;
}

.box-footer{
    margin-top: 1.56%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.comments{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}

.view-comments{
    border: 1px solid;
    background: none;
    width: fit-content;
    height: fit-content;
    margin-right: 1.56%;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    padding : 5px 10px 5px 10px;
}

.comment{
    border-radius: 100px;
    width: fit-content;
    height: fit-content;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 12px 5px 12px;
}

p{
    font-size: 16px;
    font-weight: 550;
}

.answer{
    border-radius: 100px;
    width: fit-content;
    height: fit-content;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 12px 5px 12px;
}

.Hide{
    width: 2vw;
    
    cursor: pointer;
}

.comment-boxes{
    margin-top: 16px;
    width: 84.98%;
    height:27vh;
    
    
}
.comment-boxes-input{
    border: 0px solid #000000;
    margin-top: 16px;
    width: 84.98%;
    height:9vh;
    
}

.CommentBox{
    padding-left: 5px;
    height: fit-content;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:left;
   }

   .Lister{
    margin-top: 1%;
    height: 87.04%;
    width: 100%;
    /* border: 5px solid green; */
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content:start;
    overflow-y: scroll;
    overflow-x: hidden
  }

  .Lister::-webkit-scrollbar {
    width : 8px;
  }

  .Lister::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  .Lister::-webkit-scrollbar-thumb {
    background: #888; 
  }

  .Lister::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  .view{
    display: flex;
    width:100%;
    align-items: top;
    justify-content:start;
    margin-left: 0%;

  }
  .inputComment{
    display: flex;
    
  }

  @media only screen and (max-width: 1150px){

    .name{
        font-size: 14px;
    }

    .timestamp{
        font-size: 8px;
    }

    .verified{
        font-size: 8px;
    }   

    .text{
        font-size: 10px;
    }

    .view-comments{
        font-size: 14px;
    }

    p{
        font-size: 14px;
    }

}



@media only screen and (max-width:750px){

.main-container{
    width: 100%;
}

.QuestionBox{
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
}

.name{
    font-size: 12px;
}

.timestamp{
    font-size: 8px;
}

.verified{
    font-size: 6px;
} 

.view-comments{
    font-size: 10px;
}

p{
    font-size: 10px;
}

.Upvote{
    margin-left: 48px;
    flex-direction: row;
}

}

</style>