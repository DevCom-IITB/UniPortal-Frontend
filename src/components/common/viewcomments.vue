<template>
    <div class="question">
            <div class="top">
            <div class="name"> 
                Tanmay Jain                
            </div>

            <div class="timestamp" :style="{ color : secondaryColor }">timestamp</div>
              
          </div>
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities    
            </div>        
    </div>

    <div class="question">
            <div class="top">
            <div class="name"> 
                Tanmay Jain                
            </div>

            <div class="timestamp" :style="{ color : secondaryColor }">timestamp</div>
              
          </div>
            <div class="qtext">
                I would like to update Vamsi Krishna's answer.
                Vuetify now provides since v2.3 border utilities    
            </div>
            
    </div>

    <div class="question">
            <div class="top">
            <div class="name"> 
                Tanmay Jain                
            </div>

            <div class="timestamp" :style="{ color : secondaryColor }">timestamp</div>
              
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
    align-items: center;
}

.question{
   padding: 6px 12px;       
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







