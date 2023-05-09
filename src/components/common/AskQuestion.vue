<template>
    <button>
        <i class="fa-solid fa-question"></i>
        Ask A Question
    </button>
</template>

<script>
export default {
   name: 'AskQuestion' 
}
</script>

<style scoped>
    button{
        display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 24px 40px;
gap: 16px;
z-index: 1;
position: fixed;
width: 293px;
height: 80px;
left: 1027px;
top: 780px;
background: #3E3C5D;
border-color: #3E3C5D;
text-align: center;
color: white;
font-size: x-large;
font-family: Inter;
box-shadow: none;
border-radius: 24px;
    }

.fa-solid {
    color: white;
    background-color: #3E3C5D;
}
</style>