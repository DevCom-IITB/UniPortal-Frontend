<template>
    <div class="container">
        <div class="Images" v-if="infopost.images">
            <div v-for="image in images" class="img"><img :src=image></div>
        </div>
        <p>{{ infopost.body }}</p>
    </div>
</template>

<script>

export default {
    name: 'InfoBox',
    props:{
        infopost: Object,
    },
    data(){
        return{
            images: []
        }
    },
    mounted(){
        console.log("we will be loggin the images");
        this.images = this.infopost.images
        if(this.images.length>0){
            for(let i=0; i<this.images.length; i++){
                //D:\SMP\SMP-Portal-Backend\uploads
                console.log(this.images[i]);
                const temp = 'D:/SMP/SMP-Portal-Backend/uploads/' + this.images[i];
                this.images[i] = temp;
                console.log(this.images[i]);
            }
        }
        else{
            console.log("no images");
        }
    }
}

</script>

<style scoped>

.container{
    /* border: 5px solid red; */
    width: 100%;
    height: 100%;
    background: #FFF9E5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: 24px;
}

p{
    width: 100%;
    font-size: 14px;
    font-weight: 400;
}

.Images{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.img{
    width: 80%;
} 

img{
    max-width: 100%;
}

@media only screen and (max-width: 1150px) {
    p{
        font-size: 12px;
    }
}

</style>