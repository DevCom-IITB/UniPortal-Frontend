<template>
   <div class="sidebar" :style="windowWidth>750 ? { background : sidebar, color : emphasisText } : showSidebar ? { background : background } : { width : '0px'}" >
        
        <div class="Logo" :style="windowWidth<750 ? { background : primary } : { background : sidebar }">
            <div v-if="windowWidth<750" class="burger" @click="Burger"><burger /></div>
            <div class="Logoimg"><Logo /></div>
        </div>

        <div class="Info" v-if="windowWidth>750 || (showSidebar && windowWidth<750)">
            <div class="InfoText">Welcome aboard! <br/> With the all new freshers’ portal clear all your doubts regarding the admission process</div>

            <div class="InfoLinks" >
                <button class="btn" @mouseover="hovering = 1" @mouseleave="hovering = 0" :style="( hovering == 1 ) ? { background : hover, color : emphasisText } : windowWidth>750 ? { background : sidebar, color : emphasisText } : { background : background }">
                    <email />&nbsp;&nbsp;Email 
                </button>

                <button class="btn" @mouseover="hovering = 2" @mouseleave="hovering = 0" :style="( hovering == 2 ) ? { background : hover, color : emphasisText } : windowWidth>750 ? { background : sidebar, color : emphasisText } : { background : background }">
                    <Globe />&nbsp;&nbsp;SMP Website 
                </button>

                <button class="btn" @mouseover="hovering = 3" @mouseleave="hovering = 0" :style="( hovering == 3 ) ? { background : hover, color : emphasisText } : windowWidth>750 ? { background : sidebar, color : emphasisText } : { background : background }">
                    <contact />&nbsp;&nbsp;Contact info. 
                </button>
            </div>
        </div>
        <div class="Creds" v-if="windowWidth>750 || (showSidebar && windowWidth<750)" >
            <button class="btn-1" :style="windowWidth>750 ? { background : sidebar, color : emphasisText } : { background : background }">
                Credentials 
            </button>
        </div>

        
        
        
        
   </div> 
</template>

<script>
import Logo from '../icons/Logo.svg'
import Globe from '../icons/globe.svg'
import email from '../icons/email.svg'
import contact from '../icons/contact.svg'
import burger from '../icons/menu.svg'

export default {
    name: 'Sidebar',
    props: {
        sidebar : String,
        emphasisText : String,
        hover : String,
        background : String,
        primary : String,
    },
    components : {
        Logo,
        Globe,
        email,
        contact,
        burger,
    },
    data () {
        return {
            hovering : 0,
            windowWidth : window.innerWidth,
            showSidebar : false,
        }
    },
    mounted() {
        this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },

    methods: {  
        onResize() {
        this.windowWidth = window.innerWidth;
        },
        async Burger(){
            this.showSidebar = !this.showSidebar
            this.$emit('Burger', this.showSidebar)
        }
    }
}
</script>

<style scoped>
.sidebar{
    width : 92.38%;
    margin-top: 4.12%;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}



.Logo{
    height: 12.98%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20%;

}

.burger{
    position: fixed;
    left: 16px;
    margin-top: 8px;
}


.Logoimg{
    display: flex;
    justify-content: center;
    align-items: center;
}


.Info{
    width: 87.63%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.InfoText{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 80px;
}

.InfoLinks{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 80px;
}

.btn{
    width: 100%;
    height: 48px;
    border : none;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    padding-left: 7%;
    margin: 8px 0px;
    cursor: pointer;
}



.Creds{
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-1{
    width: 100%;
    height: 48px;
    border : none;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    padding-left: 7%;
    margin: 8px 0px;
    cursor: pointer;
}


@media only screen and (max-width : 1150px){

    .InfoText{
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 50px;
    }

    .btn{
        font-size: 14px;
    }

    .btn-1{
        font-size: 14px;
    }

}

@media only screen and (max-width : 950px){

.InfoText{
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 50px;
}

.btn{
    font-size: 12px;
}

.btn-1{
    font-size: 12px;
}

}

@media only screen and (max-width : 750px){

.sidebar{
    width: 70%;
    margin-top: 0px;
    border-radius: 0%;
    align-items: start;
}

.Logo{
    height: 10%;
    padding-top: 0%;
    width: 100vw;
}

.Info{
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.InfoText{
    font-size: 16px;
}

.btn{
    font-size: 16px;
}


.Creds{
    display: flex;
    justify-content: center;
    align-items: center;
    width : 100%;
}

.btn-1{
    justify-content: center;
    font-size: 16px;
}


}




</style>