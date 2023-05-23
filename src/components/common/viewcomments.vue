<template>
    <div class="question" >
             <div class="top">
             
                 <div class="text">Tanmay Jain</div>
                 <div class="timetext" :style="{ color : secondaryColor }">timestamp</div>
             </div>
 
            
             <div class="qtext">
                 history has always been saying us something. history has always been saying us something.
                 
             </div>
             
         </div>
         <div class="question" id="one" >
             <div class="top">
             
                 <div class="text">Tanmay Jain</div>
                 <div class="timetext" :style="{ color : secondaryColor }">timestamp</div>
             </div>
 
            
             <div class="qtext">
                 history has always been saying us something. history has always been saying us something.
                 
             </div>
             
         </div>
         <div class="question" id="two" >
             <div class="top">
             
                 <div class="text">Tanmay Jain</div>
                 <div class="timetext" :style="{ color : secondaryColor }">timestamp</div>
             </div>
 
            
             <div class="qtext">
                 history has always been saying us something. history has always been saying us something.
                 
             </div>
             
         </div>
         <div class="question" id="three" >
             <div class="top">
             
                 <div class="text">Tanmay Jain</div>
                 <div class="timetext" :style="{ color : secondaryColor }">timestamp</div>
             </div>
 
            
             <div class="qtext">
                 history has always been saying us something. history has always been saying us something.
                 
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
          },
         
         }
        
         
     }
     </script>
 
 <style scoped>
 
 .top{
     width: fit-content;
     height: fit-content;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
 }
 
 .text{
     margin-right:16px ;
     font-size: 16px;
     font-weight: 600;
     
 }
 
 .timetext{
     font-size: 10px;
 }
 
 .question{
     display: flex;
     flex-direction: row;
     background-color:transparent;
         color: #000000;
         margin-left: 0%;
         margin-right:0%;
         margin-top: 0%;
         width: 100%;
         height:fit-content;
         position: absolute;
         border-radius: 22px;
         white-space: normal;
         
         
 }
 
 #one{
     margin-top: 9%;
     
 }
 #two{
     margin-top: 18%;
 }
 #three{
     margin-top: 27%;
 }
 
 
 
 
 
 
 
 
 
 .qtext{
     position: absolute;
     justify-self: left;
     align-items: center;
     width: fit-content;
     margin-left: 0%;
     margin-top: 25px;
     background-color:transparent;
     height: fit-content;
     font-size:12px;
     font-weight:500;
     white-space: normal;
     overflow: hidden;
     line-height: 16px;
     
     
 
     
 }
 
 
 
 
 
 
 </style>
 
 