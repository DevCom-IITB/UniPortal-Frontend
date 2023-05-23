<template>
   <div class="sidebar" :style="{ background : sidebar, color : emphasisText }" >
        
        <div class="Logo">
            <div class="Logoimg"><Logo /></div>
        </div>

        <div class="Info">
            <div class="InfoText">This will contain some text regarding the basic information
            </div>

            <div class="InfoLinks" >
                <button class="btn" @mouseover="hovering = 1" @mouseleave="hovering = 0" :style="( hovering == 1 ) ? { background : hover, color : emphasisText } : { background : sidebar, color : emphasisText }">
                    <email />&nbsp;&nbsp;Email 
                </button>

                <button class="btn" @mouseover="hovering = 2" @mouseleave="hovering = 0" :style="( hovering == 2 ) ? { background : hover, color : emphasisText } : { background : sidebar, color : emphasisText }">
                    <Globe />&nbsp;&nbsp;SMP Website 
                </button>

                <button class="btn" @mouseover="hovering = 3" @mouseleave="hovering = 0" :style="( hovering == 3 ) ? { background : hover, color : emphasisText } : { background : sidebar, color : emphasisText }">
                    <contact />&nbsp;&nbsp;Contact info. 
                </button>
            </div>
        </div>
        <div class="Creds" >
            <button class="btn-1" :style="{ background : sidebar, color : emphasisText }">
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

export default {
    name: 'Sidebar',
    props: {
        sidebar : String,
        emphasisText : String,
        hover : String,
    },
    components : {
        Logo,
        Globe,
        email,
        contact,
    },
    data () {
        return {
            hovering : 0,
        }
    },
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
    justify-content: center;
    align-items: center;
    padding-top: 10%;
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

.btn:hover{
    background-color: #d9d9d9;
}


.Creds{
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-1{
    border: none;
    border-radius: 100px;
    font-size: 1.1vmax;
    font-weight: 600;
    margin-top: 50%;
}

.btn-1:hover{
    background-color: #d9d9d9;
}

@media screen and (max-width:760px) {
    .sidebar{
        width: 0%;
        overflow: auto;
        
}
}

</style>