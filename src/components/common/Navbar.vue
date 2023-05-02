<template>
    <div class="navbar">
        <button class="btn1"><h1><router-link to="/infopost"><div class="route">Infopost</div></router-link></h1></button>
        <button class="btn2"><h1><router-link to="/questions"><div class="route">Questions</div></router-link></h1></button>
        <button class="btn3"><h1><router-link to="/myquestions"><div class="route">My Questions</div></router-link></h1></button>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.route {
background: #f2f2f2;
color: #000000;
text-decoration: inherit;   
}
.route:hover{
    background-color: #d9d9d9;
}
h1 {
    background: #f2f2f2;
}
.navbar {
background: #f2f2f2;
color: #000000;
font-family: Inter;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 661px;
margin-top: 24px;
height: 88px;
width: 1018px;
border-radius: 52px;
padding: 25px;
font-weight:400;
position: fixed;
z-index: 1;
}

button{
    width: 339.33px;
    background-color: #f2f2f2;
    height: 88px;
    border-radius: 52px;
    border: #f2f2f2;
}

button:hover{
    background-color: #d9d9d9;
}

.btn1{
    margin-left: 0px;
    padding-left: 0px;
}
</style>