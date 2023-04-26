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
margin-left: 440px;
margin-top: 30%;
height: 98px;
width: 838px;
border-radius: 29px;
padding: 25px 48px 25px 48px;
font-weight:400;
position: absolute;
 
 }
#one{
    margin-top: 38%;
}
#two{
    margin-top: 46%;
}
 
 </style>