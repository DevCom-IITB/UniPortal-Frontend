<template>
    <div class="del">
        <Delete />
    </div>

    
    
    
    
        <div class="container"> 
            <div v-show="showComment">
            <comment @toggle-comment="toggleComment" /> 
            </div>    
        
            <div class="upvotebox">
                <button class="btn1">
                        <h1>
                            
                                ^
                            
                        </h1>
                </button>
                <div class="upvotetext">4</div>
            </div>
        
            <div class="question">
                <div class="top">
                    <div class="name"> 
                        <div class="text">Saksham</div>
                    </div>
                    <div class="timestamp"> 
                        <div class="timetext">timestamp</div>
                    </div>
                    <div class="verification"> 
                        <div class="vtext">verified answer</div>
                    </div>
                </div>

           
                <div class="qtext">
                    <p>i would like to upvote vamsi krishna's answer</p>.
                </div>
            
            </div>
        
            <div class="comment">
                <div class="text1">
                    <button @click="toggleComment" class="btn2">
                        <h1>
                            
                             comment
                            
                        </h1>
                    </button>
                </div>
            </div>
        </div>
            
   
            
    
</template>


<script>

    import Delete from './Delete.vue'
    import comment from './comment.vue'

    export default {
        name: 'Question',
        components: {
            Delete,
            comment
        },
        data() {
            return {
                showComment: false
            }
        },
        methods: {
            toggleComment() {
                this.showComment = !this.showComment
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
display: flex;

.top {
    display: flex;
    flex-direction: row;
}

}
.question{
    background: #bebcbc;
        color: #000000;
        margin-left: 6vh;
        margin-right:0px;
        margin-top: 0px;
        width: 93.3%;
        height: 18vh;
        position: absolute;
        border-radius: 22px;
        
}

.name{
    background:#bebcbc;
        color: #000000;
        margin-left: 2%;
        margin-right:0px;
        margin-top: 2vh;
        width: 14%;
        height: 8vh;
        position: absolute;
        border-radius:24px;  
        text-align:left;
     
}
.verification{
    background:#bebcbc;
        color: #000000;
        margin-left: 80%;
        
        margin-top: 2vh;
        width: 14%;
        height: 4vh;
        position: absolute;
        border-radius:24px;  
}
.timestamp{
    background:#bebcbc;
        color: #000000;
        margin-left: 20%;
        margin-right: 0px;
        margin-top: 1.8vh;
        width: 14%;
        height:4vh;
        position: absolute;
        border-radius: 24px;
    
}

.upvotebox{
    border-radius: 100px;
    height:10vh;
    width:4%;
    background-color:#bebcbc;
    position: absolute;
    top: 50%;
    margin-top: -8vh;
    
}

.upvotetext{
    text-align: center;
    color: black;
    margin-top: 0.5vh;
    font-size: x-large;
}

.comment{
    background: #bebcbc;
    color: #000000;
    margin-left: 83%;
    
    margin-top: 19vh;
    width: 15%;
    height: 5vh;
    position: absolute;
    border-radius:24px;
}
.hidecomment{
    background: #bebcbc;
    color: #000000;
    margin-left: 68%;
    
    margin-top: 19vh;
    width: 15%;
    height: 5vh;
    position: absolute;
    border-radius:24px;


}



.timetext{
    text-align: center;
    color: black;
    margin-top: 4px;
    
    
}
.vtext{
    text-align: center;
    color: black;
    margin-top: 4px;
    

}

.qtext{
    align-items: center;
    margin-left: 16px;
    margin-top: 64px;
}

.line{
    background-color: bisque;
 
    width:100%;
    height: 2px;
    margin-left: 16px;
    margin-top: -2vh
    
}
.btn1{
    margin-top: 0.9vh;
    margin-left: 0.95vh;
    width: 66%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn2{
    margin-top: 0px;
    margin-left: 9px;
}

.del {
    
    margin-left: 88%;
    margin-top: -2vh;
    color: red;
    z-index: 1;
    position: absolute;
    
}




</style>