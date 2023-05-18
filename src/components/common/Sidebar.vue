<template>
   <div class="sidebar">
        
        <div class="Logo">
            <div class="Logoimg"><h1>NewBee Logo</h1></div>
        </div>

        <div class="Info">
            <div class="InfoText">  
                <h1 class="Text">This will contain some text regarding the basic information </h1>
            </div>

            <div class="InfoLinks">
                <button class="btn">
                    <i class="fa-regular fa-globe"></i>&nbsp;&nbsp; Email 
                </button>

                <button class="btn">
                    <i class="fa-regular fa-globe"></i>&nbsp;&nbsp;  SMP Website 
                </button>

                <button class="btn">
                    <i class="fa-regular fa-globe"></i>&nbsp;&nbsp;  Contact info. 
                </button>
            </div>
        </div>
        <div class="Creds">
            <button class="btn-1">
                Credentials 
            </button>
        </div>

        
        
        
        
   </div> 
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.sidebar{
    width : 92.38%;
    margin-top: 4.12%;
    background: #e6e6e6;
    color: #000000;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.Logo{
    height: 12.98%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10%;
}

.Logoimg{
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Logoimg h1{
    font-size: 1.2vmax;
    font-weight: 700;
}

.Info{
    height: 67.10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.InfoText{
    height: 33.66%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5%;
}

.InfoText h1{
    width: 90%;
    height: 70%;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2vmax;
    font-weight: 400;
}

.InfoLinks{
    height: 66.34%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.btn{
    width: 87.63%;
    height: 20.78%;
    background: #e6e6e6;
    border: none;
    border-radius: 100px;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 1vmax;
    font-weight: 600;
    padding-left: 7%;
}

.btn:hover{
    background-color: #d9d9d9;
}


.Creds{
    height: 32.90%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-1{
    width: 87.63%;
    height: 20.78%;
    background: #e6e6e6;
    border: none;
    border-radius: 100px;
    font-size: 1.1vmax;
    font-weight: 600;
    margin-top: 50%;
}

.btn-1:hover{
    background-color: #d9d9d9;
}



</style>