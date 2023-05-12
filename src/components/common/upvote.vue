<template>
    
        
            <div class="upvotebox">
                <button class="btn1">
                        <h1>
                            
                                ^
                            
                        </h1>
                    </button>
                <div class="upvotetext">4</div>
            
            
    </div>
</template>

<script>
 export default {
     name: 'upvote'
 }
 
 </script>
 <style scoped>
 .upvotebox{
    border-radius: 100px;
    height:10vh;
    width:4%;
    background-color:#bebcbc;
    position: absolute;
    top: 50%;
    margin-top: -8vh;
}

.upvotetext{
    text-align: center;
    color: black;
    margin-top: 0.5vh;
    font-size: x-large;
}
.btn1{
    margin-top: 0.9vh;
    margin-left: 0.95vh;
    width: 66%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>