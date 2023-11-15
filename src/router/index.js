import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/pages/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
