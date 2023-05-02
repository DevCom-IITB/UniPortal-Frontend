<template>
    
    <div class="questionBox"></div> 
    <div class="questionBox" id="one"></div> 
    <div class="questionBox" id="two"></div> 
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
justify-content: center;
align-items: center;
margin-left: 661px;
margin-top: 30%;
height: 98px;
width: 1018px;
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
    margin-top: 38%;
}
#two{
    margin-top: 46%;
}
 
 </style>