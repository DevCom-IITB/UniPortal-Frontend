<template>
    <div class="question">
        <div class="top">
            <div class="name"> 
                {{ comment['User_name'] }}                
            </div>

            <div class="timestamp" :style="{ color : secondaryColor }">{{ comment['timestamp'] }}</div>
              
        </div>
        <div class="qtext">
            {{ comment['body']  }}  
        </div>        
    </div>

      
    
</template>


<script>

    export default {
        name: 'viewcomments',
        props: {
         comment : Object,
         secondaryColor : String,
        }        
    }
    </script>

<style scoped>

.question{
   padding: 6px 12px;    
   width: 100%;
   border: 1px solid b;   
}

.top {
    display: flex;
    flex-direction: row;
    align-items: center;
}


.name{
    margin-right: 16px;
    font-size: 16px;
    font-weight: 600;
}

.timestamp{
    font-size: 10px;
}

.timetext{
    text-align: center;
    margin-top: 4px;
    background-color: transparent;    
}

.qtext{
    align-items: center;
}

</style>







