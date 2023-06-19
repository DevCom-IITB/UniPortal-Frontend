<template>
    <div class="question">
        <div class="top">
            <div class="name"> 
                {{ comment['user_Name'] }}                
            </div>

            <div class="timestamp" :style="{ color : secondaryColor }">{{ timestamp }}</div>
              
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
        },
        data(){
            return{
                timestamp: '',
            }
        },
        mounted(){
            const date = new Date(this.comment['asked_At']);
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            this.timestamp = date.toLocaleString(undefined, options);
        },        
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

@media only screen and (max-width: 1150px) {
    .name{
        font-size: 12px;
    }
    .timestamp{
        font-size: 8px;
    }
    .qtext{
        font-size: 10px;
    }
}

</style>







