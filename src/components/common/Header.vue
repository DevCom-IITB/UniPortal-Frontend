<template>
    <div class="cont">
        <div class="Header">
            <div class="HeaderTitle">{{ headerName }}</div>
            <div class="HeaderText">{{ headerText }}</div>
        </div>
    </div> 
    

 </template>
 
 <script>
 export default {
     name: 'Header',
     props: ['headerName', 'headerText']
    //  props: {
    //     headerName: string, 
    //  },
 }
 
 </script>
 
 <style scoped>

.cont{
    height: 95.12%;
    width: 100%;
    background: #f2f2f2;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.Header{
    width: 92.19%;
    height: 74.36%;
    display: flex;
    flex-direction: column;
}

.HeaderTitle{
    font-size: 3.5vmax;
    font-weight: 500;
}

.HeaderText{
    font-size: 0.7vmax;
    font-weight: 400;
}

 
 /* .Header{
background: #D9D9D9;
color: #000000;
font-family: 'Zilla Slab', serif;
font-size: 80px;
display: flex;
flex-grow: 1;
justify-content: center;
align-items: center;
margin-left: 35%;
margin-top: 18vh;
height: 40vh;
width: 55%;
margin-right: 10%;
border-radius: 29px;
padding: 25px 48px 25px 48px;
font-weight:400;
position: absolute;
} */

 </style>