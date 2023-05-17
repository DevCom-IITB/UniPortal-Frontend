<template>
   <div class="sidebar">
        
        <button class="btn-1">
            <i class="fa-regular fa-globe"></i>Email 
        </button>
        <button class="btn-2">
            <i class="fa-regular fa-globe"></i>SMP Website 
        </button>
        <button class="btn-3">
            <i class="fa-regular fa-globe"></i>Contact info. 
        </button>
        
        <button class="btn-4">
            Credentials 
        </button>
        
   </div> 
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.sidebar{
    background: #e6e6e6;
    color: #000000;
    margin-left: 0.86%;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    width: 20%;
    height: 97vh;
    position: fixed;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
}


.btn-1{
    position:relative;
    top: 270px;
}

.btn-2{
    position:relative;
    top: 290px;
}

.btn-3{
    position:relative;
    top: 310px;
}

.btn-4{
    margin-top: 65vh;
    text-align: center;
    padding-left: 0%;
}

button{
    text-align: left;
    padding-left: 56px;
    background-color: #e6e6e6;
    margin-left: 3%;
    width: 90%;
    border-radius: 24px;
    height: 64px;
    z-index: 1;
    border: #e6e6e6;
    font-family: Inter;
    font-size: large;
    font-weight: bold;
}
button:hover{
    background-color: #d9d9d9;
}

.fa-regular {
    color: #000000;
    z-index: 1;
    margin-right: 10px;
}
</style>