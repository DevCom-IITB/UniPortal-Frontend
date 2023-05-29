<template>
    
    <div class="navbar" :style="{ background : unselected }">
        
        <router-link to="/" class="btn" id="info" @click="selected1" @hover="hover1" :style=" (currentPage == 1) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">Infopost</div></router-link>
        <router-link to="/questions" class="btn" @click="selected2" @hover="hover2" :style=" (currentPage == 2) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">Questions</div></router-link>
        <router-link to="/myquestions" class="btn" @click="selected3" @hover="hover3" :style=" (currentPage == 3) ? { background : primary, color : emphasisText } : { color : grey } " ><div class="route">My Questions</div></router-link>
        
    </div>   
    
</template>

<script>
export default {
    name: 'Navbar',
    emits: ['selected1', 'selected2', 'selected3'],
    props : {
        primary : String,
        grey : String,
        unselected : String,
        hover : String,
        emphasisText : String,
    },
    data () {
        return {
            currentPage : 1,
            hovering : 0,
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
        async hover1(){
            this.hovering = 1;
        },
        async hover2(){
            this.hovering = 2;
        },
        async hover3(){
            this.hovering = 3;
        }
    }
}
</script>

<style scoped>
.navbar{
    width: 100%;
    height: 64.7%;
    border-radius: 52px;
    background: #FAF4E1;
    display: flex;
    flex-direction: row;
    font-size: 18px;
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
    text-decoration: none;
    color : #CCB160;
}



.route{
    font-weight: 500;
}


@media only screen and (max-width : 1150px){

    .navbar{
        font-size: 16px;
    }

}

</style>