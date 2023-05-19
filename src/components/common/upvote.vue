<template> 
    <div class="upvotebox">
        <button class="btn">
            <div class="icon"><Upvote/></div>
            <p>4</p>
        </button>
    </div>
</template>

<script>
 import Upvote from "../icons/expand_more.svg"
 export default {
     name: 'upvote',
     components: {
         Upvote
     }
 }
 
 </script>
<style scoped>

.upvotebox{
    height: 100%;
    width: 100%;
}

.btn{
    height: 100%;
    width: 100%;
    border: none;
    background: #f2f2f2;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.icon{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


p{
    height: 100%;
    font-size: 1vmax;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
}



</style>