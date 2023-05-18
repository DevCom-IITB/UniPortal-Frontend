<template>
    
    <div class="navbar">
        
        <router-link to="/" class="btn" ><div class="route"><i class="fa-regular fa-globe"></i>&nbsp;&nbsp;Infopost</div></router-link>
        <router-link to="/questions" class="btn"><div class="route"><i class="fa-regular fa-globe"></i>&nbsp;&nbsp;Questions</div></router-link>
        <router-link to="/myquestions" class="btn"><div class="route"><i class="fa-regular fa-globe"></i>&nbsp;&nbsp;My Questions</div></router-link>
        
    </div>   
    
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.navbar{
    width: 100%;
    height: 64.7%;
    background:#f2f2f2;
    border-radius: 52px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
}

.btn{
    height: 100%;
    width: 33.33%;
    background: #f2f2f2;
    border-radius: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.vmax; 
    text-decoration: none;
    color: black;
}

.btn:hover{
    background: #d9d9d9;
}

.route{
    font-weight: 500;
}

/* .route {
background: transparent;
color: #000000;
text-decoration: inherit; 
font-size: 1.8rem;  
}


h1 {
    background: #f2f2f200;
} */
/* .navbar {
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

} */

/* button{
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
} */


</style>