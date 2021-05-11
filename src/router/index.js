import { createRouter, createWebHistory } from 'vue-router'
import Tasks from "../views/Tasks";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Tasks
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/New.vue')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task.vue')
  },
  {
    path: '/:notFound(.*)',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
