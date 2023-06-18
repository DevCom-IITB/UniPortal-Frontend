<template>

    <div class="form">
        <div class="logo"><Logo /></div>
        <div class="headers">
            <h2>Welcome NewBee</h2>
            <h3>Your companion to help you sail smooth through the admission process</h3>
        </div>
        <div class="login">
            <input type="text" class="input" v-model="uid" placeholder="Enter your id">
            <input type="password" class="input" v-model="password" placeholder="Enter your password">
            <input type="submit" value="Login" class="button" @click="Auth.Login(uid, password, false)">
        </div>
        <h2>Or</h2>
        <input type="button" class="sso" @click="redirectToExternalRoute" value='Mentor Login' />
    </div>

</template>

<script >
import Logo from '../icons/Logo.svg'
import { useAuthStore  } from '@/stores/auth';
const sso_client_id = import.meta.env.VITE_SSO_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_NODE_ENV == 'DEV' ? import.meta.env.VITE_SSO_REDIRECT_URI_DEV : import.meta.env.VITE_SSO_REDIRECT_URI_TEST;

export default{
    name: 'Login',
    components: {
        Logo,
    },
    props: {
        loggedIn: Boolean,
    },
    methods: {
        redirectToExternalRoute() {
            window.location.href = `https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=${sso_client_id}&response_type=code&scope=program&redirect_uri=${redirect_uri}`;
        },
    },
    mounted() {
        // console.log(`https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=${sso_client_id}&response_type=code&scope=program&redirect_uri=${redirect_uri}`);
        const urlParams = new URLSearchParams(window.location.search);
        console.log(redirect_uri);
        const authorizationCode = urlParams.get('code');
        if (authorizationCode) {
            this.Auth.Login('', '', true);
        }
    },
    setup() {
        const Auth = useAuthStore();

        return{
            Auth,
        }
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
    cursor: pointer;
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
    border: none;
    cursor: pointer;
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