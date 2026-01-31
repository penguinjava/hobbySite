import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Food from "@/views/Food.vue"
import Bord from "@/views/Bord.vue"
import Register from "@/views/Register.vue"

const routes: RouteRecordRaw[] = [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/bord", name: "bord", component: Bord },
    { path: "/food", name: "food", component: Food },
    { path: "/member", name: "register", component: Register }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
