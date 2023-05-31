<template>

    <div class="form">
        <div class="logo"><Logo /></div>
        <div class="headers">
            <h2>Welcome NewBee</h2>
            <h3>Your companion to help you sail smooth the admission process</h3>
        </div>
        <div class="login">
            <input type="text" class="input" placeholder="Enter your id">
            <input type="text" class="input" placeholder="Enter your password">
            <input type="button" value="Login" class="button">
        </div>
        <h2>Or</h2>
        <div class="sso">Login via SSO</div>
    </div>

</template>

<script>
import Logo from '../icons/logo.svg'

export default{
    name: 'Login',
    components: {
        Logo,
    },
}

</script>

<style scoped>

.form{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
}

.headers{
    width: 80%;
    text-align: center;
}

.headers h2{
    font-weight: 600;
}

.login{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 40%;
}

.login .input{
    width: 30vw;
    height: 20%;
    border: 1px solid #ccb1607b;
    border-radius: 10px;
    padding-left: 10px;
}

.login .input::placeholder{
    color: #CCB160;
}

.login .button{
    width: 10vw;
    height: 20%;
    border: none;
    border-radius: 10px;
    background-color: #211D12;
    color: white;
    font-size: large;
    font-weight: 500;
}

.sso{
    width: 15vw;
    border-radius: 10px;
    background-color: #CCB160;
    color: white;
    font-size: large;
    font-weight: 500;
    text-align: center;
    padding: 12px;
}

@media only screen and (max-width : 1150px){
    
    
    .headers{
        font-size: small;
    }

    .login .button{
        font-size: small;
    }
    
    .sso{
        font-size: small;
    }
    
}

@media only screen and (max-width:750px){

    .login .input{
        width: 80vw;
    }    

    .login .button{
        width: 20vw;
        font-size: medium;
    }

    .sso{
        width: 40vw;
        font-size: medium;
    }

    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        border-radius: 24px;
        background: #FFEDB2;
    }

}

</style>