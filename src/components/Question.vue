<template>
    <div class="container">
        <div class="question">
            
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="status">
                <div class="text">Answered</div>
                
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
        <div class="upvote">
            <div class="text1">Upvote</div>
             
            </div>
        <div class="comment">
            <div class="text1">Comment</div>
            
        </div>
        <div class="line">

        </div>
    </div>
</template>


<script lang="ts">
    export default {
        name: 'Question'
    }
    </script>


<style scoped>
.container{
    position: absolute;
width: 1018px;
height: 210px;
margin-left: 160px;
margin-top: 180px;
background-color: white;

margin-right: 800px;

}
.question{
    background: #bebcbc;
        color: #000000;
        margin-left: 16px;
        margin-right:0px;
        margin-top: 0px;
        width: 986px;
        height: 154px;
        position: absolute;
        border-radius:22px;
}

.name{
    background: #929090;
        color: #000000;
        margin-left: 14pt;
        margin-right:0px;
        margin-top: 16px;
        width: 100px;
        height: 32px;
        position: absolute;
        border-radius:20px;
    
}
.status{
    background: #929090;
        color: #000000;
        margin-left: 132px;
        margin-right:0px;
        margin-top: 16px;
        width: 100px;
        height: 32px;
        position: absolute;
        border-radius:24px;
    
}
.upvote{
    
        background: #bebcbc;
        color: #000000;
        margin-left: 16px;
        margin-right:250px;
        margin-top:170px;
        width: 100px;
        height: 40px;
        position: absolute;
        border-radius:24px;
    
    
}

.comment{
    
    background: #bebcbc;
    color: #000000;
    margin-left: 132px;
    margin-right:250px;
    margin-top: 170px;
    width: 100px;
    height: 40px;
    position: absolute;
    border-radius:24px;


}
.text{
    align-items: center;
    margin-left: 7px;
    margin-top: 4px;
    background: #929090;
    margin-right: 4.5px;
}

.text1{
    align-items: center;
    margin-left: 15px;
    margin-top: 8px;
    background: #bebcbc;
    margin-right: 3.5px;
}

.qtext{
    align-items: center;
    margin-left: 16px;
    margin-top: 64px;
    background: #bebcbC;
    margin-right: 16px;
}

.line{
    background-color: bisque;
    margin-top: 230px;
    width:986px;
    height: 2px;
    margin-left: 16px;
    
}





</style>