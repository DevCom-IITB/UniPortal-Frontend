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
                            <div class="name">Sanskar Gosavi</div>
                            <div class="timestamp">17:12 19/05/23 </div>
                        </div>
                        <div class="verified"><verified class="icon"/>&nbsp;<p>Verified</p></div>
                    </div>
                    <div class="text">History has shown that features originating from responses to specific access needs (dark mode, text-speech, speech-to-text) are a result of creative problem-solving within specified constraints. Seeing the requirements as opportunities, rather than constraints, has been shown to lead to solutions that hive...</div>
                </div>
            </div>
            <div class="comments"></div>
        </div>
        <div class="Hide"></div>
    </div>

</template>


<script>
import upvote from '../common/upvote.vue'
import Delete from '../common/Delete.vue'
import comment from '../common/comment.vue'
import viewcomments from '../common/viewcomments.vue'
import verified from '../icons/new_releases.svg'

    export default {
        name: 'Question',
        components: {
            upvote,
            Delete, 
            comment,
            viewcomments,
            verified
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
    /* border: 5px red solid; */
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
}

.comments{
    border: 5px yellow solid;
    width: 100%;
    height: 20.75%;
    margin-top: 1.56%;
}

.Hide{
    border: 5px purple solid;
    width: 4.98%;
    height: 25%;
}

</style>