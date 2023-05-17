<template>
    
    <div class="navbar">
        
        <router-link to="/"><button class="btn1"><div class="route">Infopost</div></button></router-link>
        <router-link to="/questions"><button class="btn2"><div class="route">Questions</div></button></router-link>
        <router-link to="/myquestions"><button class="btn3"><div class="route">My Questions</div></button></router-link>
        
    </div>   
    
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.route {
background: transparent;
color: #000000;
text-decoration: inherit; 
font-size: 1.8rem;  
}

a {
    background-color: #f2f2f2;
    border-radius: 40px;
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

font-weight:400;
position: fixed;
z-index: 1;

}

button{
    width: 339.33px;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    
    background-color: #f2f2f2;
    height: 10vh;
    margin-top: 0vh;
    border-radius: 52px;
    border: transparent;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    
}

button:hover{
    background-color: #d9d9d9;
    border: #d9d9d9;
}


</style>