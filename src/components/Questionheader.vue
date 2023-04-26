<template>
    <div class="container">
        <div class="textcontainer">
            <div class="text">
                My Questions
            </div>

        </div>
        <div class="line"></div>
    </div>
</template>
<script lang="ts">
    export default {
        name: 'Questionheader'
    }
    </script>

    <style scoped>
    .container{
        position: absolute;
width: 1018px;
height: 312px;
margin-left:440px;
margin-top: 200px;

background-color: #D9D9D9;
border-radius: 24px;
        
    }

    .textcontainer{
        position: absolute;
width: 721px;
height: 115px;
margin-left: 145px;
margin-top: 98px;
background-color: #bfbcbc;



    }

    .text{
        font-size: 96px;
        margin-top: -30px;
        color: black;
        font-family: 'Zilla Slab';
        font-style: normal;
        font-weight: 400;
        background-color: #D9D9D9;
        
    }
    .line{
        background-color: #bfbcbc;
    margin-top: 344px;
    width:986px;
    height: 2.5px;
    margin-left: 16px;
    }

</style>