<template>
    
            
            <div class="name"> 
                <div class="text">Tanmay Jain</div>
                
            </div>
            <div class="timestamp"> 
                <div class="timetext">Timestamp</div>
                
            </div>
          

           
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities 
                
            </div>
</template>


<script>

    export default {
        name: 'viewcomments',
        
    }
    </script>


<style scoped>




.question{
    background-color:red;
        color: #000000;
        margin-left: 5%;
        margin-right:10%;
        margin-top: 92vh;
        width: 66%;
        height: 5vh;
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
    margin-top: 103vh;
}








.timetext{
    text-align: center;
    color:rgb(63, 61, 61);
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
    margin-top: 62px;
    background-color:transparent;
}







</style>