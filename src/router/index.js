import {createRouter, createWebHistory} from 'vue-router'
import MyQuestions from '../views/MyQuestions.vue'
import Questions from '../views/Questions.vue'
import UnAnswered from '../views/UnAnswered.vue'
import Answered from '../views/Answered.vue'
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
        meta: {
            requiresAuth: true,
            accessToken: 'your-access-token'
        }
    },

    {
        path: '/unanswered',
        name: 'UnAnswered',
        component: UnAnswered,
    },

    {
        path: '/answered',
        name: 'Answered',
        component: Answered,
    },

    {
        path: '/question',
        name: 'Questionview',
        component: Questionview,
        props : true,
    }

    
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router