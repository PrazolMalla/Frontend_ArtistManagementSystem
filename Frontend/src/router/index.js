import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../vue/SignUp.vue'
import Sidebar from '../components/Sidebar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/sidebar',
      name: 'SideBar',
      component: Sidebar,
    },
  ]
})

export default router
