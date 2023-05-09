<template>
   <div class="sidebar">
    
        <button class="btn-1">
            
            <i class="fas fa-globe" style="line-height: 1; color: rgb(30, 48, 80);"></i>Email 
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
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 20%;
    height: 1048px;
    position: fixed;
    border-radius: 24px;
    justify-content: space-between;

}
.btn-1{
    top: 270px;
}

.btn-2{
    top: 290px;
}

.btn-3{
    top: 310px;
}

.btn-4{
    margin-top: 600px;
    text-align: center;
    padding-left: 0%;
}

button{
    text-align: left;
    padding-left: 56px;
    background-color: #e6e6e6;
    margin-left: 16px;
    width: 340px;
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
    background-color: #e6e6e6;
    
}
</style>