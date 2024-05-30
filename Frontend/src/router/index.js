import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../vue/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
  ]
})

export default router
