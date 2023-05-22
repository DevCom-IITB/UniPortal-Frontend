<template>
    <div class="question">
            <div class="top">
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp"  >
                <div class="timetext" :style="{ color : secondaryColor }">Timestamp</div>
                
            </div>
          </div>

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities 
                
            </div>
            
        </div>


        <div class="question" id="one">
            <div class="top">
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp" > 
                <div class="timetext" :style="{ color : secondaryColor }">Timestamp</div>
                
            </div>
          </div>

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities 
                
            </div>
            
        </div>
        <div class="question" id="two">
            <div class="top">
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp"  > 
                <div class="timetext" :style="{ color : secondaryColor }">Timestamp</div>
                
            </div>
          </div>

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities 
                
            </div>
            
        </div>
        <div class="question" id="three">
            <div class="top">
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp" > 
                <div class="timetext" :style="{ color : secondaryColor }">Timestamp</div>
                
            </div>
          </div>

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities 
                
            </div>
            
        </div>
        
       
       
       
       
    
</template>


<script>

    export default {
        name: 'viewcomments',
        props: {
         secondaryColor: {
             type: String,
             required: true
         }
        }
       
        
    }
    </script>


<style scoped>

.top {
    display: flex;
    flex-direction: row;
}


.question{
    background-color:transparent;
        color: #000000;
        margin-left: 0%;
        margin-right:0px;
        margin-top: 1vh;
        width: 56%;
        height: 10vh;
        position: absolute;
        border-radius: 22px;
        
}

.name{
    background-color:transparent;
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

.timestamp{
    background-color:transparent;
        color: #000000;
        margin-left: 13%;
        margin-right: 0px;
        margin-top: 1.8vh;
        width: 14%;
        height:4vh;
        position: absolute;
        border-radius: 24px;
    
}
#one{
    margin-top: 14vh;
}
#two{
    margin-top: 27vh;
}
#three{
    margin-top: 40vh;
}








.timetext{
    text-align: center;
    
    margin-top: 4px;
    background-color: transparent;

    
    
}

.text{
    text-align:left;
    color: black;
    margin-top: 6px;
    background-color: transparent;
    margin-left: 0px;
    margin-right: 4px;
    height: 3vh;
    font-size:large;
    
    

}

.qtext{
    align-items: center;
    margin-left: 22px;
    margin-top: 52px;
    background-color:transparent;
}







</style>