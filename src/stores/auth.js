import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        accessToken: '',
        loggedIn: true,
    }),
    actions: {
        async Login(uid, password){
            const info = {
                user_ID : uid,
                password : password,
            }

            const res = await fetch('api/user/login', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(info)
            })        
            

            if(res.status == 200){
                const data = await res.json()
                this.accessToken = data['accessToken']
                console.log('access token: ' + this.accessToken);
                this.loggedIn = true
            }
            else{
                this.loggedIn = false
            }
        },
        async Refresh(){
            console.log("We entered the refresh function in auth.js");
            const res = await fetch('api/user/refresh', {
              method : 'PUT',
              headers : {
                'Content-Type' : 'application/json',
              }
            })
      
            if(res.status == 200){
                const data = await res.json()
                this.accessToken = data['accessToken']
                console.log('new access token: ' + this.accessToken);
                this.loggedIn = true
            }
            else{
                this.loggedIn = false
            }
            return res;
        },
        async Logout(){
            const res = await fetch('api/user/logout', {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json',
              }
            })

            if(res.status == 200){
                this.accessToken = ''
                this.loggedIn = false
            }

        },
    }
})