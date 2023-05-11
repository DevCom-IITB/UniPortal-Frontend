<template>
    <div class="cont">
    <div class="questionBox"></div> 
    <div class="questionBox" id="one"></div> 
    <div class="questionBox" id="two"></div> 
    </div>
 </template>
 
 <script lang ="ts">
 export default {
     name: 'questionBox'
 }
 
 </script>
 
 <style scoped>

 
 .questionBox{
    background: #D9D9D9;
color: #000000;
font-family: 'Zilla Slab', serif;
font-size: 80px;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: 35%;
margin-top: 70vh;
height: 10vh;
width: 55%;
border-radius: 29px;
padding: 25px 48px 25px 48px;
font-weight:400;
position: absolute;
 
 }

 .line{
    background-color: #bfbcbc;
    margin-top: 230px;
    width:986px;
    height: 2px;
    margin-left: 16px;
    
}

#one{
    
    margin-top: 85vh;
}
#two{
    margin-top: 100vh;
    margin-bottom: 2.25vh;
    
}
 
 </style>