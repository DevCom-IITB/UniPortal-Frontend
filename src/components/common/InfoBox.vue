<template>
    <div class="container">
        <div class="Images" v-if="infopost.imgs">
            <div v-for="img in infopost.imgs" class="img"><img :src=img></div>
        </div>
        <p>{{ infopost.body }}</p>
    </div>
</template>

<script>

export default {
    name: 'InfoBox',
    props:{
        infopost: Object,
    }
}

</script>

<style scoped>

.container{
    /* border: 5px solid red; */
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 24px;
}

p{
    font-size: 0.9vmax;
    font-weight: 400;
}

.Images{
    width: 100%;
    height: 100%;
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

</style>