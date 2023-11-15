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
  {
    path: '/auth/',
    name: 'auth',
    component: () => import('@/pages/Auth.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('@/pages/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
