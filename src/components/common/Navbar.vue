<template>
    <div class="navbar">
        <h1>Infopost</h1>
        <h1>Questions</h1>
        <h1>My Questions</h1>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
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