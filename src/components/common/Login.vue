<template>
  <div class="form">
    <input type="button" class="sso" @click="redirectToExternalRoute" value="Login as a Mentor" />

    <div class="logo">
      <Logo />
    </div>
    <div class="headers">
      <h2>Welcome to Newbee</h2>
    </div>
    <div class="login">
      <label for="roll-no">Roll No</label>
      <input id="roll-no" type="text" class="input" v-model="uid" placeholder="JEE/UCEED Roll No" />
      <label for="date-birth">Date of Birth</label>
      <input id="date-birth" type="password" class="input" v-model="password" placeholder="DD/MM/YYYY" />
      <input type="submit" value="Login" class="button" @click="Auth.Login(uid, password, false)" />
    </div>

    <div class="headers help-text">
      <p>If you have trouble signing up, contact
        <a href="mailto:smpcs2025@gmail.com">smpcs2025@gmail.com</a></p>
    </div>
  </div>
</template>

<script>
import Logo from "../icons/Logo.svg";

import { useAuthStore } from "@/stores/auth";
const sso_client_id = import.meta.env.VITE_SSO_CLIENT_ID;
const redirect_uri =
  import.meta.env.VITE_NODE_ENV == "DEV"
    ? import.meta.env.VITE_SSO_REDIRECT_URI_DEV
    : import.meta.env.VITE_SSO_REDIRECT_URI_TEST;

export default {
  name: "Login",
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
    console.log("name :", this.Auth.name);
    console.log("user_id :", this.Auth.user_ID);
    const authorizationCode = urlParams.get("code");
    if (authorizationCode) {
      this.Auth.Login("", "", true);
    }
  },
  setup() {
    const Auth = useAuthStore();

    return {
      Auth,
    };
  },
};
</script>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 1;
  position: relative;
  padding: 52px 11%;
  color: #000000;
}

.headers {
  width: 100%;
  text-align: left;
}

.headers h2 {
  margin: 18px 0 58px;
  font-size: 34px;
  line-height: 1.1;
  font-weight: 600;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}

.login .input {
  width: 100%;
  height: 38px;
  border: 1px solid #000000;
  border-radius: 14px;
  padding: 0 14px;
  font-size: 12px;
}

.login .input::placeholder {
  color: #8f8f8f;
}

.login label {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
}

.login .button {
  width: 120px;
  height: 46px;
  margin-top: 12px;
  border: none;
  border-radius: 999px;
  background-color: #ffe27b;
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}


.sso {
  position: absolute;
  top: 46px;
  right: 48px;
  width: 134px;
  min-height: 36px;
  border-radius: 999px;
  background-color: transparent;
  color: #b27a00;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  padding: 0 14px;
  border: 1px solid #d49a16;
  cursor: pointer;
  text-decoration: none;
}

.logo svg {
  width: 108px;
  height: 116px;
}

.help-text {
  margin-top: 68px;
  font-size: 12px;
}

.help-text a {
  color: #0070ff;
  font-weight: 600;
}


@media only screen and (max-width: 1150px) {
  .headers {
    font-size: small;
  }

  .login .button {
    font-size: small;
  }

  .sso {
    font-size: small;
  }
}

@media only screen and (max-width: 750px) {
  .login .input {
    width: 100%;
  }

  .login .button {
    width: 120px;
  }

  .sso {
    width: 134px;
  }

  .logo {
    margin-top: 42px;
  }

  .form {
    padding: 36px 8%;
  }
}
</style>
