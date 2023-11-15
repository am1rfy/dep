import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index.vue'),
  },
  {
    path: '/lk/',
    name: 'lk',
    component: () => import('@/pages/LK.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
