import { createRouter, createWebHistory } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import Dashboard from '../view/Dashboard.vue'

import AdminData from '@/components/AdminData.vue'
  
 

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
