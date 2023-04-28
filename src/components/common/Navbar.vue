<template>
    <div class="navbar">
        <h1><router-link to="/infopost"><div class="route">Infopost</div></router-link></h1>
        <h1><router-link to="/questions"><div class="route">Questions</div></router-link></h1>
        <h1><router-link to="/myquestions"><div class="route">My Questions</div></router-link></h1>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.route {
background: #CCCCCC;
color: #000000;
text-decoration: inherit;   
}
h1 {
    background: #CCCCCC;
}
.navbar {
background: #CCCCCC;
color: #000000;
font-family: Inter;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 440px;
margin-top: 24px;
height: 88px;
width: 55%;
border-radius: 52px;
padding: 25px 48px 25px 48px;
font-weight:400;
position: fixed;
z-index: 1;
}
</style>