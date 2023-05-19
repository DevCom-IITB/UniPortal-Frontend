<template>
    
    <div class="container">
        <div class="Upvote">
            <upvote/>
        </div>
        <div class="QuestionBox">
            <div class="content">
                <div class="inner-container">
                    <div class="stamps">
                        <div class="info">
                            <div class="name">{{ question["User_name"] }}</div>
                            <div class="timestamp">{{ question["timestamp"] }}</div>
                        </div>
                        <div v-if="question.verified" class="verified"><verified class="icon"/>&nbsp;<p>Verified</p></div>
                    </div>
                    <div class="text">{{ question["body"] }}</div>
                </div>
            </div>
            <div class="comments">
                <button class="view-comments" >View Comments</button>
                <button class="comment"><Uparrow class="icon"/><p>Comment</p></button>
            </div>
        </div>
        <div class="Hide"></div>
    </div>

</template>


<script>
import upvote from '../common/upvote.vue'
import Delete from '../common/Delete.vue'
import comment from '../common/comment.vue'
import verified from '../icons/new_releases.svg'
import Uparrow from '../icons/arrow_circle_up.svg'

    export default {
        name: 'Question',
        components: {
            upvote,
            Delete, 
            comment,
            verified,
            Uparrow
        },
        data () {
            return {
                showComment: false,
                viewComment: false
            }
        },
        methods: {
            toggleComment() {
                this.showComment = !this.showComment

            },
            toggle() {
                this.viewComment = !this.viewComment
            }
        },
        props: {
            question: {
                type: Object,
                required: true
            }
        }
        
       
        
                
}
    </script>


<style scoped>

.container{
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
}

.Upvote{
    width: 3.98%;
    height: 38.68%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.QuestionBox{
    width: 84.98%;
    height: 100%;
    margin-left: 3.56%;
    margin-right: 2.53%;
}

.content{
    background: #f2f2f2;
    border-radius: 24px;
    width: 100%;
    height: 71.70%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner-container{
    width: 94.72%;
    height: 73.68%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.stamps{
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.info{
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.name{
    margin-right:16px ;
    font-size: 1vmax;
    font-weight: 600;
}

.timestamp{
    font-size: 0.6vmax;
}

.verified{
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000000;
    border-radius: 6px;
    padding-left: 8px;
    padding-right: 8px;
    padding: auto;
}

.icon{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.text{
    width: 100%;
    height: 64.29%;
    font-size: 0.8vmax;
    line-height: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.comments{
    width: 100%;
    height: 20.75%;
    margin-top: 1.56%;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    cursor: pointer;
    border: none;
}

.view-comments{
    border: 1px black solid;
    width: 19.14%;
    height: 100%;
    margin-right: 1.56%;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}

.comment{
    border-radius: 100px;
    width: 16.31%;
    height: 100%;
    background: #f2f2f2;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
}

.comment p{
    font-size: 0.93vmax;
    font-weight: 600;
}

.Hide{
    border: 5px purple solid;
    width: 4.98%;
    height: 25%;
}

</style>