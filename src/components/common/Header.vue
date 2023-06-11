<template>
    <div class="cont" :style="{ color : primaryColor, background : background}">
        <!-- <InfoPost class="background" /> -->
        <!-- <div class="background"><img :src="image" alt=""></div> -->
        <div class="Header">
            <div class="HeaderTitle" :style="{ color : primaryColor }">{{ headerName }}</div>
            <div class="HeaderText" :style="{ color : primaryColor }">{{ headerText }}</div>
        </div>
        <!-- <div class="HeaderImage"><img src="..\background_images\yellow_illustration.jpg" alt=""></div> -->
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
     },
    //  data(){
    //      return{
    //          image: '',
    //      }
    //  },
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.background{
    position: absolute;
    width: 100%;
    height: 100%;
}

.background img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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
}


.HeaderText::-webkit-scrollbar {
    width : 8px;
}

.HeaderText::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
}

.HeaderText::-webkit-scrollbar-thumb:hover {
    background: #000;
}

/* .HeaderImage{
    width: 100%;
    height: 100%;
    position: absolute;
}

img{
    width: 100%;
    filter: saturate(80%);
} */

@media only screen and (max-width: 1150px){

    .HeaderTitle{
        font-size: 48px;
    }

    .HeaderText{
        font-size: 14px;
    }


}

@media only screen and (max-width: 950px){

    .HeaderTitle{
        font-size: 42px;
    }

    .HeaderText{
        font-size: 12px;
    }
}

 </style>