/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/view/Home.vue'
import Editor from '@/view/Editor.vue'
const routes = [
    {
        path: '/',
        redirect: 'editor'
        // name: 'Home',
        // component: Home
    },
    {
        path: '/editor',
        name: 'Editor',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Editor
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
