import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/create_investment_deposit',
    name: 'createInvestmentDeposit',
    component: () => import('@/pages/CreateInvestmentDeposit.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/pages/Payment.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
