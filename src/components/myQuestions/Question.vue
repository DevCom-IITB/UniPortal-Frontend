<template>
    <div class="container">
        
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
                <button class="btn2">
                        <h1>
                            
                                Comment
                            
                        </h1>
                    </button>

            </div>
            
        </div>
        <div class="hidecomment">
            <div class="text1">
                <button class="btn2">
                        
                            
                                 Hide Comment
                            
                        
                    </button>

            </div>
            
        </div>
        <div class="line">

        </div>
    </div>
</template>


<script>
    export default {
        name: 'Question'
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
        width: 92.5%;
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






</style>