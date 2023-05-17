<template>
    
        <div class="del">
        <Delete />
        </div>
        
        
        
        
        <div class="container">
            
            
            
        
            <div v-show="showComment" class="comm">
                <comment />  
            </div>  
            <div v-show="viewComment" class="view">
                <viewcomments />  
            </div>  
            
            <upvote />

            <div class="question">
            <div class="top">
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp"> 
                <div class="timetext">Timestamp</div>
                
            </div>
            <div class="verification"> 
                <div class="vtext">Verified answer</div>
                
            </div>
            </div>

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                 Vuetify now provides since v2.3 border utilities 
                 to quickly style the border-radius of any element.
                 By continuing, you’re agreeing to our main services 
                 agreement, user terms of service, privacy policy, 
                 cookie policy and Slack supplemental terms.
            </div>
            
        </div>
        
        <div class="comment">
            <div class="text1">
                <button @click="toggleComment" class="btn2">
                        <h1>
                            
                                Comment
                            
                        </h1>
                    </button>

            </div>
            
        </div>

        <div class="hidecomment">
            <div class="text1">
                <button @click="toggle" class="btn2">
                        <h1>
                            
                                view
                            
                        </h1>
                    </button>

            </div>
            
        </div>
        
        

            </div>
            
        
        
    
</template>


<script>
import upvote from '../common/upvote.vue'
import Delete from '../myQuestions/Delete.vue'
import comment from '../myQuestions/comment.vue'
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
    position: absolute;
width: 59%;
height: 25vh;
margin-left: 32%;
margin-top: 64vh;
background-color: white;
display: flex
}

.top {
    display: flex;
    flex-direction: row;
}

.comm {
    display: flex;
    position:absolute;
    flex-grow: 1;
}
.question{
    background-color: #bebcbc;
        color: #000000;
        margin-left: 5%;
        margin-right:0px;
        margin-top: 0px;
        width: 93.3%;
        height: 18vh;
        position: absolute;
        border-radius: 22px;
        
}

.del {
    margin-left: 88%;
    margin-top: -2vh;
    color: red;
    z-index: 1;
    position: absolute;
}

.name{
    background-color:#bebcbc;
        color: #000000;
        margin-left: 2%;
        margin-right:0px;
        margin-top: 1.5vh;
        width: 14%;
        height: 5vh;
        position: absolute;
        border-radius:24px;  
        text-align:left;
     
}
.verification{
    background-color:#bebcbc;
        color: #000000;
        margin-left: 80%;
        
        margin-top: 2vh;
        width: 14%;
        height: 4vh;
        position: absolute;
        border-radius:15px; 
        border-color: #000000; 
        border-width: 1px;
        border-style: solid;
}
.timestamp{
    background-color:#bebcbc;
        color: #000000;
        margin-left:13%;
        margin-right: 0;
        margin-top: 1.8vh;
        width: 14%;
        height:4vh;
        position: absolute;
        border-radius: 24px;
    
}



.comment{
    background-color: #bebcbc;
    color: #000000;
    margin-left: 83%;
    
    margin-top: 19vh;
    width: 15%;
    height: 5vh;
    position: absolute;
    border-radius:24px;
}
.hidecomment{
    
    background-color: #bebcbc;
    color: #000000;
    margin-left: 68%;
    
    margin-top: 19vh;
    width: 15%;
    height: 5vh;
    position: absolute;
    border-radius:24px;
    

}
.view{
    
    margin-left: 5%;
    margin-top: 20%;
    width:266%;
    height:1px;
    

}




.timetext{
    text-align: center;
    color:rgb(63, 61, 61);
    margin-top: 4px;
    background-color: #bebcbc;

    
    
}
.vtext{
    text-align: center;
    color: rgb(72, 70, 70);
    margin-top: 4px;
    background-color: #bebcbc;
    margin-left: 4px;
    margin-right: 4px;
    

}
.text{
    text-align:left;
    color: black;
    margin-top: 6px;
    background-color: #bebcbc;
    margin-left: 4px;
    margin-right: 4px;
    height: 3vh;
    font-size:large;
    
    

}

.qtext{
    align-items: center;
    margin-left: 16px;
    margin-top: 64px;
    background-color: #bebcbc;
}

.line{
    background-color: bisque;
 
    width:100%;
    height: 2px;
    margin-left: 16px;
    margin-top: -2vh
    
}

.btn2{
    margin-top: 3px;
    margin-left: 35px;
    height: 10%;
    background-color: #bebcbc;
}






</style>