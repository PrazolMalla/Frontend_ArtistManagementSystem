import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/AdminData',
      name:'AdminData',
      component:AdminData
    },
    {
      path: '/sidebar',
      name: 'SideBar',
      component: Sidebar,
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: Dashboard,
    },
  ]
})

export default router;
