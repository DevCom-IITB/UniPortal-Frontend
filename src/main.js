import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { watch } from 'vue'


import './assets/main.css'

const pinia = createPinia()

if(localStorage.getItem('state')){
    pinia.state.value = JSON.parse(localStorage.getItem('state'));
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('state', JSON.stringify(state))
    },
    { deep: true }
);

createApp(App)
.use(router)
.use(pinia)
.mount('#app')

