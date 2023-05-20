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
                            <div v-if="question.verified" class="verified" :style="{ color : secondaryColor }"><verified class="icon" :style="{ color : secondaryColor }"/>&nbsp;<p>Verified Answer</p></div>
                        </div>
                        <div class="text" :style="{ color : primaryColor }">{{ question["body"] }}</div>
                    </div>
                </div>
                <div class="comments">
                    <button class="view-comments" @click="viewComments" :style="{ color : primaryColor }">View Comments</button>
                    <button class="comment" :style="{ color : primaryColor, background : background}"><Uparrow class="icon" />&nbsp<p>Comment</p></button>
                </div> 
            </div>
            <div class="Hide"><eye class="icon" :svgColor="secondaryColor"/></div>
        </div>
        <div v-if="showComments" class="comment-boxes">A design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces mayA design system isn’t only a collection of the assets and components you use to build a digital product. According to Emmet Connolly, director of product design at Intercom, “… most Design Systems are really just Pattern Libraries: a big box of UI Lego pieces that can be assembled in near-infinite ways. All the pieces may</div>
    </div>
        

</template>


<script>
import upvote from '../common/upvote.vue'
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
            eye
        },
        data () {
            return {
                showComments: false,
                background : this.background,
                primaryColor1 : this.primaryColor,
                secondaryColor : this.secondaryColor,
                primaryAccent : this.primaryAccent,
            }
        },
        methods: {
            viewComments(){
                this.showComments = !this.showComments
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
}

.text{
    width: fit-content;
    height: fit-content;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
}
</style>