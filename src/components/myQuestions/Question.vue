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
            
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp"> 
                <div class="timetext">Timestamp</div>
                
            </div>
            <div class="verification"> 
                <div class="vtext">Verified answer</div>
                
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
width: 1088px;
height: 228px;
margin-left: 597px;
margin-top: 576px;
background-color: white;

margin-right: 800px;

}
.question{
    background: #bebcbc;
        color: #000000;
        margin-left: 64px;
        margin-right:0px;
        margin-top: 0px;
        width: 1024px;
        height: 154px;
        position: absolute;
        border-radius:22px;
}

.name{
    background:#bebcbc;
        color: #000000;
        margin-left: 16pt;
        margin-right:0px;
        margin-top: 16px;
        width: 130px;
        height: 40px;
        position: absolute;
        border-radius:24px;
    
}
.verification{
    background:#bebcbc;
        color: #000000;
        margin-left: 886px;
       
        margin-right:0px;
        margin-top: 16px;
        width: 130px;
        height: 40px;
        position: absolute;
        border-radius:24px;
    
}
.timestamp{
    background:#bebcbc;
        color: #000000;
        margin-left: 114pt;
        margin-right:0px;
        margin-top: 16px;
        width: 130px;
        height: 40px;
        position: absolute;
        border-radius:24px;
    
}

.upvotebox{
    border-radius: 100px;
    height:82px;
    width:48px;
    background-color:#bebcbc;
    
    position: absolute;
    top:50%;
    margin-top: -41px;
    margin-left: 8px;
}

.upvotetext{
    text-align: center;
    color: black;
    margin-top: 2px;
    font-size: x-large;
}

.comment{
    
    background: #bebcbc;
    color: #000000;
    margin-left: 921px;
    margin-right:250px;
    margin-top: 170px;
    width: 167px;
    height: 44px;
    position: absolute;
    border-radius:24px;


}
.hidecomment{
    
    background: #bebcbc;
    color: #000000;
    margin-left: 740px;
    margin-right:250px;
    margin-top: 170px;
    width: 167px;
    height: 44px;
    position: absolute;
    border-radius:24px;


}
.text{
    text-align:left;
    color: black;
    margin-top: -4px;
    
    padding: 5px;
    font-size: larger;
    font-weight:500;
}

.text1{
    text-align: center;
    color: black;
    margin-top: 4px;
    
    font-size: large;
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
 
    width:986px;
    height: 2px;
    margin-left: 16px;
    
}
.btn1{
    margin-top: 5px;
    margin-left: 9px;
}
.btn2{
    margin-top: 0px;
    margin-left: 9px;
}





</style>