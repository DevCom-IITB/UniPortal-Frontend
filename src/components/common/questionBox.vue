<template>
    
    <div class="container">
        <div class="Upvote">
            <upvote/>
        </div>
        <div class="QuestionBox"></div>
        <div class="Hide"></div>
    </div>

</template>


<script>
import upvote from '../common/upvote.vue'
import Delete from '../common/Delete.vue'
import comment from '../common/comment.vue'
import viewcomments from '../common/viewcomments.vue'
    export default {
        name: 'Question',
        components: {
            upvote,
            Delete, 
            comment,
            viewcomments
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
        
        }
        
       
        
                
}
    </script>


<style scoped>

.container{
    display: flex;
    flex-direction: row;
    justify-content: start;
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
    border: 5px green solid;
    width: 84.98%;
    height: 100%;
    margin-left: 4.15%;
    margin-right: 2.53%;
}

.Hide{
    border: 5px purple solid;
    width: 4.98%;
    height: 25%;
}

</style>