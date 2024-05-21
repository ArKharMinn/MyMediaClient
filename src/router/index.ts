import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/newDetails',
    name: 'newDetails',
    component: () => import('../views/newDetails.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404Page.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
