<template>
    <div class="cont" :style="{ color : primaryColor, background : background}">
        <!-- <InfoPost class="background" /> -->
        <div class="background"><img :src="image" alt=""></div>
        <div class="Header">
            <div class="HeaderTitle" :style="{ color : primaryColor }">{{ headerName }}</div>
            <div class="HeaderText" :style="{ color : primaryColor }">{{ headerText }}</div>
        </div>
        <!-- <div class="HeaderImage"><img src="..\background_images\yellow_illustration.jpg" alt=""></div> -->
    </div> 
    

 </template>
 
 <script>
 import InfoPost from '../background_images/InfoPot.svg'
 export default {
     name: 'Header',
     props: {
            headerName: String,
            headerText: String,
            background: String,
            primaryColor: String
     },
     components: {
         InfoPost
     },
     data(){
         return{
             image: '',
         }
     },
     mounted(){
        if(this.background == '#FFF9E5'){
            this.image = 'src/components/background_images/InfoPot.png';
            console.log(this.image);
        }
        else if(this.background == '#FFF3F2'){
            this.image = 'src/components/background_images/Questions.png';
            console.log(this.image);
        }
        else if(this.background == '#F6F5FF'){
            this.image = 'src/components/background_images/MyQuestions.png';
            console.log(this.image);

        }
     }
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
    display: flex;
    justify-content: flex-end;
}

.background img{
    width: auto;
    height: 100%;
}

.Header{
    width: 92.19%;
    height: 74.36%;
    display: flex;
    flex-direction: column;
}


.HeaderTitle{
    font-size: 60px;
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