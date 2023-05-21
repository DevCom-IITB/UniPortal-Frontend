<template>
    
    <div class="main-container">
        <div class="container">
            <div class="Upvote">
                <upvote :background="primaryAccent" :primaryColor1="primaryColor"/>
            </div>
            <div class="QuestionBox">
                <div class="content" :style="{ background : background}">
                    <div class="inner-container">
                        <div class="stamps">
                            <div class="info">
                                <div class="name" :style="{ color : primaryColor }">{{ question["User_name"] }}</div>
                                <div class="timestamp" :style="{ color : secondaryColor }">{{ question["timestamp"] }}</div>
                            </div>
                            <div v-if="question.verified" class="verified" :style="{ color : secondaryColor }"><verified class="icon"/>&nbsp;<p>Verified Answer</p></div>
                        </div>
                        <div class="text" :style="{ color : primaryColor }">{{ question["body"] }}</div>
                    </div>
                </div>
                <div class="comments">
                    <button class="view-comments" @click="viewComments" ref="btnToggle" :style="{ color : primaryColor }">View Comments</button>
                    <button class="comment" @click="inputcomment" :style="{ color : primaryColor, background : background}"><Uparrow class="icon" />&nbsp<p>Comment</p></button>
                </div> 
            </div>
            <div class="Hide"><eye class="icon" :svgColor="secondaryColor"/></div>
        </div>
        <div v-if="showComments" class="comment-boxes">
            <div class="Lister"><div class="CommentBox"><viewcomments /></div></div>
        </div>

            <div v-if="inputComments" class="comment-boxes-input">
            
            <div class="CommentBox"><comment/></div>
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

    export default {
        name: 'Question',
        components: {
            upvote,
            Delete, 
            comment,
            verified,
            Uparrow,
            eye,
            viewcomments
        },
        data () {
            return {
                
                inputComments: false,
                showComments: false,
                background : this.background,
                primaryColor1 : this.primaryColor,
                secondaryColor : this.secondaryColor,
                primaryAccent : this.primaryAccent,
                comments : [],
            }
        },
        methods: {
            viewComments(){
                this.showComments = !this.showComments,
                this.$refs.btnToggle.innerText = this.show?'View Comments':'Hide Comments';

            },
            inputcomment(){
                this.inputComments = !this.inputComments

            }
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
    justify-content: center;
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
    width: 84.98%;
    height: fit-content;
    margin-left: 3.56%;
    margin-right: 2.53%;
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

.inner-container{
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
    overflow: visible;
    border: 1px solid #000000;
}

.text{
    width: fit-content;
    height: fit-content;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    /* display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; */
    overflow: hidden;
    /* text-overflow: ellipsis; */
}

.comments{
    width: 100%;
    height: fit-content;
    margin-top: 1.56%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    border: none;
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

.comment p{
    font-size: 16px;
    font-weight: 550;
}



.Hide{
    width: 4.98%;
    height: 25%;
    cursor: pointer;
}

.comment-boxes{
    border: 1px solid #000000;
    margin-top: 16px;
    width: 84.98%;
    height:22vh;
    
}
.comment-boxes-input{
    border: 0px solid #000000;
    margin-top: 16px;
    width: 84.98%;
    height:9vh;
    
}

.CommentBox{
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
    width: 170%;
    
    /* border: 5px solid green; */
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:start;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .Lister::-webkit-scrollbar {
    display: none;
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

</style>