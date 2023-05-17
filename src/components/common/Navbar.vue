<template>
    <div class="navbar">
        
        <router-link to="/"><button class="btn1"><div class="route"><h1>Infopost</h1></div></button></router-link>
        <router-link to="/questions"><button class="btn2"><div class="route"><h1>Questions</h1></div></button></router-link>
        <router-link to="/myquestions"><button class="btn3"><div class="route"><h1>My Questions</h1></div></button></router-link>
        
        
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.route {
color: #000000;
text-decoration: inherit;   
}



h1 {
    background: #f2f2f200;
}
.navbar {
background: #f2f2f2;
color: #000000;
font-family: Inter;
display: flex;
flex-grow: 1;
justify-content: space-between;
align-items: center;
margin-left: 35%;
margin-top: 2.25vh;
height: 10vh;
width: 55%;
margin-right: 10%;
border-radius: 52px;
padding: 25px;
font-weight:400;
position: fixed;
z-index: 1;
}

button{
    width: 339.33px;
    display: flex;
    flex-direction: row;
    background-color: #f2f2f2;
    height: 10vh;
    border-radius: 52px;
    border: #f2f2f2;
    align-items: center;
    justify-content: center;
    
}

button:hover{
    background-color: #d9d9d9;
    border: #d9d9d9;
}


</style>