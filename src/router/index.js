import Vue from 'vue'
import VueRouter from 'vue-router'

// const List = () =>
//     import ( /* webpackChunkName: "list" */ '../components/list.vue')
// const review = () =>
//     import ( /* webpackChunkName: "review" */ '../components/review.vue')
import List from '../components/list.vue'
import review from '../components/review.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/list'
    },
    {
        path: '/list',
        component: List,
        name:'list'
    },
    {
        path: '/review',
        component: review,
        name:'review'
    }
]

const router = new VueRouter({
    routes
})

export default router