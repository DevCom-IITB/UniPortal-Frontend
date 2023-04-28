import {createRouter, createWebHistory} from 'vue-router'
import MyQuestions from '../views/MyQuestions.vue'
import Infopost from '../views/Infopost.vue'

const routes = [
    {
        path: '/infopost',
        name: 'Infopost',
        component: Infopost,
    },
    {
        path: '/myquestions',
        name: 'MyQuestions',
        component: MyQuestions,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router