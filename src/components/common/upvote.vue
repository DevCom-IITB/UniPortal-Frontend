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
    padding: 5px 7px 5px 7px;; 
}



p{
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
}


@media only screen and (max-width: 1150px) {
    .btn{
        padding: 5px 5px 5px 5px;
        margin-left: 1px;
    }
    p{
        font-size: 14px;
    }
}

@media only screen and (max-width: 950px) {
    .btn{
        padding: 5px 3px 5px 3px;
        margin-left: 1px;
    }
    p{
        font-size: 12px;
    }
}


</style>