<template>
    <div class="cont" :style="{ color : primaryColor, background : background}">
        <div class="Header">
            <div class="HeaderTitle" :style="{ color : primaryColor }">{{ headerName }}</div>
            <div class="HeaderText" :style="{ color : primaryColor }">{{ headerText }}</div>
        </div>
    </div> 
    

 </template>
 
 <script>
 export default {
     name: 'Header',
     props: {
            headerName: String,
            headerText: String,
            background: String,
            primaryColor: String
     }
    //  props: {
    //     headerName: string, 
    //  },
 }
 
 </script>
 
 <style scoped>

.cont{
    height: 95.12%;
    width: 100%;
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
    font-size: 54px;
    font-weight: 500;
}

.HeaderText{
    font-size: 16px;
    font-weight: 500;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.HeaderText::-webkit-scrollbar {
    display: none;
}

 </style>