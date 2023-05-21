import {createRouter, createWebHistory} from 'vue-router'
import MyQuestions from '../views/MyQuestions.vue'
import Questions from '../views/Questions.vue'
import Infopost from '../views/Infopost.vue'
import Questionview from '../views/Questionview.vue'

const routes = [
    {
        path: '/',
        name: 'Infopost',
        component: Infopost,
    },
    
    {
        path: '/myquestions',
        name: 'MyQuestions',
        component: MyQuestions,
    },
    
    {
        path: '/questions',
        name: 'Questions',
        component: Questions,
    },

    {
        path: '/questionview',
        name: 'Questionview',
        component: Questionview,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router