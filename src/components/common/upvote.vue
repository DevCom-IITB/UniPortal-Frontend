<template> 
    <div class="upvotebox">
        <button class="btn" :style="{ color : primaryColor, background: background }">
            <div class="icon"><Upvote/></div>
            <p>{{ upvotes }}</p>
        </button>
    </div>
</template>

<script>
 import Upvote from "../icons/expand_more.svg"
 export default {
     name: 'upvote',
     components: {
         Upvote
     },
     props: {
         primaryColor: {
             type: String,
             required: true
         },
         background: {
             type: String,
             required: true
         },
         upvotes: {
             type: Number,
             required: true
         }
     }
 }
 </script>
<style scoped>


.btn{
    border: none;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    padding: 5px 10px 5px 10px;; 
}



p{
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
}



</style>