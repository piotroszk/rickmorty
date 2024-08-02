import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/character/:id',
    name: 'Character',
    component: () => import(/* webpackChunkName: "Character" */ '../views/CharacterView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
