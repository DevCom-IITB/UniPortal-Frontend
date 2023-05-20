<template>
    
    <div class="navbar" :style="{ background : unselected}">
        
        <router-link to="/" class="btn" @click="selected1" :style=" (currentPage == 1) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">Infopost</div></router-link>
        <router-link to="/questions" class="btn" @click="selected2" :style=" (currentPage == 2) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">Questions</div></router-link>
        <router-link to="/myquestions" class="btn" @click="selected3" :style=" (currentPage == 3) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">My Questions</div></router-link>
        
    </div>   
    
</template>

<script>
export default {
    name: 'Navbar',
    emits: ['selected'],
    props : {
        primary : String,
        grey : String,
        unselected : String,
        hover : String,
        emphasisText : String,
    },
    data () {
        return {
            currentPage : 1
        }
    },
    methods : {
        async selected1(){
            this.$emit('selected1');
            this.currentPage = 1;
        },
        async selected2(){
            this.$emit('selected2');
            this.currentPage = 2;
        },
        async selected3(){
            this.$emit('selected3')
            this.currentPage = 3;
        },
    }
}
</script>

<style scoped>
.navbar{
    width: 100%;
    height: 64.7%;
    border-radius: 52px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
}

.btn{
    height: 100%;
    width: 33.33%;
    border-radius: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1vmax; 
    text-decoration: none;
}



.route{
    font-weight: 500;
}


</style>